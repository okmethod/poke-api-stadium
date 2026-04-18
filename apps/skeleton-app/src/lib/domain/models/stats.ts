/**
 * Stats - ポケモンの 6 種ステータス
 *
 * @architecture レイヤー間依存ルール - ドメイン層
 * - ROLE: 外部に依存しない静的データモデル（Pure TypeScript）
 * - ALLOWED: なし（依存ゼロ）
 * - FORBIDDEN: Svelte / DOM / 外部ライブラリへの依存
 */

/** ポケモンの 6 種基本ステータス */
export interface Stats {
  readonly hp: number;
  readonly attack: number;
  readonly defense: number;
  readonly spAtk: number;
  readonly spDef: number;
  readonly speed: number;
}
