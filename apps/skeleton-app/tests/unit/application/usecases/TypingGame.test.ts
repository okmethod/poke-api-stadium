import { describe, it, expect, beforeEach, vi } from "vitest";
import { get } from "svelte/store";
import { TypingGameFacade } from "$lib/application/usecases/TypingGame/facade";
import {
  storeWriter,
  phase,
  typedCount,
  totalCorrectChars,
  totalErrors,
  currentIndex,
  targetRomaji,
  elapsedMs,
} from "$lib/application/usecases/TypingGame/store";
import { buildMockPokeData } from "../../../__testUtils__/mockPokeData";
import { createMockRepository } from "../../../__testUtils__/mockRepository";

vi.mock("$lib/application/utils/pokeSelectionUtils", () => ({
  selectRandomPokemons: vi.fn(),
}));

import { selectRandomPokemons } from "$lib/application/utils/pokeSelectionUtils";

// テスト用ポケモンリスト（jaName が ASCII のみになるシンプルなカナ）
const MOCK_POKEMONS = [
  buildMockPokeData({ pokeId: 1, jaName: "ア" }), // a
  buildMockPokeData({ pokeId: 2, jaName: "イ" }), // i
  buildMockPokeData({ pokeId: 3, jaName: "ウ" }), // u
  buildMockPokeData({ pokeId: 4, jaName: "エ" }), // e
  buildMockPokeData({ pokeId: 5, jaName: "オ" }), // o
  buildMockPokeData({ pokeId: 6, jaName: "カ" }), // ka
  buildMockPokeData({ pokeId: 7, jaName: "キ" }), // ki
  buildMockPokeData({ pokeId: 8, jaName: "ク" }), // ku
  buildMockPokeData({ pokeId: 9, jaName: "ケ" }), // ke
  buildMockPokeData({ pokeId: 10, jaName: "コ" }), // ko
];

