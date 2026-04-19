/**
 * PokeTypeName / PokeTypeData - ポケモンのタイプ情報
 *
 * @architecture レイヤー間依存ルール - ドメイン層
 * - ROLE: 外部に依存しない静的データモデル（Pure TypeScript）
 * - ALLOWED: なし（依存ゼロ）
 * - FORBIDDEN: Svelte / DOM / 外部ライブラリへの依存
 */

/** 18 種類のポケモンタイプ名（PokeAPI の英語名に準拠） */
export type PokeTypeName =
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

const TYPE_JA: Record<PokeTypeName, string> = {
  normal: "ノーマル",
  fire: "ほのお",
  water: "みず",
  electric: "でんき",
  grass: "くさ",
  ice: "こおり",
  fighting: "かくとう",
  poison: "どく",
  ground: "じめん",
  flying: "ひこう",
  psychic: "エスパー",
  bug: "むし",
  rock: "いわ",
  ghost: "ゴースト",
  dragon: "ドラゴン",
  dark: "あく",
  steel: "はがね",
  fairy: "フェアリー",
};

const TYPE_COLORS: Record<PokeTypeName, string> = {
  normal: "#a8a878",
  fire: "#f08030",
  water: "#6890f0",
  electric: "#f8d030",
  grass: "#78c850",
  ice: "#98d8d8",
  fighting: "#c03028",
  poison: "#a040a0",
  ground: "#e0c068",
  flying: "#a890f0",
  psychic: "#f85888",
  bug: "#a8b820",
  rock: "#b8a038",
  ghost: "#705898",
  dragon: "#7038f8",
  dark: "#705848",
  steel: "#b8b8d0",
  fairy: "#ee99ac",
};

/** タイプ名に対応する日本語名（APIを使わない静的ルックアップ用） */
export const pokeTypeJaName = (name: PokeTypeName): string => TYPE_JA[name];

/** タイプ名に対応するカラー */
export const pokeTypeColor = (name: PokeTypeName): string => TYPE_COLORS[name];

/** タイプ相性の方向別リスト（攻撃・防御それぞれ） */
export interface DamageRelations {
  readonly noDamageTo: readonly PokeTypeName[];
  readonly halfDamageTo: readonly PokeTypeName[];
  readonly doubleDamageTo: readonly PokeTypeName[];
  readonly noDamageFrom: readonly PokeTypeName[];
  readonly halfDamageFrom: readonly PokeTypeName[];
  readonly doubleDamageFrom: readonly PokeTypeName[];
}

/** ポケモンタイプ関連データ */
export interface PokeTypeData {
  readonly name: PokeTypeName;
  readonly jaName: string;
  readonly color: string;
  readonly damageRelations: DamageRelations;
}
