/**
 * TypeName / TypeData - ポケモンのタイプ情報
 *
 * @architecture レイヤー間依存ルール - ドメイン層
 * - ROLE: 外部に依存しない静的データモデル（Pure TypeScript）
 * - ALLOWED: なし（依存ゼロ）
 * - FORBIDDEN: Svelte / DOM / 外部ライブラリへの依存
 */

/** 18 種類のポケモンタイプ名（PokeAPI の英語名に準拠） */
export type TypeName =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

/** タイプ相性の方向別リスト（攻撃・防御それぞれ） */
export interface DamageRelations {
  readonly noDamageTo: readonly TypeName[];
  readonly halfDamageTo: readonly TypeName[];
  readonly doubleDamageTo: readonly TypeName[];
  readonly noDamageFrom: readonly TypeName[];
  readonly halfDamageFrom: readonly TypeName[];
  readonly doubleDamageFrom: readonly TypeName[];
}

/** タイプの完全モデル（ゲームロジックでタイプ相性を参照するために使用） */
export interface TypeData {
  readonly name: TypeName;
  readonly damageRelations: DamageRelations;
}
