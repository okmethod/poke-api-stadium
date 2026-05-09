/**
 * SilhouetteQuiz (facade + store) のテスト
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { get } from "svelte/store";
import { SilhouetteQuizFacade } from "$lib/application/usecases/SilhouetteQuiz/facade";
import { pokeData, isOpen, isLoading, hintText, storeWriter } from "$lib/application/usecases/SilhouetteQuiz/store";
import { buildMockPokeData } from "../../../__testUtils__/mockPokeData";
import { createMockRepository } from "../../../__testUtils__/mockRepository";

vi.mock("$lib/application/utils/pokeSelectionUtils", () => ({
  selectRandomPokemon: vi.fn(),
}));

import { selectRandomPokemon } from "$lib/application/utils/pokeSelectionUtils";

const mockFetch = vi.fn() as unknown as typeof fetch;

describe("SilhouetteQuizFacade", () => {
  let facade: SilhouetteQuizFacade;
  const poke = buildMockPokeData({
    jaName: "ピカチュウ",
    type1: "electric",
    type2: null,
    height: 0.4,
    weight: 6.0,
    stats: { hp: 35, attack: 55, defense: 40, spAtk: 50, spDef: 50, speed: 90 },
    cryUrls: { latest: "https://example.com/pikachu.ogg", legacy: null },
  });

  beforeEach(() => {
    facade = new SilhouetteQuizFacade(createMockRepository());
    storeWriter.reset();
    vi.mocked(selectRandomPokemon).mockReset();
  });

  describe("pickPokemon", () => {
    it("成功時は success: true を返しストアにポケモンがセットされる", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke);

      const res = await facade.pickPokemon(mockFetch);

      expect(res.success).toBe(true);
      expect(get(pokeData)).toEqual(poke);
    });

    it("失敗時は success: false を返しストアは null のまま", async () => {
      vi.mocked(selectRandomPokemon).mockRejectedValue(new Error("Network Error"));

      const res = await facade.pickPokemon(mockFetch);

      expect(res.success).toBe(false);
      expect(get(pokeData)).toBeNull();
    });
  });

  describe("toggleAnswer", () => {
    it("ポケモンが未選択のとき cryUrl: null を返す", () => {
      const res = facade.toggleAnswer();
      expect(res.cryUrl).toBeNull();
    });

    it("1回目の呼び出しでこたえを開き cryUrl を返す", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke);
      await facade.pickPokemon(mockFetch);

      const res = facade.toggleAnswer();

      expect(get(isOpen)).toBe(true);
      expect(res.cryUrl).toBe("https://example.com/pikachu.ogg");
    });

    it("2回目の呼び出しでこたえを閉じ cryUrl: null を返す", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke);
      await facade.pickPokemon(mockFetch);
      facade.toggleAnswer(); // open

      const res = facade.toggleAnswer(); // close

      expect(get(isOpen)).toBe(false);
      expect(res.cryUrl).toBeNull();
    });
  });

  describe("getHint", () => {
    it("ポケモンが未選択のとき success: false を返す", () => {
      const res = facade.getHint();
      expect(res.success).toBe(false);
    });

    it("ポケモン選択済みのとき success: true を返しヒントテキストがセットされる", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke);
      await facade.pickPokemon(mockFetch);

      const res = facade.getHint();

      expect(res.success).toBe(true);
      expect(get(hintText)).not.toBeNull();
    });
  });

  describe("pickPokemon - ストアリセット", () => {
    it("呼び出し前に isOpen/hintText が残っていても reset される", async () => {
      // 事前に isOpen と hintText をセットしておく
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke);
      await facade.pickPokemon(mockFetch);
      facade.toggleAnswer(); // isOpen = true
      facade.getHint(); // hintText = some string

      expect(get(isOpen)).toBe(true);
      expect(get(hintText)).not.toBeNull();

      // 再度 pickPokemon を呼ぶとストアがリセットされる
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke);
      await facade.pickPokemon(mockFetch);

      expect(get(isOpen)).toBe(false);
      expect(get(hintText)).toBeNull();
    });

    it("ローディング中は isLoading が true になり、完了後 false に戻る", async () => {
      let isLoadingDuringTask = false;
      vi.mocked(selectRandomPokemon).mockImplementation(async () => {
        // タスク実行中の isLoading 状態を記録する
        isLoadingDuringTask = get(isLoading);
        return poke;
      });

      await facade.pickPokemon(mockFetch);

      expect(isLoadingDuringTask).toBe(true);
      expect(get(isLoading)).toBe(false);
    });

    it("失敗時も isLoading が false に戻る", async () => {
      vi.mocked(selectRandomPokemon).mockRejectedValue(new Error("Network Error"));

      await facade.pickPokemon(mockFetch);

      expect(get(isLoading)).toBe(false);
    });
  });

  describe("toggleAnswer - 鳴き声URL解決", () => {
    it("latest が null で legacy がある場合、legacy URL を返す", async () => {
      const pokeWithLegacyOnly = buildMockPokeData({
        cryUrls: { latest: null, legacy: "https://example.com/legacy.ogg" },
      });
      vi.mocked(selectRandomPokemon).mockResolvedValue(pokeWithLegacyOnly);
      await facade.pickPokemon(mockFetch);

      const res = facade.toggleAnswer();

      expect(res.cryUrl).toBe("https://example.com/legacy.ogg");
    });

    it("latest と legacy が両方 null のとき、こたえを開いても cryUrl: null を返す", async () => {
      const pokeWithNoCry = buildMockPokeData({
        cryUrls: { latest: null, legacy: null },
      });
      vi.mocked(selectRandomPokemon).mockResolvedValue(pokeWithNoCry);
      await facade.pickPokemon(mockFetch);

      const res = facade.toggleAnswer();

      expect(get(isOpen)).toBe(true);
      expect(res.cryUrl).toBeNull();
    });
  });

  describe("getHint - ヒント候補の検証", () => {
    it("type2 がある場合、ヒント候補に type2 のタイプ名が含まれうる", async () => {
      const dualTypePoke = buildMockPokeData({
        jaName: "フシギダネ",
        type1: "grass",
        type2: "poison",
        stats: { hp: 45, attack: 49, defense: 49, spAtk: 65, spDef: 65, speed: 45 },
      });
      vi.mocked(selectRandomPokemon).mockResolvedValue(dualTypePoke);
      await facade.pickPokemon(mockFetch);

      // 十分な回数呼んで候補が網羅されることを確認
      const results = new Set<string>();
      for (let i = 0; i < 50; i++) {
        facade.getHint();
        results.add(get(hintText)!);
      }

      // "どくタイプ" が少なくとも1回は出現する
      expect([...results].some((h) => h.includes("どく"))).toBe(true);
    });

    it("type2 が null の場合、ヒントに「タイプは1つだけ」が出現しうる", async () => {
      const singleTypePoke = buildMockPokeData({
        jaName: "ピカチュウ",
        type1: "electric",
        type2: null,
        stats: { hp: 35, attack: 55, defense: 40, spAtk: 50, spDef: 50, speed: 90 },
      });
      vi.mocked(selectRandomPokemon).mockResolvedValue(singleTypePoke);
      await facade.pickPokemon(mockFetch);

      const results = new Set<string>();
      for (let i = 0; i < 50; i++) {
        facade.getHint();
        results.add(get(hintText)!);
      }

      expect([...results].some((h) => h === "タイプは1つだけ")).toBe(true);
    });

    it("最高ステが2位と同値のとき「○○がたかい」ヒントは出現しない", async () => {
      // すべてのステータスを同値にする → topStat/bottomStat ともに null になる
      const allEqualStatsPoke = buildMockPokeData({
        jaName: "テスト",
        stats: { hp: 50, attack: 50, defense: 50, spAtk: 50, spDef: 50, speed: 50 },
      });
      vi.mocked(selectRandomPokemon).mockResolvedValue(allEqualStatsPoke);
      await facade.pickPokemon(mockFetch);

      const results = new Set<string>();
      for (let i = 0; i < 50; i++) {
        facade.getHint();
        results.add(get(hintText)!);
      }

      expect([...results].some((h) => h.includes("がたかい"))).toBe(false);
      expect([...results].some((h) => h.includes("はひくい"))).toBe(false);
    });

    it("最高ステが明確に1位のとき「○○がたかい」ヒントが出現しうる", async () => {
      const highSpeedPoke = buildMockPokeData({
        jaName: "テスト",
        stats: { hp: 35, attack: 55, defense: 40, spAtk: 50, spDef: 50, speed: 120 },
      });
      vi.mocked(selectRandomPokemon).mockResolvedValue(highSpeedPoke);
      await facade.pickPokemon(mockFetch);

      const results = new Set<string>();
      for (let i = 0; i < 100; i++) {
        facade.getHint();
        results.add(get(hintText)!);
      }

      expect([...results].some((h) => h === "すばやさが たかい")).toBe(true);
    });

    it("getHint を複数回呼ぶと毎回 hintText が更新される", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke);
      await facade.pickPokemon(mockFetch);

      facade.getHint();
      expect(get(hintText)).not.toBeNull();

      // 2回目も null にはならない
      facade.getHint();
      expect(get(hintText)).not.toBeNull();
    });
  });
});
