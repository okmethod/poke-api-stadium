import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { get } from "svelte/store";
import { MoveWhackFacade, isSuperEffective } from "$lib/application/usecases/MoveWhack/facade";
import { storeWriter, phase, activeSlots, score, misses, moveResult } from "$lib/application/usecases/MoveWhack/store";
import { buildMockPokeData } from "../../../__testUtils__/mockPokeData";
import { createMockRepository } from "../../../__testUtils__/mockRepository";

vi.mock("$lib/application/utils/pokeSelectionUtils", () => ({
  selectRandomPokemons: vi.fn(),
}));

import { selectRandomPokemons } from "$lib/application/utils/pokeSelectionUtils";

const GRASS_POKE = buildMockPokeData({ pokeId: 1, type1: "grass", type2: null });
const FLYING_POKE = buildMockPokeData({ pokeId: 5, type1: "normal", type2: "flying" });

const MOCK_POOL = Array.from({ length: 30 }, (_, i) =>
  buildMockPokeData({ pokeId: i + 10, type1: "normal", type2: null }),
);

describe("isSuperEffective", () => {
  it.each([
    { moveType: "fire" as const, type1: "grass" as const, type2: null, expected: true },
    { moveType: "fire" as const, type1: "ice" as const, type2: null, expected: true },
    { moveType: "fire" as const, type1: "bug" as const, type2: null, expected: true },
    { moveType: "fire" as const, type1: "steel" as const, type2: null, expected: true },
    { moveType: "fire" as const, type1: "water" as const, type2: null, expected: false },
    { moveType: "water" as const, type1: "fire" as const, type2: null, expected: true },
    { moveType: "water" as const, type1: "ground" as const, type2: null, expected: true },
    { moveType: "water" as const, type1: "rock" as const, type2: null, expected: true },
    { moveType: "water" as const, type1: "normal" as const, type2: null, expected: false },
    { moveType: "grass" as const, type1: "water" as const, type2: null, expected: true },
    { moveType: "electric" as const, type1: "water" as const, type2: null, expected: true },
    { moveType: "electric" as const, type1: "flying" as const, type2: null, expected: true },
    { moveType: "electric" as const, type1: "normal" as const, type2: null, expected: false },
    // タイプ2が弱点の場合
    { moveType: "fire" as const, type1: "water" as const, type2: "grass" as const, expected: true },
    { moveType: "electric" as const, type1: "normal" as const, type2: "flying" as const, expected: true },
  ])("$moveType vs $type1/$type2 → $expected", ({ moveType, type1, type2, expected }) => {
    const poke = buildMockPokeData({ type1, type2 });
    expect(isSuperEffective(moveType, poke)).toBe(expected);
  });
});

