/**
 * PokeCryUrls - ポケモン鳴き声URLの集約モデル
 */

export interface PokeCryUrls {
  /** 最新版の鳴き声（存在しない場合は null） */
  readonly latest: string | null;
  /** レガシー版の鳴き声（存在しない場合は null） */
  readonly legacy: string | null;
}

/** 鳴き声URLを解決する（latest 優先、なければ legacy） */
export const resolvedCryUrl = (cryUrls: PokeCryUrls): string | null => {
  return cryUrls.latest ?? cryUrls.legacy;
};
