/**
 * ばつぐんモグラ叩きゲームの全操作コマンドの唯一の入り口
 *
 * TODO:
 * - わざはかえんほうしゃ、なみのり、はっぱカッター、10まんボルトなど、タイプごとに1つ実在のわざを用意する
 * - 複数タイプのわざから4つ選択できるようにする（現在は固定で4種）
 * - タイプ相性の判定ロジックをドメイン層に移す（現状は Facade 内の静的データで完結させている）
 * - タイプ相性の判定は複合タイプを考慮する
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Facade)
 * - ROLE: ゲーム進行制御、プレゼン層へのゲーム操作手段の提供
 * - ALLOWED: ドメイン層への依存、アプリ層ストアへの依存、アプリ層 Port への依存
 * - FORBIDDEN: インフラ層への直接依存、プレゼン層への依存
 */

import { get } from "svelte/store";
import type { IPokeRepository } from "$lib/application/ports/IPokeRepository";
import type { FacadeResult } from "$lib/application/usecases/facadeTypes";
import type { PokeData } from "$lib/domain/models/PokeData";
import type { PokeTypeName } from "$lib/domain/models/PokeType";
import { selectRandomPokemons } from "$lib/application/utils/pokeSelectionUtils";
import { withLoadingGuard } from "$lib/application/usecases/usecaseUtils";
import { storeWriter, phase, activeSlots, GAME_DURATION_MS, MAX_ACTIVE_SLOTS } from "./store";
import type { FixedMoveType, MoveResult } from "./store";

const POKE_POOL_SIZE = 30;
const SPAWN_INTERVAL_MS = 1_500;
const SLOT_DURATION_MS = 3_000;
const FEEDBACK_DURATION_MS = 800;

// 4種固定わざのタイプ相性（2倍ダメージを与えられる相手タイプ）
// PokeAPI の damageRelations と同値だが、ゲーム開始時の API 呼び出しを省くため静的に定義する
const SUPER_EFFECTIVE_AGAINST: Record<FixedMoveType, PokeTypeName[]> = {
  fire: ["grass", "ice", "bug", "steel"],
  water: ["fire", "ground", "rock"],
  grass: ["water", "ground", "rock"],
  electric: ["water", "flying"],
};

/** UI に表示する固定わざの定義 */
export const FIXED_MOVES: { readonly type: FixedMoveType; readonly jaName: string }[] = [
  { type: "fire", jaName: "ほのお" },
  { type: "water", jaName: "みず" },
  { type: "grass", jaName: "くさ" },
  { type: "electric", jaName: "でんき" },
];

/** わざがポケモンに対して2倍ダメージか判定する */
export function isSuperEffective(moveType: FixedMoveType, pokeData: PokeData): boolean {
  const targets = SUPER_EFFECTIVE_AGAINST[moveType];
  return targets.includes(pokeData.type1) || (pokeData.type2 !== null && targets.includes(pokeData.type2));
}

/**
 * わざ叩きゲームの全操作を提供する Facade
 *
 * スポーン・消滅・終了タイマーを内部で管理するため、
 * ページ破棄時またはゲーム再開時に dispose() を呼ぶこと。
 */
export class MoveWhackFacade {
  private pool: PokeData[] = [];
  private poolIndex = 0;
  private spawnTimer: ReturnType<typeof setInterval> | null = null;
  private gameEndTimer: ReturnType<typeof setTimeout> | null = null;
  private feedbackTimer: ReturnType<typeof setTimeout> | null = null;
  // ポジションをキーとしたスロット自動消滅タイマー
  private slotTimers = new Map<number, ReturnType<typeof setTimeout>>();

  constructor(private readonly repository: IPokeRepository) {}

  /**
   * ゲームを開始する
   *
   * 既存のタイマーを破棄し、ポケモンプールを取得してスポーンを開始する。
   */
  async startGame(fetchFn: typeof fetch): Promise<FacadeResult> {
    this.dispose();
    storeWriter.reset();
    return withLoadingGuard(
      () => selectRandomPokemons(this.repository, fetchFn, POKE_POOL_SIZE),
      (v) => storeWriter.setIsLoading(v),
      (pokemons) => {
        this.pool = pokemons;
        this.poolIndex = 0;
        const now = Date.now();
        storeWriter.setGameEndMs(now + GAME_DURATION_MS);
        storeWriter.setPhase("playing");
        this.scheduleSpawn();
        this.gameEndTimer = setTimeout(() => this.endGame(), GAME_DURATION_MS);
      },
      () => storeWriter.reset(),
    );
  }

  /**
   * わざを選択する
   *
   * アクティブスロットに有効なターゲットがあれば自動的に1体倒してスコアを加算する。
   * 有効なターゲットがいない場合はおてつきとなる。
   */
  selectMove(moveType: FixedMoveType): void {
    if (get(phase) !== "playing") return;

    const slots = get(activeSlots);
    const hitSlot = slots.find((s) => isSuperEffective(moveType, s.pokeData));

    if (hitSlot !== undefined) {
      this.removeSlotAt(hitSlot.position);
      storeWriter.incrementScore();
      this.showFeedback({ isHit: true, message: "こうかはばつぐんだ！" });
    } else {
      storeWriter.incrementMisses();
      this.showFeedback({ isHit: false, message: "おてつき！" });
    }
  }

  /** タイマーをすべて解放する（ページ破棄時・ゲーム再開時に呼ぶ） */
  dispose(): void {
    if (this.spawnTimer !== null) {
      clearInterval(this.spawnTimer);
      this.spawnTimer = null;
    }
    if (this.gameEndTimer !== null) {
      clearTimeout(this.gameEndTimer);
      this.gameEndTimer = null;
    }
    if (this.feedbackTimer !== null) {
      clearTimeout(this.feedbackTimer);
      this.feedbackTimer = null;
    }
    for (const timer of this.slotTimers.values()) {
      clearTimeout(timer);
    }
    this.slotTimers.clear();
  }

  private scheduleSpawn(): void {
    this.spawnTimer = setInterval(() => {
      if (get(phase) !== "playing") return;
      const occupied = new Set(get(activeSlots).map((s) => s.position));
      const free = Array.from({ length: MAX_ACTIVE_SLOTS }, (_, i) => i).filter((p) => !occupied.has(p));
      if (free.length === 0) return;

      // ランダムな空きポジションにポケモンをスポーンさせる
      const position = free[Math.floor(Math.random() * free.length)]!;
      if (this.poolIndex >= this.pool.length) this.poolIndex = 0;
      const pokeData = this.pool[this.poolIndex++]!;
      const expiresAt = Date.now() + SLOT_DURATION_MS;

      storeWriter.addSlot({ position, pokeData, expiresAt });
      const timer = setTimeout(() => this.removeSlotAt(position), SLOT_DURATION_MS);
      this.slotTimers.set(position, timer);
    }, SPAWN_INTERVAL_MS);
  }

  private removeSlotAt(position: number): void {
    storeWriter.removeSlotAt(position);
    const timer = this.slotTimers.get(position);
    if (timer !== undefined) {
      clearTimeout(timer);
      this.slotTimers.delete(position);
    }
  }

  private showFeedback(result: MoveResult): void {
    storeWriter.setMoveResult(result);
    if (this.feedbackTimer !== null) clearTimeout(this.feedbackTimer);
    this.feedbackTimer = setTimeout(() => {
      storeWriter.setMoveResult(null);
      this.feedbackTimer = null;
    }, FEEDBACK_DURATION_MS);
  }

  private endGame(): void {
    this.dispose();
    storeWriter.setActiveSlots([]);
    storeWriter.setPhase("result");
  }
}