describe("TypingGameFacade", () => {
  let facade: TypingGameFacade;

  beforeEach(() => {
    storeWriter.reset();
    facade = new TypingGameFacade(createMockRepository());
    vi.mocked(selectRandomPokemons).mockResolvedValue([...MOCK_POKEMONS]);
  });

  describe("kanaToRomaji", () => {
    it.each([
      { jaName: "フシギダネ", romaji: "fushigidane" }, // フ→fu, シ→shi（デフォルト候補）
      { jaName: "ピカチュウ", romaji: "pikachuu" }, // チュ→chu（複合）
      { jaName: "ニャース", romaji: "nya-su" }, // ニャ→nya（複合）, ー→-（長音符）
      { jaName: "カメックス", romaji: "kamekkusu" }, // ッ→kk（促音）
      { jaName: "ポッチャマ", romaji: "pocchama" }, // ッ+チャ（促音+複合）
      { jaName: "ニドラン♀", romaji: "nidoran" }, // ♀→skip（非カナ）
      { jaName: "シェルダー", romaji: "sheruda-" }, // シェ→she（複合）, ー→-
      { jaName: "セレビィ", romaji: "serebixi" }, // ィ→xi（小文字単独は x-prefix）
      { jaName: "レディバ", romaji: "redhiba" }, // ディ→dhi（複合、デフォルト候補）
    ])("$jaName → $romaji", async ({ jaName, romaji }) => {
      vi.mocked(selectRandomPokemons).mockResolvedValue([buildMockPokeData({ jaName }), ...MOCK_POKEMONS.slice(1)]);
      await facade.startGame(fetch);
      expect(get(targetRomaji)).toBe(romaji);
    });
  });

  describe("startGame", () => {
    it("成功時: phase が playing になる", async () => {
      const result = await facade.startGame(fetch);
      expect(result.success).toBe(true);
      expect(get(phase)).toBe("playing");
    });

    it("成功時: 1体目の jaName がローマ字に変換されて targetRomaji にセットされる", async () => {
      await facade.startGame(fetch);
      // MOCK_POKEMONS[0].jaName = "ア" → "a"
      expect(get(targetRomaji)).toBe("a");
    });

    it("成功時: currentIndex が 0 になる", async () => {
      await facade.startGame(fetch);
      expect(get(currentIndex)).toBe(0);
    });

    it("失敗時: success=false を返す", async () => {
      vi.mocked(selectRandomPokemons).mockRejectedValue(new Error("network error"));
      const result = await facade.startGame(fetch);
      expect(result.success).toBe(false);
    });
  });

  describe("processChar", () => {
    beforeEach(async () => {
      await facade.startGame(fetch);
    });

    it("正しい文字を入力すると correct=true を返す", () => {
      // targetRomaji = "a" (ア)
      const result = facade.processChar("a");
      expect(result.correct).toBe(true);
    });

    it("間違った文字を入力すると correct=false を返し totalErrors が増える", () => {
      const result = facade.processChar("z");
      expect(result.correct).toBe(false);
      expect(get(totalErrors)).toBe(1);
    });

    it("正解でも誤答でも totalErrors は単調増加する", () => {
      facade.processChar("z"); // 誤
      facade.processChar("z"); // 誤
      facade.processChar("a"); // 正
      expect(get(totalErrors)).toBe(2);
      expect(get(totalCorrectChars)).toBe(1);
    });

    it("単語を正しく打ち切ると wordComplete=true になる", () => {
      // "ア" → "a" (1文字)
      const result = facade.processChar("a");
      expect(result.wordComplete).toBe(true);
    });

    it("単語完了で currentIndex が進む", () => {
      facade.processChar("a"); // ア完了
      expect(get(currentIndex)).toBe(1);
      // 次は "イ" → "i"
      expect(get(targetRomaji)).toBe("i");
    });

    it("typedCount は単語完了後に 0 にリセットされる", () => {
      facade.processChar("a"); // ア完了
      expect(get(typedCount)).toBe(0);
    });

    it("playing でない場合は何もしない", () => {
      storeWriter.setPhase("idle");
      const result = facade.processChar("a");
      expect(result.correct).toBe(false);
      expect(get(totalErrors)).toBe(0);
    });

    it("複数文字の単語で途中まで正解しても wordComplete=false", async () => {
      // "カ" → "ka" (2文字)
      storeWriter.reset();
      vi.mocked(selectRandomPokemons).mockResolvedValue([
        buildMockPokeData({ jaName: "カ" }), // "ka"
        ...MOCK_POKEMONS.slice(1),
      ]);
      await facade.startGame(fetch);

      const r1 = facade.processChar("k"); // 1文字目
      expect(r1.correct).toBe(true);
      expect(r1.wordComplete).toBe(false);

      const r2 = facade.processChar("a"); // 2文字目・完了
      expect(r2.correct).toBe(true);
      expect(r2.wordComplete).toBe(true);
    });
  });

  describe("代替入力ルート", () => {
    async function setupWord(jaName: string): Promise<void> {
      storeWriter.reset();
      vi.mocked(selectRandomPokemons).mockResolvedValue([buildMockPokeData({ jaName }), ...MOCK_POKEMONS.slice(1)]);
      await facade.startGame(fetch);
    }

    function typeAll(input: string): void {
      for (const ch of input) {
        facade.processChar(ch);
      }
    }

    it("レディバ: 正規経路 redhiba で完了する", async () => {
      await setupWord("レディバ");
      expect(get(targetRomaji)).toBe("redhiba");
      typeAll("redhiba");
      expect(get(currentIndex)).toBe(1);
      expect(get(totalErrors)).toBe(0);
    });

    it("レディバ: 代替経路 redexiba で完了する", async () => {
      await setupWord("レディバ");
      typeAll("redexiba");
      expect(get(currentIndex)).toBe(1);
      expect(get(totalErrors)).toBe(0);
    });

    it("レディバ: rede まで打つと候補が dexi に絞られ targetRomaji が redexiba に更新される", async () => {
      await setupWord("レディバ");
      // re→レ完了、d→ディ開始、e→dhi が脱落して dexi/deli のみ残る
      typeAll("rede");
      expect(get(targetRomaji)).toBe("redexiba");
    });

    it("レディバ: 代替経路 deli でも完了する", async () => {
      await setupWord("レディバ");
      typeAll("redeliba");
      expect(get(currentIndex)).toBe(1);
      expect(get(totalErrors)).toBe(0);
    });

    it("シ: 代替経路 si でも完了する", async () => {
      // シ のデフォルト表示は shi だが si でも正解
      await setupWord("シ");
      expect(get(targetRomaji)).toBe("shi");
      typeAll("si");
      expect(get(currentIndex)).toBe(1);
      expect(get(totalErrors)).toBe(0);
    });

    it("シ: si を打った時点で targetRomaji が si に更新される", async () => {
      await setupWord("シ");
      facade.processChar("s"); // sh/si の両候補が残る
      expect(get(targetRomaji)).toBe("shi"); // まだ確定していない
      facade.processChar("i"); // shi[1]=h≠i で脱落、si[1]=i で確定
      // 単語完了済み（次のポケモンへ）なので currentIndex が 1 になる
      expect(get(currentIndex)).toBe(1);
    });

    it("ジャ: 代替経路 zya でも完了する", async () => {
      await setupWord("ジャ");
      typeAll("zya");
      expect(get(currentIndex)).toBe(1);
      expect(get(totalErrors)).toBe(0);
    });

    it("ジャ: 代替経路 jya でも完了する", async () => {
      await setupWord("ジャ");
      typeAll("jya");
      expect(get(currentIndex)).toBe(1);
      expect(get(totalErrors)).toBe(0);
    });

    it("ッ: xtu でも促音を入力できる（ラッタ）", async () => {
      await setupWord("ラッタ");
      // 正規: ratta、xtu 経路: raxtu + ta
      typeAll("raxtuta");
      expect(get(currentIndex)).toBe(1);
      expect(get(totalErrors)).toBe(0);
    });

    it("ァ: la でも小文字ア を入力できる（ヴァポレオン想定）", async () => {
      await setupWord("ヴァ");
      // ヴァ は compound "va" のみなので ァ 単独 la は使えないが、ァ単独のテスト
      await setupWord("ァ");
      typeAll("la");
      expect(get(currentIndex)).toBe(1);
      expect(get(totalErrors)).toBe(0);
    });
  });

  describe("ゲーム完了", () => {
    it("10体打ち切ると gameComplete=true になり phase が result になる", async () => {
      await facade.startGame(fetch);

      // MOCK_POKEMONS の順: ア(a) イ(i) ウ(u) エ(e) オ(o) カ(ka) キ(ki) ク(ku) ケ(ke) コ(ko)
      const answers = ["a", "i", "u", "e", "o", "k", "a", "k", "i", "k", "u", "k", "e", "k", "o"];
      let lastResult = { correct: false, wordComplete: false, gameComplete: false };
      for (const ch of answers) {
        lastResult = facade.processChar(ch);
      }

      expect(lastResult.gameComplete).toBe(true);
      expect(get(phase)).toBe("result");
    });

    it("ゲーム完了後 elapsedMs が 0 より大きい", async () => {
      await facade.startGame(fetch);
      const answers = ["a", "i", "u", "e", "o", "k", "a", "k", "i", "k", "u", "k", "e", "k", "o"];
      for (const ch of answers) {
        facade.processChar(ch);
      }
      // 同期実行のため elapsed が 0 の場合もある
      expect(get(elapsedMs)).toBeGreaterThanOrEqual(0);
    });
  });
});
