/**
 * スライドパズルの全操作コマンドの唯一の入り口
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Facade)
 * - ROLE: ゲーム進行制御、プレゼン層へのゲーム操作手段の提供
 * - ALLOWED: ドメイン層への依存、アプリ層ストアへの依存、アプリ層 Port への依存
 * - FORBIDDEN: インフラ層への直接依存、プレゼン層への依存
 */

import { get } from "svelte/store";
import type { IPokeRepository } from "$lib/application/ports/IPokeRepository";
import type { FacadeResult } from "$lib/application/usecases/facadeTypes";
import { selectRandomPokemon } from "$lib/application/utils/pokeSelectionUtils";
import { withLoadingGuard } from "$lib/application/usecases/usecaseUtils";
import { storeWriter, board } from "./store";

const GRID_SIZE = 4;
const TILE_COUNT = GRID_SIZE * GRID_SIZE - 1; // 15 枚
const SHUFFLE_MOVES = 300;
// W=1（最適解）に挑戦するノード上限。超えたら W=2 にフォールバック
const MAX_NODES_OPTIMAL = 20_000_000;
// W=2（準最適解）のノード上限。難問でも通常 <1M で完了するため余裕を持たせる
const MAX_NODES_WEIGHTED = 10_000_000;

// タイルIDごと・位置ごとのマンハッタン距離（モジュールロード時に事前計算）
const MANHATTAN: number[][] = Array.from({ length: TILE_COUNT }, (_, tile) => {
  const goalRow = Math.floor(tile / GRID_SIZE);
  const goalCol = tile % GRID_SIZE;
  return Array.from(
    { length: GRID_SIZE * GRID_SIZE },
    (__, pos) => Math.abs(goalRow - Math.floor(pos / GRID_SIZE)) + Math.abs(goalCol - (pos % GRID_SIZE)),
  );
});

/** 初期状態（解けた状態）のボードを生成する */
function createSolvedBoard(): (number | null)[] {
  return [...Array(TILE_COUNT).keys(), null];
}

/** 指定セルの上下左右隣接セルインデックスを返す */
function getNeighbors(pos: number): number[] {
  const row = Math.floor(pos / GRID_SIZE);
  const col = pos % GRID_SIZE;
  const neighbors: number[] = [];
  if (row > 0) neighbors.push(pos - GRID_SIZE);
  if (row < GRID_SIZE - 1) neighbors.push(pos + GRID_SIZE);
  if (col > 0) neighbors.push(pos - 1);
  if (col < GRID_SIZE - 1) neighbors.push(pos + 1);
  return neighbors;
}

/**
 * 解けた状態からランダムな合法ムーブを繰り返してシャッフルする
 *
 * ムーブベースのシャッフルにすることで必ず解ける盤面を保証する。
 * （15パズルは全配置の半数が解不能なため）
 */
function shuffleBoard(solvedBoard: (number | null)[]): (number | null)[] {
  const b = [...solvedBoard];
  let emptyPos = b.indexOf(null);
  let lastMoved = -1;

  for (let i = 0; i < SHUFFLE_MOVES; i++) {
    // 直前に動かしたセルへ戻らないようにすることで、より広い探索をする
    const neighbors = getNeighbors(emptyPos).filter((n) => n !== lastMoved);
    const nextPos = neighbors[Math.floor(Math.random() * neighbors.length)]!;
    b[emptyPos] = b[nextPos]!;
    b[nextPos] = null;
    lastMoved = emptyPos;
    emptyPos = nextPos;
  }
  return b;
}

/** ボードが解けた状態かを判定する */
function isSolved(b: (number | null)[]): boolean {
  for (let i = 0; i < TILE_COUNT; i++) {
    if (b[i] !== i) return false;
  }
  return b[TILE_COUNT] === null;
}

/** 指定行の線形コンフリクト数 × 2 を返す */
function rowConflict(b: (number | null)[], row: number): number {
  let conflict = 0;
  for (let c1 = 0; c1 < GRID_SIZE - 1; c1++) {
    const t1 = b[row * GRID_SIZE + c1];
    if (t1 == null || Math.floor(t1 / GRID_SIZE) !== row) continue;
    for (let c2 = c1 + 1; c2 < GRID_SIZE; c2++) {
      const t2 = b[row * GRID_SIZE + c2];
      if (t2 == null || Math.floor(t2 / GRID_SIZE) !== row) continue;
      if (t1 > t2) conflict += 2;
    }
  }
  return conflict;
}

/** 指定列の線形コンフリクト数 × 2 を返す */
function colConflict(b: (number | null)[], col: number): number {
  let conflict = 0;
  for (let r1 = 0; r1 < GRID_SIZE - 1; r1++) {
    const t1 = b[r1 * GRID_SIZE + col];
    if (t1 == null || t1 % GRID_SIZE !== col) continue;
    for (let r2 = r1 + 1; r2 < GRID_SIZE; r2++) {
      const t2 = b[r2 * GRID_SIZE + col];
      if (t2 == null || t2 % GRID_SIZE !== col) continue;
      if (Math.floor(t1 / GRID_SIZE) > Math.floor(t2 / GRID_SIZE)) conflict += 2;
    }
  }
  return conflict;
}

/** 全行・全列の線形コンフリクト合計を返す（初期値計算用） */
function computeLinearConflict(b: (number | null)[]): number {
  let total = 0;
  for (let i = 0; i < GRID_SIZE; i++) total += rowConflict(b, i) + colConflict(b, i);
  return total;
}

