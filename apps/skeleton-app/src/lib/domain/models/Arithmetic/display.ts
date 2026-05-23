/**
 * 四則演算式の表示ロジック
 *
 * @architecture レイヤー間依存ルール - ドメイン層
 * - ROLE: ExprNode を人間が読める文字列に変換する
 * - ALLOWED: 同ドメインモデル（expression.ts）への依存
 * - FORBIDDEN: アプリ層・インフラ層・プレゼン層への依存
 */

import type { ExprNode, Operator } from "./expression";
import { OPERATOR_LABEL } from "./expression";

// 演算子の優先度（高いほど先に計算）
const PRECEDENCE: Record<Operator, number> = {
  add: 1,
  sub: 1,
  mul: 2,
  div: 2,
};

/**
 * 中置記法の文字列を生成する
 * 演算子の優先度に基づいて括弧を自動付与する（例: "(A − B) × 2"）
 */
export function toInfixString(node: ExprNode): string {
  if (node.kind === "num") return node.label;

  const leftStr = needsParens(node.left, node.op, "left") ? `(${toInfixString(node.left)})` : toInfixString(node.left);

  const rightStr = needsParens(node.right, node.op, "right")
    ? `(${toInfixString(node.right)})`
    : toInfixString(node.right);

  return `${leftStr} ${OPERATOR_LABEL[node.op]} ${rightStr}`;
}

function needsParens(child: ExprNode, parentOp: Operator, side: "left" | "right"): boolean {
  if (child.kind === "num") return false;
  const childPrec = PRECEDENCE[child.op];
  const parentPrec = PRECEDENCE[parentOp];
  if (childPrec < parentPrec) return true;
  // sub・div の右側は同優先度でも結合順が変わるため括弧が必要
  // 例: a − (b − c) ≠ a − b − c
  if (side === "right" && childPrec === parentPrec && (parentOp === "sub" || parentOp === "div")) return true;
  return false;
}
