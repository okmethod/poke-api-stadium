import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { get } from "svelte/store";
import { MoveWhackFacade } from "$lib/application/usecases/MoveWhack/facade";
import { storeWriter, phase, activeSlots, score, misses, moveResult } from "$lib/application/usecases/MoveWhack/store";
import { calcTypeEffectiveness } from "$lib/domain/models/PokeType";
import type { DamageRelations, PokeTypeName } from "$lib/domain/models/PokeType";
import { buildMockPokeData } from "../../../__testUtils__/mockPokeData";
import { createMockRepository } from "../../../__testUtils__/mockRepository";
import type { IPokeRepository } from "$lib/application/ports/IPokeRepository";

vi.mock("$lib/application/utils/pokeSelectionUtils", () => ({
  selectRandomPokemons: vi.fn(),
}));

import { selectRandomPokemons } from "$lib/application/utils/pokeSelectionUtils";

const GRASS_POKE = buildMockPokeData({ pokeId: 1, type1: "grass", type2: null });
const FLYING_POKE = buildMockPokeData({ pokeId: 5, type1: "normal", type2: "flying" });

const MOCK_POOL = Array.from({ length: 30 }, (_, i) =>
  buildMockPokeData({ pokeId: i + 10, type1: "normal", type2: null }),
);

// テスト用タイプ相性データ（Gen6+ 公式チャートの攻撃側3方向のみ）
const MOCK_DR: Record<string, DamageRelations> = {
  fire: {
    doubleDamageTo: ["grass", "ice", "bug", "steel"],
    halfDamageTo: ["fire", "water", "rock", "dragon"],
    noDamageTo: [],
    noDamageFrom: [],
    halfDamageFrom: [],
    doubleDamageFrom: [],
  },
  water: {
    doubleDamageTo: ["fire", "ground", "rock"],
    halfDamageTo: ["water", "grass", "dragon"],
    noDamageTo: [],
    noDamageFrom: [],
    halfDamageFrom: [],
    doubleDamageFrom: [],
  },
  grass: {
    doubleDamageTo: ["water", "ground", "rock"],
    halfDamageTo: ["fire", "grass", "poison", "flying", "bug", "dragon", "steel"],
    noDamageTo: [],
    noDamageFrom: [],
    halfDamageFrom: [],
    doubleDamageFrom: [],
  },
  electric: {
    doubleDamageTo: ["water", "flying"],
    halfDamageTo: ["electric", "grass", "dragon"],
    noDamageTo: ["ground"],
    noDamageFrom: [],
    halfDamageFrom: [],
    doubleDamageFrom: [],
  },
};

const MOCK_TYPE_MAP = Object.fromEntries(
  Object.entries(MOCK_DR).map(([name, dr]) => [
    name,
    { name: name as PokeTypeName, jaName: name, color: "#000", damageRelations: dr },
  ]),
);

const MOCK_MOVES = [
  { type: "fire" as PokeTypeName, moveName: "かえんほうしゃ" },
  { type: "water" as PokeTypeName, moveName: "なみのり" },
  { type: "grass" as PokeTypeName, moveName: "はっぱカッター" },
  { type: "electric" as PokeTypeName, moveName: "10まんボルト" },
];