describe("MoveWhackFacade", () => {
  let facade: MoveWhackFacade;

  beforeEach(() => {
    vi.useFakeTimers();
    storeWriter.reset();
    facade = new MoveWhackFacade(createMockRepository());
    vi.mocked(selectRandomPokemons).mockResolvedValue([...MOCK_POOL]);
  });

  afterEach(() => {
    facade.dispose();
    vi.useRealTimers();
  });

  describe("startGame", () => {
    it("成功時: phase が playing になる", async () => {
      const result = await facade.startGame(fetch);
      expect(result.success).toBe(true);
      expect(get(phase)).toBe("playing");
    });

    it("成功時: score と misses が 0 にリセットされる", async () => {
      await facade.startGame(fetch);
      expect(get(score)).toBe(0);
      expect(get(misses)).toBe(0);
    });

    it("失敗時: success=false を返す", async () => {
      vi.mocked(selectRandomPokemons).mockRejectedValue(new Error("network error"));
      const result = await facade.startGame(fetch);
      expect(result.success).toBe(false);
    });

    it("再スタート時: 前の状態がリセットされる", async () => {
      await facade.startGame(fetch);
      storeWriter.addSlot({ position: 0, pokeData: GRASS_POKE, expiresAt: Date.now() + 10000 });
      await facade.startGame(fetch);
      expect(get(activeSlots)).toHaveLength(0);
    });
  });

  describe("selectMove", () => {
    beforeEach(async () => {
      await facade.startGame(fetch);
      // タイマーに頼らず直接スロットを追加して各テストを独立させる
      storeWriter.addSlot({ position: 0, pokeData: GRASS_POKE, expiresAt: Date.now() + 10000 });
    });

    it("スーパーエフェクティブなわざを選ぶと score が増える", () => {
      facade.selectMove("fire"); // 草→ほのおは2倍
      expect(get(score)).toBe(1);
    });

    it("スーパーエフェクティブなわざを選ぶと isHit=true のフィードバックが出る", () => {
      facade.selectMove("fire");
      expect(get(moveResult)?.isHit).toBe(true);
      expect(get(moveResult)?.message).toBe("こうかはばつぐんだ！");
    });

    it("スーパーエフェクティブなわざを選ぶとスロットが消える", () => {
      facade.selectMove("fire");
      expect(get(activeSlots)).toHaveLength(0);
    });

    it("効果がないわざを選ぶと misses が増える", () => {
      facade.selectMove("water"); // 草→みずは等倍
      expect(get(misses)).toBe(1);
    });

    it("効果がないわざを選ぶと isHit=false のフィードバックが出る", () => {
      facade.selectMove("water");
      expect(get(moveResult)?.isHit).toBe(false);
      expect(get(moveResult)?.message).toBe("おてつき！");
    });

    it("効果がないわざを選んでもスロットは消えない", () => {
      facade.selectMove("water");
      expect(get(activeSlots)).toHaveLength(1);
    });

    it("playing でない場合は何もしない", () => {
      storeWriter.setPhase("idle");
      facade.selectMove("fire");
      expect(get(score)).toBe(0);
      expect(get(misses)).toBe(0);
    });

    it("アクティブスロットが空の場合はおてつきとなる", () => {
      storeWriter.setActiveSlots([]);
      facade.selectMove("fire");
      expect(get(misses)).toBe(1);
    });

    it("複数スロット中のタイプ2が弱点のポケモンも倒せる", () => {
      storeWriter.addSlot({ position: 1, pokeData: FLYING_POKE, expiresAt: Date.now() + 10000 });
      facade.selectMove("electric"); // ノーマル/ひこう → でんきは2倍
      expect(get(score)).toBe(1);
    });

    it("フィードバックは FEEDBACK_DURATION_MS 後に消える", () => {
      facade.selectMove("fire");
      expect(get(moveResult)).not.toBeNull();
      vi.advanceTimersByTime(800);
      expect(get(moveResult)).toBeNull();
    });
  });

  describe("スポーン・タイマー", () => {
    it("SPAWN_INTERVAL_MS 後にポケモンがスポーンする", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue([GRASS_POKE, ...MOCK_POOL.slice(1)]);
      await facade.startGame(fetch);
      expect(get(activeSlots)).toHaveLength(0);
      vi.advanceTimersByTime(1500);
      expect(get(activeSlots)).toHaveLength(1);
    });

    it("スポーンしたポケモンは SLOT_DURATION_MS 後に自動消滅する", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue([GRASS_POKE, ...MOCK_POOL.slice(1)]);
      await facade.startGame(fetch);
      vi.advanceTimersByTime(1500); // 1回目スポーン
      const slotsBefore = get(activeSlots).length;
      expect(slotsBefore).toBeGreaterThan(0);
      // スポーンタイマーを止めるためにスロットが満杯になるまで手動追加してから時間を進める
      // （簡易確認のため: スポーンと同ポジションの消滅タイマーが 3000ms 後に動く）
      const pos = get(activeSlots)[0]!.position;
      vi.advanceTimersByTime(3000); // 消滅タイマー発火（1500ms地点のスロット）
      // ポジションにスロットがなければ消滅成功（別スロットが入っている場合もある）
      const remaining = get(activeSlots).filter((s) => s.position === pos);
      expect(remaining).toHaveLength(0);
    });
  });

  describe("ゲーム終了", () => {
    it("GAME_DURATION_MS 後に phase が result になる", async () => {
      await facade.startGame(fetch);
      vi.advanceTimersByTime(30_000);
      expect(get(phase)).toBe("result");
    });

    it("ゲーム終了時にアクティブスロットが空になる", async () => {
      await facade.startGame(fetch);
      vi.advanceTimersByTime(1500); // スポーン
      vi.advanceTimersByTime(28_500); // 終了
      expect(get(activeSlots)).toHaveLength(0);
    });
  });

  describe("dispose", () => {
    it("dispose後はタイマーが止まりスポーンしない", async () => {
      await facade.startGame(fetch);
      facade.dispose();
      vi.advanceTimersByTime(10_000);
      // スポーンインターバルが止まっているためスロットは増えない
      expect(get(activeSlots)).toHaveLength(0);
    });
  });
});
