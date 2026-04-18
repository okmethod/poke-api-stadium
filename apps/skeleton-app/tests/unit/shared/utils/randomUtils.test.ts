/**
 * ランダム選択ユーティリティ関数群のテスト
 */

import { describe, it, expect } from "vitest";
import {
  getRandomNumber,
  pickRandomNumbers,
  pickRandomElementsFromArray,
  pickRandomElementsFromObject,
} from "$lib/shared/utils/randomUtils";

describe("getRandomNumber", () => {
  it("[0, length) の範囲内の整数が返ること", () => {
    for (let i = 0; i < 100; i++) {
      const result = getRandomNumber(10);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(10);
      expect(Number.isInteger(result)).toBe(true);
    }
  });

  it("複数回実行で異なる値が得られること（ランダム性の検証）", () => {
    const results = new Set<number>();
    for (let i = 0; i < 50; i++) {
      results.add(getRandomNumber(10));
    }
    // 50回試行で少なくとも3種類以上の値が出るはず
    expect(results.size).toBeGreaterThanOrEqual(3);
  });
});

describe("pickRandomNumbers", () => {
  it("指定した個数を返すこと", () => {
    const result = pickRandomNumbers([1, 2, 3, 4, 5], 3);
    expect(result).toHaveLength(3);
  });

  it("元の配列の要素のみが含まれること", () => {
    const numbers = [10, 20, 30, 40, 50];
    const result = pickRandomNumbers(numbers, 3);
    result.forEach((n) => expect(numbers).toContain(n));
  });

  it("重複なく選択されること", () => {
    const numbers = [1, 2, 3, 4, 5];
    const result = pickRandomNumbers(numbers, 5);
    const unique = new Set(result);
    expect(unique.size).toBe(result.length);
  });

  it("全要素を選択できること", () => {
    const numbers = [1, 2, 3];
    const result = pickRandomNumbers(numbers, 3);
    expect(result.sort()).toEqual([1, 2, 3]);
  });

  it("要素数が不足する場合にエラーをスローすること", () => {
    expect(() => pickRandomNumbers([1, 2], 3)).toThrow("shortage elements in the array");
  });

  it("空配列から0件選択できること", () => {
    const result = pickRandomNumbers([], 0);
    expect(result).toEqual([]);
  });
});

describe("pickRandomElementsFromArray", () => {
  it("指定した個数を返すこと", () => {
    const result = pickRandomElementsFromArray(["a", "b", "c", "d"], 2);
    expect(result).toHaveLength(2);
  });

  it("元の配列の要素のみが含まれること", () => {
    const array = ["x", "y", "z"];
    const result = pickRandomElementsFromArray(array, 2);
    result.forEach((el) => expect(array).toContain(el));
  });

  it("重複なく選択されること", () => {
    const array = [1, 2, 3, 4, 5];
    const result = pickRandomElementsFromArray(array, 5);
    const unique = new Set(result);
    expect(unique.size).toBe(result.length);
  });

  it("複数回実行で異なる選択結果が得られること（ランダム性の検証）", () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const results = new Set<string>();
    for (let i = 0; i < 20; i++) {
      results.add(JSON.stringify(pickRandomElementsFromArray(array, 5)));
    }
    expect(results.size).toBeGreaterThanOrEqual(3);
  });

  it("要素数が不足する場合にエラーをスローすること", () => {
    expect(() => pickRandomElementsFromArray(["a", "b"], 3)).toThrow("shortage elements in the array");
  });

  it("オブジェクト型で動作すること", () => {
    interface Card {
      id: number;
    }
    const cards: Card[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    const result = pickRandomElementsFromArray(cards, 2);
    expect(result).toHaveLength(2);
    result.forEach((c) => expect(cards).toContain(c));
  });
});

describe("pickRandomElementsFromObject", () => {
  it("指定した個数を返すこと", () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    const result = pickRandomElementsFromObject(obj, 2);
    expect(result).toHaveLength(2);
  });

  it("元のオブジェクトの値のみが含まれること", () => {
    const obj = { x: 10, y: 20, z: 30 };
    const values = Object.values(obj);
    const result = pickRandomElementsFromObject(obj, 2);
    result.forEach((v) => expect(values).toContain(v));
  });

  it("重複なく選択されること", () => {
    const obj = { a: "A", b: "B", c: "C", d: "D", e: "E" };
    const result = pickRandomElementsFromObject(obj, 5);
    const unique = new Set(result);
    expect(unique.size).toBe(result.length);
  });

  it("全要素を選択できること", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = pickRandomElementsFromObject(obj, 3);
    expect(result.sort()).toEqual([1, 2, 3]);
  });

  it("要素数が不足する場合にエラーをスローすること", () => {
    expect(() => pickRandomElementsFromObject({ a: 1 }, 2)).toThrow("shortage elements in the array");
  });

  it("値がオブジェクト型でも動作すること", () => {
    const obj = {
      card1: { id: 1, name: "Foo" },
      card2: { id: 2, name: "Bar" },
      card3: { id: 3, name: "Baz" },
    };
    const result = pickRandomElementsFromObject(obj, 2);
    expect(result).toHaveLength(2);
    const allValues = Object.values(obj);
    result.forEach((v) => expect(allValues).toContain(v));
  });
});
