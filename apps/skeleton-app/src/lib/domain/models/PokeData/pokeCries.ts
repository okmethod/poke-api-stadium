/**
 * PokeCryUrls - ポケモン鳴き声URLの集約モデル
 */

export interface PokeCryUrls {
  /** 最新版の鳴き声（存在しない場合は null） */
  readonly latest: string | null;
  /** レガシー版の鳴き声（存在しない場合は null） */
  readonly legacy: string | null;
}
