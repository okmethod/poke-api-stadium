/**
 * TypeMemoryGame (facade + store) のテスト
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { get } from "svelte/store";
import {
  TypeMemoryGameFacade,
  findSharedType,
  buildSolvablePairs,
} from "$lib/application/usecases/TypeMemoryGame/facade";
import type { PokeData } from "$lib/domain/models/PokeData";

// バックトラッキングによる完全マッチング検証（buildSolvablePairs の出力検証用）
function isSolvable(pokemons: PokeData[]): boolean {
  const n = pokemons.length;
  if (n === 0 || n % 2 !== 0) return false;
  const used = new Array<boolean>(n).fill(false);
  function backtrack(): boolean {
    const first = used.indexOf(false);
    if (first === -1) return true;
    used[first] = true;
    for (let j = first + 1; j < n; j++) {
      if (!used[j] && findSharedType(pokemons[first]!, pokemons[j]!) !== null) {
        used[j] = true;
        if (backtrack()) return true;
        used[j] = false;
      }
    }
    used[first] = false;
    return false;
  }
  return backtrack();
}
import {
  cards,
  isChecking,
  matchedPairCount,
  moveCount,
  isGameClear,
  lastMatchResult,
  totalPairCount,
} from "$lib/application/usecases/TypeMemoryGame/store";
import { buildMockPokeData } from "../../../__testUtils__/mockPokeData";
import { createMockRepository } from "../../../__testUtils__/mockRepository";

vi.mock("$lib/application/utils/pokeSelectionUtils", () => ({
  selectRandomPokemons: vi.fn(),
}));

import { selectRandomPokemons } from "$lib/application/utils/pokeSelectionUtils";

const mockFetch = vi.fn() as unknown as typeof fetch;

// ヒトカゲ(fire) + リザードン(fire/flying) → 共通: fire
// ゼニガメ(water) + カメックス(water) → 共通: water
// → isSolvable: true
const pokes = [
  buildMockPokeData({ speciesId: 4, jaName: "ヒトカゲ", type1: "fire", type2: null }),
  buildMockPokeData({ speciesId: 6, jaName: "リザードン", type1: "fire", type2: "flying" }),
  buildMockPokeData({ speciesId: 7, jaName: "ゼニガメ", type1: "water", type2: null }),
  buildMockPokeData({ speciesId: 9, jaName: "カメックス", type1: "water", type2: null }),
];

describe("TypeMemoryGameFacade", () => {
  let facade: TypeMemoryGameFacade;

  beforeEach(() => {
    facade = new TypeMemoryGameFacade(createMockRepository());
    vi.mocked(selectRandomPokemons).mockReset();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // カードを speciesId で検索するヘルパー
  function findCardIndex(speciesId: number): number {
    return get(cards).findIndex((c) => c.pokeData.speciesId === speciesId);
  }

  describe("startGame", () => {
    it("成功時はカードが 2×ペア数枚生成される（すべて裏向き）", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue(pokes);

      const res = await facade.startGame(mockFetch, 2);

      expect(res.success).toBe(true);
      const currentCards = get(cards);
      expect(currentCards).toHaveLength(4);
      expect(currentCards.every((c) => !c.isFlipped && !c.isMatched && c.matchedType === null)).toBe(true);
    });

    it("実際のペア数が totalPairCount に反映される", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue(pokes);

      await facade.startGame(mockFetch, 2);

      expect(get(totalPairCount)).toBe(2);
    });

    it("共通タイプが存在せずクリア不可能なデータは success: false を返す", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue([
        buildMockPokeData({ speciesId: 1, type1: "grass", type2: null }),
        buildMockPokeData({ speciesId: 4, type1: "fire", type2: null }),
        buildMockPokeData({ speciesId: 7, type1: "water", type2: null }),
        buildMockPokeData({ speciesId: 25, type1: "electric", type2: null }),
      ]);

      const res = await facade.startGame(mockFetch, 2);

      expect(res.success).toBe(false);
      expect(get(cards)).toHaveLength(0);
    });

    it("fetchエラー時は success: false を返し cards が空になる", async () => {
      vi.mocked(selectRandomPokemons).mockRejectedValue(new Error("Network Error"));

      const res = await facade.startGame(mockFetch, 2);

      expect(res.success).toBe(false);
      expect(get(cards)).toHaveLength(0);
    });

    it("再呼び出しするとゲーム状態（手数・ペア数・クリア）がリセットされる", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue(pokes);
      await facade.startGame(mockFetch, 2);
      facade.selectCard(0);

      vi.mocked(selectRandomPokemons).mockResolvedValue(pokes);
      await facade.startGame(mockFetch, 2);

      expect(get(moveCount)).toBe(0);
      expect(get(matchedPairCount)).toBe(0);
      expect(get(isGameClear)).toBe(false);
      expect(get(cards).every((c) => !c.isFlipped && !c.isMatched)).toBe(true);
    });
  });

  describe("selectCard", () => {
    async function setupCards() {
      vi.mocked(selectRandomPokemons).mockResolvedValue(pokes);
      await facade.startGame(mockFetch, 2);
    }

    it("1枚目を選択するとそのカードが表になる", async () => {
      await setupCards();
      facade.selectCard(0);
      expect(get(cards)[0]!.isFlipped).toBe(true);
    });

    it("共通タイプを持つ2枚を選択するとマッチしてペア数・手数が増える", async () => {
      await setupCards();
      const hitokageIdx = findCardIndex(4);
      const lizardonIdx = findCardIndex(6);

      facade.selectCard(hitokageIdx);
      facade.selectCard(lizardonIdx);

      expect(get(matchedPairCount)).toBe(1);
      expect(get(moveCount)).toBe(1);
      expect(get(lastMatchResult)).toEqual({ isCorrect: true });
      // 共通タイプは fire
      expect(get(cards)[hitokageIdx]!.matchedType).toBe("fire");
      expect(get(cards)[lizardonIdx]!.matchedType).toBe("fire");
    });

    it("共通タイプを持たない2枚を選択すると不一致になる", async () => {
      await setupCards();
      const hitokageIdx = findCardIndex(4); // fire
      const zenigameIdx = findCardIndex(7); // water

      facade.selectCard(hitokageIdx);
      facade.selectCard(zenigameIdx);

      expect(get(lastMatchResult)).toEqual({ isCorrect: false });
      expect(get(matchedPairCount)).toBe(0);
    });

    it("不一致時: タイマー経過後にカードが裏に戻り isChecking が解除される", async () => {
      await setupCards();
      const hitokageIdx = findCardIndex(4);
      const zenigameIdx = findCardIndex(7);

      facade.selectCard(hitokageIdx);
      facade.selectCard(zenigameIdx);

      expect(get(isChecking)).toBe(true);

      vi.advanceTimersByTime(1000);

      expect(get(cards)[hitokageIdx]!.isFlipped).toBe(false);
      expect(get(cards)[zenigameIdx]!.isFlipped).toBe(false);
      expect(get(isChecking)).toBe(false);
    });

    it("isChecking 中はカード選択が無視される", async () => {
      await setupCards();
      const hitokageIdx = findCardIndex(4);
      const zenigameIdx = findCardIndex(7);

      facade.selectCard(hitokageIdx);
      facade.selectCard(zenigameIdx); // 不一致 → isChecking: true

      // タイマー経過前（isChecking 中）に別のカードを選択しても無視される
      const faceDownIdx = get(cards).findIndex((c) => !c.isFlipped && !c.isMatched);
      facade.selectCard(faceDownIdx);
      expect(get(cards)[faceDownIdx]!.isFlipped).toBe(false);
    });

    it("マッチ済みカードは選択できない", async () => {
      await setupCards();
      const hitokageIdx = findCardIndex(4);
      const lizardonIdx = findCardIndex(6);

      facade.selectCard(hitokageIdx);
      facade.selectCard(lizardonIdx); // マッチ確定

      const beforeMoveCount = get(moveCount);
      facade.selectCard(hitokageIdx); // マッチ済みカードを選択
      expect(get(moveCount)).toBe(beforeMoveCount);
    });

    it("全ペアをマッチさせるとゲームクリアになる", async () => {
      await setupCards();

      facade.selectCard(findCardIndex(4)); // ヒトカゲ
      facade.selectCard(findCardIndex(6)); // リザードン (fire 共通)
      facade.selectCard(findCardIndex(7)); // ゼニガメ
      facade.selectCard(findCardIndex(9)); // カメックス (water 共通)

      expect(get(isGameClear)).toBe(true);
    });
  });

  describe("resetGame", () => {
    async function setupAndMatchOne() {
      vi.mocked(selectRandomPokemons).mockResolvedValue(pokes);
      await facade.startGame(mockFetch, 2);
      facade.selectCard(findCardIndex(4));
      facade.selectCard(findCardIndex(6)); // ヒトカゲ+リザードン マッチ
    }

    function findCardIndex(speciesId: number): number {
      return get(cards).findIndex((c) => c.pokeData.speciesId === speciesId);
    }

    it("全カードが裏向きに戻り手数・ペア数がリセットされる", async () => {
      await setupAndMatchOne();

      facade.resetGame();

      expect(get(cards).every((c) => !c.isFlipped && !c.isMatched && c.matchedType === null)).toBe(true);
      expect(get(matchedPairCount)).toBe(0);
      expect(get(moveCount)).toBe(0);
      expect(get(isGameClear)).toBe(false);
    });

    it("リセット後も同じポケモンが同じ位置に存在する", async () => {
      await setupAndMatchOne();

      const beforeReset = get(cards).map((c) => c.pokeData.speciesId);
      facade.resetGame();
      const afterReset = get(cards).map((c) => c.pokeData.speciesId);

      expect(afterReset).toEqual(beforeReset);
    });
  });
});

describe("findSharedType", () => {
  it("type1 同士が一致 → そのタイプを返す", () => {
    expect(
      findSharedType(
        buildMockPokeData({ type1: "fire", type2: null }),
        buildMockPokeData({ type1: "fire", type2: null }),
      ),
    ).toBe("fire");
  });

  it("type2 と type1 が一致 → 共通タイプを返す", () => {
    expect(
      findSharedType(
        buildMockPokeData({ type1: "fire", type2: "flying" }),
        buildMockPokeData({ type1: "flying", type2: null }),
      ),
    ).toBe("flying");
  });

  it("type2 同士が一致 → 共通タイプを返す", () => {
    expect(
      findSharedType(
        buildMockPokeData({ type1: "fire", type2: "flying" }),
        buildMockPokeData({ type1: "water", type2: "flying" }),
      ),
    ).toBe("flying");
  });

  it("共通タイプなし → null", () => {
    expect(
      findSharedType(
        buildMockPokeData({ type1: "fire", type2: null }),
        buildMockPokeData({ type1: "water", type2: null }),
      ),
    ).toBe(null);
  });
});

describe("isSolvable", () => {
  it("空配列 → false", () => {
    expect(isSolvable([])).toBe(false);
  });

  it("奇数個 → false", () => {
    expect(
      isSolvable([
        buildMockPokeData({ type1: "fire" }),
        buildMockPokeData({ type1: "fire" }),
        buildMockPokeData({ type1: "fire" }),
      ]),
    ).toBe(false);
  });

  it("2体: 共通タイプなし → false", () => {
    expect(
      isSolvable([
        buildMockPokeData({ type1: "grass", type2: null }),
        buildMockPokeData({ type1: "fire", type2: null }),
      ]),
    ).toBe(false);
  });

  it("2体: 共通タイプあり → true", () => {
    expect(
      isSolvable([
        buildMockPokeData({ type1: "fire", type2: null }),
        buildMockPokeData({ type1: "fire", type2: "flying" }),
      ]),
    ).toBe(true);
  });

  it("4体: 全員共通タイプなし → false", () => {
    expect(
      isSolvable([
        buildMockPokeData({ type1: "grass", type2: null }),
        buildMockPokeData({ type1: "fire", type2: null }),
        buildMockPokeData({ type1: "water", type2: null }),
        buildMockPokeData({ type1: "electric", type2: null }),
      ]),
    ).toBe(false);
  });

  it("4体: ソルバブル → true", () => {
    expect(
      isSolvable([
        buildMockPokeData({ speciesId: 4, type1: "fire", type2: null }),
        buildMockPokeData({ speciesId: 6, type1: "fire", type2: "flying" }),
        buildMockPokeData({ speciesId: 7, type1: "water", type2: null }),
        buildMockPokeData({ speciesId: 9, type1: "water", type2: null }),
      ]),
    ).toBe(true);
  });

  it("グリーディーでは詰むが別解あり → バックトラックで true を返す", () => {
    // A(fire/water), C(water/grass), B(fire), D(grass) の順
    // グリーディー: A-C(water)→ B(fire) と D(grass) が残り不一致 → バックトラック
    // 正解: A-B(fire), C-D(grass)
    expect(
      isSolvable([
        buildMockPokeData({ speciesId: 1, type1: "fire", type2: "water" }), // A
        buildMockPokeData({ speciesId: 2, type1: "water", type2: "grass" }), // C
        buildMockPokeData({ speciesId: 3, type1: "fire", type2: null }), // B
        buildMockPokeData({ speciesId: 4, type1: "grass", type2: null }), // D
      ]),
    ).toBe(true);
  });
});

describe("buildSolvablePairs", () => {
  it("空プール → null", () => {
    expect(buildSolvablePairs([], 1)).toBeNull();
  });

  it("共通タイプを持つペアが存在しない → null", () => {
    expect(
      buildSolvablePairs(
        [
          buildMockPokeData({ type1: "grass", type2: null }),
          buildMockPokeData({ type1: "fire", type2: null }),
          buildMockPokeData({ type1: "water", type2: null }),
          buildMockPokeData({ type1: "electric", type2: null }),
        ],
        2,
      ),
    ).toBeNull();
  });

  it("ペア数が足りない → null", () => {
    // fire ペアが 1 組しかないのに 2 ペア要求
    expect(
      buildSolvablePairs(
        [
          buildMockPokeData({ type1: "fire", type2: null }),
          buildMockPokeData({ type1: "fire", type2: null }),
          buildMockPokeData({ type1: "grass", type2: null }),
          buildMockPokeData({ type1: "water", type2: null }),
        ],
        2,
      ),
    ).toBeNull();
  });

  it("成功時は pairCount * 2 要素を返す", () => {
    const pool = [
      buildMockPokeData({ speciesId: 4, type1: "fire", type2: null }),
      buildMockPokeData({ speciesId: 6, type1: "fire", type2: "flying" }),
      buildMockPokeData({ speciesId: 7, type1: "water", type2: null }),
      buildMockPokeData({ speciesId: 9, type1: "water", type2: null }),
    ];
    const result = buildSolvablePairs(pool, 2);
    expect(result).not.toBeNull();
    expect(result).toHaveLength(4);
  });

  it("返却されたポケモン群は isSolvable を満たす", () => {
    const pool = [
      buildMockPokeData({ speciesId: 4, type1: "fire", type2: null }),
      buildMockPokeData({ speciesId: 6, type1: "fire", type2: "flying" }),
      buildMockPokeData({ speciesId: 7, type1: "water", type2: null }),
      buildMockPokeData({ speciesId: 9, type1: "water", type2: null }),
    ];
    const result = buildSolvablePairs(pool, 2);
    expect(isSolvable(result!)).toBe(true);
  });

  it("greedy が詰む順序でもシャッフルで別解を見つけられる", () => {
    // 並び順: A(fire/water), C(water/grass), B(fire), D(grass)
    // この順のまま greedy: A-C(water) → B と D が不一致 → null になる
    // 別シャッフル（A,B,C,D の順）なら: A-B(fire), C-D(grass) で成功する
    // buildSolvablePairs は呼び出し側がシャッフルを変えながら再試行することを前提とする
    const poolFailing = [
      buildMockPokeData({ speciesId: 1, type1: "fire", type2: "water" }), // A
      buildMockPokeData({ speciesId: 2, type1: "water", type2: "grass" }), // C
      buildMockPokeData({ speciesId: 3, type1: "fire", type2: null }), // B
      buildMockPokeData({ speciesId: 4, type1: "grass", type2: null }), // D
    ];
    // この順序では greedy は null を返す
    expect(buildSolvablePairs(poolFailing, 2)).toBeNull();

    // A-B 順になるようシャッフルすると成功する
    const poolPassing = [
      buildMockPokeData({ speciesId: 1, type1: "fire", type2: "water" }), // A
      buildMockPokeData({ speciesId: 3, type1: "fire", type2: null }), // B
      buildMockPokeData({ speciesId: 2, type1: "water", type2: "grass" }), // C
      buildMockPokeData({ speciesId: 4, type1: "grass", type2: null }), // D
    ];
    const result = buildSolvablePairs(poolPassing, 2);
    expect(result).not.toBeNull();
    expect(isSolvable(result!)).toBe(true);
  });
});