/**
 * Weighted IDA* でボードの解法手順を返す
 *
 * weight=1 で最短解を探索し、ノード上限超過時は weight=2 にフォールバックする。
 * W=2 は最適手数の最大 2 倍だが探索量が劇的に減り、難問でも必ず完了する。
 * マンハッタン距離（増分更新 O(1)）＋線形コンフリクト（増分更新 O(GRID_SIZE)）。
 * 各要素は slideTitle に渡すタイルのポジション。
 */
function solvePuzzle(initialBoard: (number | null)[]): number[] | null {
  // 数値センチネル: 正値 = 次しきい値、負値 = 終端状態
  const FOUND = -1;
  const OVERFLOW = -2;

  const b = [...initialBoard];
  const emptyStart = b.indexOf(null);

  let mh0 = 0;
  for (let pos = 0; pos < GRID_SIZE * GRID_SIZE; pos++) {
    const tile = b[pos];
    if (tile != null) mh0 += MANHATTAN[tile]![pos]!;
  }

  const lc0 = computeLinearConflict(b);

  // スワップ前後の影響行・列だけ LC を再計算（全量再計算 O(64) → 増分 O(18)）
  function lcContrib(rows: number[], cols: number[]): number {
    return rows.reduce((s, r) => s + rowConflict(b, r), 0) + cols.reduce((s, c) => s + colConflict(b, c), 0);
  }

  function runIDA(weight: number, maxNodes: number): number[] | null {
    let nodeCount = 0;
    let threshold = weight * (mh0 + lc0);
    const path: number[] = [];

    function search(g: number, limit: number, emptyPos: number, prevEmpty: number, mh: number, lc: number): number {
      if (++nodeCount > maxNodes) return OVERFLOW;
      const f = g + weight * (mh + lc);
      if (f > limit) return f;
      if (mh === 0) return FOUND;

      let min = Infinity;
      for (const tilePos of getNeighbors(emptyPos)) {
        if (tilePos === prevEmpty) continue;

        const tile = b[tilePos]!;
        const dMH = MANHATTAN[tile]![emptyPos]! - MANHATTAN[tile]![tilePos]!;

        const r1 = Math.floor(tilePos / GRID_SIZE);
        const c1 = tilePos % GRID_SIZE;
        const r2 = Math.floor(emptyPos / GRID_SIZE);
        const c2 = emptyPos % GRID_SIZE;

        // 横移動 → 影響: 行 r1 + 列 c1/c2、縦移動 → 影響: 列 c1 + 行 r1/r2
        const [affectedRows, affectedCols] = r1 === r2 ? [[r1], [c1, c2]] : [[r1, r2], [c1]];
        const oldContrib = lcContrib(affectedRows, affectedCols);
        b[emptyPos] = tile;
        b[tilePos] = null;
        const newContrib = lcContrib(affectedRows, affectedCols);

        path.push(tilePos);
        const result = search(g + 1, limit, tilePos, emptyPos, mh + dMH, lc - oldContrib + newContrib);
        b[tilePos] = tile;
        b[emptyPos] = null;

        if (result === FOUND) return FOUND;
        path.pop();
        if (result === OVERFLOW) return OVERFLOW;
        if (result < min) min = result;
      }

      return min;
    }

    // W=1 は threshold ≤ 100（最適解は最大 80 手程度）、W=2 は ≤ 200 で探索
    const thresholdCap = weight * 100;
    while (threshold <= thresholdCap) {
      const result = search(0, threshold, emptyStart, -1, mh0, lc0);
      if (result === FOUND) return [...path];
      if (result === OVERFLOW || result === Infinity) return null;
      threshold = result;
    }

    return null;
  }

  // W=1 最短解を優先し、ノード上限超過時は W=2 準最適解にフォールバック
  return runIDA(1, MAX_NODES_OPTIMAL) ?? runIDA(2, MAX_NODES_WEIGHTED);
}

/**
 * ポケモンスライドパズルのゲーム操作を提供する Facade
 *
 * IPokeRepository を constructor injection で受け取ることで、
 * テスト時にモックを注入可能にする。
 */
export class SlidePuzzleFacade {
  constructor(private readonly repository: IPokeRepository) {}

  /** ゲームを開始: ランダムに1体選出してボードをシャッフルする */
  async startGame(fetchFn: typeof fetch): Promise<FacadeResult> {
    storeWriter.reset();
    return withLoadingGuard(
      () => selectRandomPokemon(this.repository, fetchFn),
      (v) => storeWriter.setIsLoading(v),
      (pokeData) => {
        storeWriter.setPokeData(pokeData);
        storeWriter.setBoard(shuffleBoard(createSolvedBoard()));
      },
      () => storeWriter.setPokeData(null),
    );
  }

  /** 現在のボードの自動クリア手順を計算して返す（各要素は slideTitle に渡すポジション） */
  computeSolution(): number[] | null {
    const currentBoard = get(board);
    if (currentBoard.length === 0) return null;
    return solvePuzzle(currentBoard);
  }

  /**
   * 指定セルのタイルをスライドする
   *
   * 空マスに隣接するタイルのみ移動可能。クリア判定もここで行う。
   */
  slideTitle(position: number): void {
    const currentBoard = get(board);
    if (currentBoard.length === 0) return;

    const emptyPos = currentBoard.indexOf(null);
    if (!getNeighbors(emptyPos).includes(position)) return;

    const newBoard = [...currentBoard];
    newBoard[emptyPos] = newBoard[position]!;
    newBoard[position] = null;

    storeWriter.setBoard(newBoard);
    storeWriter.incrementMoveCount();

    if (isSolved(newBoard)) {
      storeWriter.setIsGameClear(true);
    }
  }
}
