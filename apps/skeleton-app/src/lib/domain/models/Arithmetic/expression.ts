/**
 * 四則演算の式モデル
 *
 * @architecture レイヤー間依存ルール - ドメイン層
 * - ROLE: 四則演算の式ツリー定義・評価・文字列生成
 * - ALLOWED: 外部依存なし（Pure TypeScript）
 * - FORBIDDEN: アプリ層・インフラ層・プレゼン層への依存
 */

// --- 型定義 ---

/** 四則演算子（定義用キー） */
export type Operator = "add" | "sub" | "mul" | "div";

/** 演算子の表示ラベル */
export const OPERATOR_LABEL: Record<Operator, string> = {
  add: "+",
  sub: "−",
  mul: "×",
  div: "÷",
};

/** 数値ノード */
export type NumNode = {
  readonly kind: "num";
  /** 表示ラベル（例: "ピカチュウのこうげき"） */
  readonly label: string;
  readonly value: number;
};

/** 演算ノード */
export type OpNode = {
  readonly kind: "op";
  readonly op: Operator;
  readonly left: ExprNode;
  readonly right: ExprNode;
};

/** 式ノード（再帰ツリー） */
export type ExprNode = NumNode | OpNode;

/** 評価時の丸めモード */
export type RoundMode = "none" | "floor" | "ceil" | "round";

// --- ノード生成ヘルパー ---

/** 数値ノードを生成する */
export function num(label: string, value: number): NumNode {
  return { kind: "num", label, value };
}

/** 演算ノードを生成する */
export function opNode(op: Operator, left: ExprNode, right: ExprNode): OpNode {
  return { kind: "op", op, left, right };
}

// --- 評価 ---

/** 式を評価する（丸めモードを外部から指定可能） */
export function evalNode(node: ExprNode, round: RoundMode = "none"): number {
  const raw = evalRaw(node);
  switch (round) {
    case "floor":
      return Math.floor(raw);
    case "ceil":
      return Math.ceil(raw);
    case "round":
      return Math.round(raw);
    default:
      return raw;
  }
}

function evalRaw(node: ExprNode): number {
  if (node.kind === "num") return node.value;
  const l = evalRaw(node.left);
  const r = evalRaw(node.right);
  switch (node.op) {
    case "add":
      return l + r;
    case "sub":
      return l - r;
    case "mul":
      return l * r;
    case "div":
      return l / r;
  }
}

/** 現在の値で評価した結果が整数になるかどうか（割り切れない ÷ を含む式の検出に使う） */
export function isExactInteger(node: ExprNode): boolean {
  return Number.isInteger(evalRaw(node));
}
