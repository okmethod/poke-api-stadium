/**
 * ポケモンのステータス情報
 */

/** ポケモンの 6 種基本ステータス */
export interface PokeStats {
  readonly hp: number;
  readonly attack: number;
  readonly defense: number;
  readonly spAtk: number;
  readonly spDef: number;
  readonly speed: number;
}

const STAT_JA: Record<keyof PokeStats, string> = {
  hp: "HP",
  attack: "こうげき",
  defense: "ぼうぎょ",
  spAtk: "とくこう",
  spDef: "とくぼう",
  speed: "すばやさ",
};

/** ステータスキーに対応する日本語名（APIを使わない静的ルックアップ用） */
export const pokeStatJaName = (key: keyof PokeStats): string => STAT_JA[key];
