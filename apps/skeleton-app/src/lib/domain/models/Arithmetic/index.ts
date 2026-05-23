/**
 * Arithmetic - 四則演算モデル
 *
 * @architecture レイヤー間依存ルール - ドメイン層
 * - ROLE: 四則演算に関するビジネスルールやロジックの定義
 * - ALLOWED: 外部依存なし（Pure TypeScript）
 * - FORBIDDEN: アプリ層・インフラ層・プレゼン層への依存
 */

export type { ExprNode, NumNode, OpNode, Operator, RoundMode } from "./expression";
export { OPERATOR_LABEL, num, opNode, evalNode, isExactInteger } from "./expression";
export { toInfixString } from "./display";
