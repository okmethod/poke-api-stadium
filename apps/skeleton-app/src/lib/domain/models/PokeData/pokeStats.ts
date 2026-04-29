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
