/**
 * ポケモンのタイプ情報
 */

// TYPE_JA を SSoT とし、キーから PokeTypeName を派生させる
const TYPE_JA = {
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
} as const;

/** 18 種類のポケモンタイプ名（PokeAPI の英語名に準拠） */
export type PokeTypeName = keyof typeof TYPE_JA;

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

/** 全タイプ名の配列（UI でのイテレーション用） */
export const ALL_TYPE_NAMES: PokeTypeName[] = Object.keys(TYPE_JA) as PokeTypeName[];

/** タイプ名に対応する日本語名（APIを使わない静的ルックアップ用） */
export const pokeTypeJaName = (name: PokeTypeName): string => TYPE_JA[name];

/** タイプ名に対応するカラー */
export const pokeTypeColor = (name: PokeTypeName): string => TYPE_COLORS[name];

/**
 * 文字列を PokeTypeName に変換する（未知の値は例外を投げる）
 *
 * `as` アサーションの代替として、バウンダリで一度だけ検証するために使う。
 */
export function parsePokeTypeName(name: string): PokeTypeName {
  if (!(name in TYPE_JA)) throw new Error(`Unknown PokeTypeName: ${name}`);
  return name as PokeTypeName;
}

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
