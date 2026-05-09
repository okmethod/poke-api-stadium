/**
 * CryOrderQuiz (facade + store) のテスト
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { get } from "svelte/store";
import { CryOrderQuizFacade } from "$lib/application/usecases/CryOrderQuiz/facade";
import { result, pokeDataList, crySequence, isLoading } from "$lib/application/usecases/CryOrderQuiz/store";
import { buildMockPokeData } from "../../../__testUtils__/mockPokeData";
import { createMockRepository } from "../../../__testUtils__/mockRepository";

vi.mock("$lib/application/utils/pokeSelectionUtils", () => ({
  selectRandomPokemons: vi.fn(),
}));

import { selectRandomPokemons } from "$lib/application/utils/pokeSelectionUtils";

const mockFetch = vi.fn() as unknown as typeof fetch;

describe("CryOrderQuizFacade", () => {
  let facade: CryOrderQuizFacade;
  const pokes = [
    buildMockPokeData({ speciesId: 1, jaName: "フシギダネ" }),
    buildMockPokeData({ speciesId: 25, jaName: "ピカチュウ" }),
    buildMockPokeData({ speciesId: 4, jaName: "ヒトカゲ" }),
  ];

  beforeEach(() => {
    facade = new CryOrderQuizFacade(createMockRepository());
    facade.reset();
    vi.mocked(selectRandomPokemons).mockReset();
  });

  describe("pickPokemons", () => {
    it("成功時は success: true を返しストアが更新される", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue(pokes);

      const res = await facade.pickPokemons(mockFetch);

      expect(res.success).toBe(true);
      expect(get(pokeDataList)).toHaveLength(3);
      // crySequence は [0,1,2] の順列であること
      const seq = get(crySequence);
      expect(seq).toHaveLength(3);
      expect([...seq].sort()).toEqual([0, 1, 2]);
    });

    it("失敗時は success: false を返しストアは空のまま", async () => {
      vi.mocked(selectRandomPokemons).mockRejectedValue(new Error("Network Error"));

      const res = await facade.pickPokemons(mockFetch);

      expect(res.success).toBe(false);
      expect(get(pokeDataList)).toHaveLength(0);
    });

    it("完了後は isLoading が false に戻る", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue(pokes);

      await facade.pickPokemons(mockFetch);

      expect(get(isLoading)).toBe(false);
    });

    it("失敗時も isLoading が false に戻る", async () => {
      vi.mocked(selectRandomPokemons).mockRejectedValue(new Error("Network Error"));

      await facade.pickPokemons(mockFetch);

      expect(get(isLoading)).toBe(false);
    });

    it("crySequence は恒等順列 [0,1,2] にならない", async () => {
      // pickPokemons を繰り返し呼び、恒等順列が一度も返されないことを確認する
      // （実装は恒等順列を while ループで除外している）
      vi.mocked(selectRandomPokemons).mockResolvedValue(pokes);

      const sequences: number[][] = [];
      for (let i = 0; i < 10; i++) {
        await facade.pickPokemons(mockFetch);
        sequences.push([...get(crySequence)]);
      }

      const hasIdentity = sequences.some((seq) => seq.every((v, i) => v === i));
      expect(hasIdentity).toBe(false);
    });

    it("再呼び出しすると直前の result と crySequence がリセットされる", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue(pokes);
      await facade.pickPokemons(mockFetch);
      // result をセットしてから再度 pickPokemons を呼ぶ
      facade.revealResult(pokes, pokes, [0, 1, 2]);
      expect(get(result)).not.toBeNull();

      vi.mocked(selectRandomPokemons).mockResolvedValue(pokes);
      await facade.pickPokemons(mockFetch);

      expect(get(result)).toBeNull();
    });
  });

  describe("revealResult", () => {
    it("正解の並び順のとき isCorrect: true になる", () => {
      // crySequence = [0, 1, 2] のとき、正解は pokes[0], pokes[1], pokes[2] の順
      facade.revealResult(pokes, pokes, [0, 1, 2]);
      expect(get(result)).toEqual({ isCorrect: true, message: "せいかい！" });
    });

    it("不正解の並び順のとき isCorrect: false になる", () => {
      // crySequence = [0, 1, 2] に対してユーザーが逆順に並べた
      facade.revealResult([pokes[2]!, pokes[1]!, pokes[0]!], pokes, [0, 1, 2]);
      expect(get(result)).toEqual({ isCorrect: false, message: "ざんねん..." });
    });

    it("先頭だけ正解で残りが違う場合は isCorrect: false になる", () => {
      // crySequence = [0, 1, 2]: 正解順は pokes[0], pokes[1], pokes[2]
      // ユーザーは [pokes[0], pokes[2], pokes[1]] と並べた（先頭のみ一致）
      facade.revealResult([pokes[0]!, pokes[2]!, pokes[1]!], pokes, [0, 1, 2]);
      expect(get(result)).toEqual({ isCorrect: false, message: "ざんねん..." });
    });

    it("crySequence が非恒等順列のとき正解を正しく判定する", () => {
      // crySequence = [2, 0, 1]: 正解順は pokes[2], pokes[0], pokes[1]
      const correctOrder = [pokes[2]!, pokes[0]!, pokes[1]!];
      facade.revealResult(correctOrder, pokes, [2, 0, 1]);
      expect(get(result)).toEqual({ isCorrect: true, message: "せいかい！" });
    });

    it("crySequence が非恒等順列のとき不正解を正しく判定する", () => {
      // crySequence = [2, 0, 1]: 正解順は pokes[2], pokes[0], pokes[1]
      // ユーザーは元の順 [pokes[0], pokes[1], pokes[2]] と並べた
      facade.revealResult(pokes, pokes, [2, 0, 1]);
      expect(get(result)).toEqual({ isCorrect: false, message: "ざんねん..." });
    });
  });

  describe("reset", () => {
    it("ストアが初期状態に戻る", () => {
      facade.revealResult(pokes, pokes, [0, 1, 2]);
      facade.reset();
      expect(get(result)).toBeNull();
      expect(get(pokeDataList)).toHaveLength(0);
    });

    it("crySequence もリセットされる", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue(pokes);
      await facade.pickPokemons(mockFetch);
      expect(get(crySequence)).toHaveLength(3);

      facade.reset();
      expect(get(crySequence)).toHaveLength(0);
    });

    it("isLoading もリセットされる", () => {
      // reset 後は isLoading が false であること
      facade.reset();
      expect(get(isLoading)).toBe(false);
    });
  });
});
