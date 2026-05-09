/**
 * SlidePuzzle (facade + store) のテスト
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { get } from "svelte/store";
import { SlidePuzzleFacade } from "$lib/application/usecases/SlidePuzzle/facade";
import { board, moveCount, isGameClear, pokeData } from "$lib/application/usecases/SlidePuzzle/store";
import { storeWriter } from "$lib/application/usecases/SlidePuzzle/store";
import { buildMockPokeData } from "../../../__testUtils__/mockPokeData";
import { createMockRepository } from "../../../__testUtils__/mockRepository";

vi.mock("$lib/application/utils/pokeSelectionUtils", () => ({
  selectRandomPokemon: vi.fn(),
}));

import { selectRandomPokemon } from "$lib/application/utils/pokeSelectionUtils";

const mockFetch = vi.fn() as unknown as typeof fetch;
const mockPoke = buildMockPokeData({ speciesId: 25, jaName: "ピカチュウ" });

describe("SlidePuzzleFacade", () => {
  let facade: SlidePuzzleFacade;

  beforeEach(() => {
    facade = new SlidePuzzleFacade(createMockRepository());
    storeWriter.reset();
    vi.mocked(selectRandomPokemon).mockReset();
  });

  describe("startGame", () => {
    it("成功時はボードが 16 マスで初期化される", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(mockPoke);

      const res = await facade.startGame(mockFetch);

      expect(res.success).toBe(true);
      expect(get(board)).toHaveLength(16);
    });

    it("成功時は pokeData がセットされる", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(mockPoke);

      await facade.startGame(mockFetch);

      expect(get(pokeData)).toEqual(mockPoke);
    });

    it("ボードに null が1つだけ含まれる（空マス）", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(mockPoke);

      await facade.startGame(mockFetch);

      const currentBoard = get(board);
      expect(currentBoard.filter((t) => t === null)).toHaveLength(1);
    });

    it("ボードにタイル 0〜14 が1つずつ含まれる", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(mockPoke);

      await facade.startGame(mockFetch);

      const currentBoard = get(board);
      for (let i = 0; i < 15; i++) {
        expect(currentBoard).toContain(i);
      }
    });

    it("失敗時は success: false を返し board が空になる", async () => {
      vi.mocked(selectRandomPokemon).mockRejectedValue(new Error("Network Error"));

      const res = await facade.startGame(mockFetch);

      expect(res.success).toBe(false);
      expect(get(board)).toHaveLength(0);
    });

    it("再呼び出しすると手数・クリア状態がリセットされる", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(mockPoke);
      await facade.startGame(mockFetch);

      // 手動でストアを変更しておく
      storeWriter.incrementMoveCount();
      storeWriter.setIsGameClear(true);

      vi.mocked(selectRandomPokemon).mockResolvedValue(mockPoke);
      await facade.startGame(mockFetch);

      expect(get(moveCount)).toBe(0);
      expect(get(isGameClear)).toBe(false);
    });
  });

  describe("slideTitle", () => {
    /** 解けた状態のボードを返す（テスト用） */
    function solvedBoard(): (number | null)[] {
      return [...Array(15).keys(), null];
    }

    /** 最後の空マス（index=15）の左隣（index=14）を返す */
    const LEFT_OF_EMPTY = 14;
    const EMPTY_POS = 15;

    beforeEach(() => {
      // 解けた状態のボードを直接セットする
      storeWriter.setBoard(solvedBoard());
    });

    it("空マスに隣接するタイルをスライドすると手数が増える", () => {
      facade.slideTitle(LEFT_OF_EMPTY);
      expect(get(moveCount)).toBe(1);
    });

    it("スライド後に空マスとタイルの位置が入れ替わる", () => {
      facade.slideTitle(LEFT_OF_EMPTY);

      const currentBoard = get(board);
      // 元のタイル位置が null になる
      expect(currentBoard[LEFT_OF_EMPTY]).toBeNull();
      // 元の空マス位置にタイルが移動する
      expect(currentBoard[EMPTY_POS]).toBe(14);
    });

    it("空マスに隣接しないタイルはスライドできない", () => {
      // index=0 は index=15 と隣接していない
      facade.slideTitle(0);
      expect(get(moveCount)).toBe(0);
      expect(get(board)[0]).toBe(0);
    });

    it("ボードが空の場合は何も起きない", () => {
      storeWriter.setBoard([]);
      facade.slideTitle(0);
      expect(get(moveCount)).toBe(0);
    });

    it("解けた状態に1手で戻すとクリアにならない（まだ動かしていない解けた状態ではクリア判定しない）", () => {
      // index=14 を動かして index=14 を再び動かす → 元の位置に戻る
      facade.slideTitle(LEFT_OF_EMPTY); // 14 → 15 に移動、空マスが 14 に
      facade.slideTitle(EMPTY_POS); // 15 → 14 に移動、空マスが 15 に戻る
      // これでボードは solved 状態に戻る
      expect(get(isGameClear)).toBe(true);
    });

    it("全タイルを正しい位置に並べるとクリアになる", () => {
      // 解けた状態から1手動かして1手戻すだけでクリア
      facade.slideTitle(LEFT_OF_EMPTY);
      expect(get(isGameClear)).toBe(false);

      facade.slideTitle(EMPTY_POS);
      expect(get(isGameClear)).toBe(true);
    });

    it("縦方向の隣接タイルもスライドできる", () => {
      // index=11 (3行目の最右) は index=15 (4行目の最右) と縦に隣接
      facade.slideTitle(11);
      expect(get(moveCount)).toBe(1);
      expect(get(board)[11]).toBeNull();
      expect(get(board)[EMPTY_POS]).toBe(11);
    });
  });

  describe("computeSolution", () => {
    it("空ボードの場合は null を返す", () => {
      storeWriter.setBoard([]);
      expect(facade.computeSolution()).toBeNull();
    });

    it("既に解けた状態では空配列を返す", () => {
      storeWriter.setBoard([...Array(15).keys(), null]);
      expect(facade.computeSolution()).toEqual([]);
    });

    it("1手で解けるボードの解法を返す", () => {
      // index=14 が null、index=15 にタイル14 がある状態
      storeWriter.setBoard([...Array(14).keys(), null, 14]);
      expect(facade.computeSolution()).toEqual([15]);
    });

    it("解法を適用するとクリアになる", () => {
      // 2手で解けるボード: null が pos13、タイル13 が pos14、タイル14 が pos15
      // slideTitle(14) → slideTitle(15) でクリア
      storeWriter.setBoard([...Array(13).keys(), null, 13, 14]);
      const solution = facade.computeSolution();
      expect(solution).toEqual([14, 15]);
      for (const pos of solution!) {
        facade.slideTitle(pos);
      }
      expect(get(isGameClear)).toBe(true);
    });
  });
});