describe("calcTypeEffectiveness", () => {
  it.each([
    { moveType: "fire" as const, type1: "grass" as const, type2: null, expected: 2 },
    { moveType: "fire" as const, type1: "ice" as const, type2: null, expected: 2 },
    { moveType: "fire" as const, type1: "water" as const, type2: null, expected: 0.5 },
    { moveType: "water" as const, type1: "fire" as const, type2: null, expected: 2 },
    { moveType: "water" as const, type1: "normal" as const, type2: null, expected: 1 },
    { moveType: "electric" as const, type1: "water" as const, type2: null, expected: 2 },
    { moveType: "electric" as const, type1: "flying" as const, type2: null, expected: 2 },
    { moveType: "electric" as const, type1: "normal" as const, type2: null, expected: 1 },
    // 複合タイプ: 倍率の積
    { moveType: "fire" as const, type1: "water" as const, type2: "grass" as const, expected: 1 }, // 0.5 × 2 = 1
    { moveType: "electric" as const, type1: "normal" as const, type2: "flying" as const, expected: 2 }, // 1 × 2 = 2
    { moveType: "electric" as const, type1: "ground" as const, type2: null, expected: 0 }, // 無効
  ])("$moveType vs $type1/$type2 → $expected", ({ moveType, type1, type2, expected }) => {
    expect(calcTypeEffectiveness(MOCK_DR[moveType]!, type1, type2)).toBe(expected);
  });
});

describe("MoveWhackFacade", () => {
  let facade: MoveWhackFacade;
  let mockRepo: IPokeRepository;

  beforeEach(() => {
    vi.useFakeTimers();
    storeWriter.reset();
    mockRepo = createMockRepository();
    vi.mocked(mockRepo.getTypes).mockResolvedValue(MOCK_TYPE_MAP);
    facade = new MoveWhackFacade(mockRepo);
    vi.mocked(selectRandomPokemons).mockResolvedValue([...MOCK_POOL]);
  });

  afterEach(() => {
    facade.dispose();
    vi.useRealTimers();
  });

  describe("startGame", () => {
    it("成功時: phase が playing になる", async () => {
      const result = await facade.startGame(fetch, MOCK_MOVES);
      expect(result.success).toBe(true);
      expect(get(phase)).toBe("playing");
    });

    it("成功時: score と misses が 0 にリセットされる", async () => {
      await facade.startGame(fetch, MOCK_MOVES);
      expect(get(score)).toBe(0);
      expect(get(misses)).toBe(0);
    });

    it("失敗時: success=false を返す", async () => {
      vi.mocked(selectRandomPokemons).mockRejectedValue(new Error("network error"));
      const result = await facade.startGame(fetch, MOCK_MOVES);
      expect(result.success).toBe(false);
    });

    it("再スタート時: 前の状態がリセットされる", async () => {
      await facade.startGame(fetch, MOCK_MOVES);
      storeWriter.addSlot({ position: 0, pokeData: GRASS_POKE, expiresAt: Date.now() + 10000 });
      await facade.startGame(fetch, MOCK_MOVES);
      expect(get(activeSlots)).toHaveLength(0);
    });
  });

  describe("selectMove", () => {
    beforeEach(async () => {
      await facade.startGame(fetch, MOCK_MOVES);
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
      await facade.startGame(fetch, MOCK_MOVES);
      expect(get(activeSlots)).toHaveLength(0);
      vi.advanceTimersByTime(1500);
      expect(get(activeSlots)).toHaveLength(1);
    });

    it("スポーンしたポケモンは SLOT_DURATION_MS 後に自動消滅する", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue([GRASS_POKE, ...MOCK_POOL.slice(1)]);
      await facade.startGame(fetch, MOCK_MOVES);
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
      await facade.startGame(fetch, MOCK_MOVES);
      vi.advanceTimersByTime(30_000);
      expect(get(phase)).toBe("result");
    });

    it("ゲーム終了時にアクティブスロットが空になる", async () => {
      await facade.startGame(fetch, MOCK_MOVES);
      vi.advanceTimersByTime(1500); // スポーン
      vi.advanceTimersByTime(28_500); // 終了
      expect(get(activeSlots)).toHaveLength(0);
    });
  });

  describe("dispose", () => {
    it("dispose後はタイマーが止まりスポーンしない", async () => {
      await facade.startGame(fetch, MOCK_MOVES);
      facade.dispose();
      vi.advanceTimersByTime(10_000);
      // スポーンインターバルが止まっているためスロットは増えない
      expect(get(activeSlots)).toHaveLength(0);
    });
  });
});
