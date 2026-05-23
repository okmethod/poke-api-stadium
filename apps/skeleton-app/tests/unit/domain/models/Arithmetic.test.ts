/**
 * Arithmetic ドメインモデル（expression + display）のテスト
 */

import { describe, it, expect } from "vitest";
import { num, opNode, evalNode, isExactInteger, toInfixString } from "$lib/domain/models/Arithmetic";

// --- ヘルパー ---

const a = num("A", 10);
const b = num("B", 4);
const c = num("C", 3);

// --- evalNode ---

describe("evalNode", () => {
  describe("単一数値ノード", () => {
    it("そのまま値を返す", () => {
      expect(evalNode(num("x", 42))).toBe(42);
    });
  });

  describe("四則演算", () => {
    it("加算: 10 + 4 = 14", () => {
      expect(evalNode(opNode("add", a, b))).toBe(14);
    });

    it("減算: 10 - 4 = 6", () => {
      expect(evalNode(opNode("sub", a, b))).toBe(6);
    });

    it("乗算: 10 × 4 = 40", () => {
      expect(evalNode(opNode("mul", a, b))).toBe(40);
    });

    it("除算: 10 ÷ 4 = 2.5", () => {
      expect(evalNode(opNode("div", a, b))).toBe(2.5);
    });
  });

  describe("ネスト式", () => {
    it("(10 + 4) × 3 = 42", () => {
      expect(evalNode(opNode("mul", opNode("add", a, b), c))).toBe(42);
    });

    it("10 - (4 - 3) = 9", () => {
      expect(evalNode(opNode("sub", a, opNode("sub", b, c)))).toBe(9);
    });
  });

  describe("RoundMode", () => {
    // 10 ÷ 3 = 3.333...
    const divNode = opNode("div", a, c);

    it("none（デフォルト）: 小数をそのまま返す", () => {
      expect(evalNode(divNode)).toBeCloseTo(3.333, 3);
    });

    it("floor: Math.floor(10/3) = 3", () => {
      expect(evalNode(divNode, "floor")).toBe(3);
    });

    it("ceil: Math.ceil(10/3) = 4", () => {
      expect(evalNode(divNode, "ceil")).toBe(4);
    });

    it("round: Math.round(10/3) = 3", () => {
      expect(evalNode(divNode, "round")).toBe(3);
    });

    it("round: Math.round(7/2) = 4（四捨五入）", () => {
      expect(evalNode(opNode("div", num("7", 7), num("2", 2)), "round")).toBe(4);
    });
  });
});

// --- isExactInteger ---

describe("isExactInteger", () => {
  it("6 ÷ 3 = 2 → true", () => {
    expect(isExactInteger(opNode("div", num("6", 6), c))).toBe(true);
  });

  it("10 ÷ 4 = 2.5 → false", () => {
    expect(isExactInteger(opNode("div", a, b))).toBe(false);
  });

  it("加算の結果は整数 → true", () => {
    expect(isExactInteger(opNode("add", a, b))).toBe(true);
  });

  it("(10 + 4) ÷ 2 = 7 → true", () => {
    expect(isExactInteger(opNode("div", opNode("add", a, b), num("2", 2)))).toBe(true);
  });

  it("(10 + 4) ÷ 3 → false（割り切れない）", () => {
    expect(isExactInteger(opNode("div", opNode("add", a, b), c))).toBe(false);
  });
});

// --- toInfixString ---

describe("toInfixString", () => {
  describe("単一数値ノード", () => {
    it("ラベルをそのまま返す", () => {
      expect(toInfixString(num("ピカチュウのこうげき", 55))).toBe("ピカチュウのこうげき");
    });
  });

  describe("二項演算（括弧不要）", () => {
    it("加算: A + B", () => {
      expect(toInfixString(opNode("add", a, b))).toBe("A + B");
    });

    it("減算: A − B", () => {
      expect(toInfixString(opNode("sub", a, b))).toBe("A − B");
    });

    it("乗算: A × B", () => {
      expect(toInfixString(opNode("mul", a, b))).toBe("A × B");
    });

    it("除算: A ÷ B", () => {
      expect(toInfixString(opNode("div", a, b))).toBe("A ÷ B");
    });
  });

  describe("優先度による括弧付与", () => {
    it("(A + B) × C: 低優先度の左側に括弧", () => {
      expect(toInfixString(opNode("mul", opNode("add", a, b), c))).toBe("(A + B) × C");
    });

    it("A × (B + C): 低優先度の右側に括弧", () => {
      expect(toInfixString(opNode("mul", a, opNode("add", b, c)))).toBe("A × (B + C)");
    });

    it("A + B × C: 右側が高優先度でも括弧不要", () => {
      expect(toInfixString(opNode("add", a, opNode("mul", b, c)))).toBe("A + B × C");
    });

    it("A × B + C: 左側が高優先度でも括弧不要（addが親）", () => {
      expect(toInfixString(opNode("add", opNode("mul", a, b), c))).toBe("A × B + C");
    });
  });

  describe("右結合の特殊ケース（sub・div の右側は同優先度でも括弧が必要）", () => {
    it("A − (B − C): 括弧なしだと意味が変わるため括弧付与", () => {
      expect(toInfixString(opNode("sub", a, opNode("sub", b, c)))).toBe("A − (B − C)");
    });

    it("A ÷ (B ÷ C): 括弧なしだと意味が変わるため括弧付与", () => {
      expect(toInfixString(opNode("div", a, opNode("div", b, c)))).toBe("A ÷ (B ÷ C)");
    });

    it("A − B − C: 左側は同優先度でも括弧不要", () => {
      expect(toInfixString(opNode("sub", opNode("sub", a, b), c))).toBe("A − B − C");
    });

    it("A ÷ B ÷ C: 左側は同優先度でも括弧不要", () => {
      expect(toInfixString(opNode("div", opNode("div", a, b), c))).toBe("A ÷ B ÷ C");
    });
  });

  describe("複合ネスト", () => {
    it("(A + B) × (B − C)", () => {
      expect(toInfixString(opNode("mul", opNode("add", a, b), opNode("sub", b, c)))).toBe("(A + B) × (B − C)");
    });

    it("A + B + C: 左から結合で括弧不要", () => {
      expect(toInfixString(opNode("add", opNode("add", a, b), c))).toBe("A + B + C");
    });
  });
});
