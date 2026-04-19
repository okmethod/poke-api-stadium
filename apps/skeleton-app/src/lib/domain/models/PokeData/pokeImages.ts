/**
 * PokeImageUrls - ポケモン画像URLの集約モデル
 */

export interface PokeImageUrls {
  readonly pixel: {
    /** 通常スプライト（表） */
    readonly front: string | null;
    /** 通常スプライト（裏） */
    readonly back: string | null;
  };
  readonly artwork: {
    /** 公式アートワーク（表）。フォールバック込みで必ず存在 */
    readonly front: string;
    /** 公式アートワーク（裏） */
    readonly back: string | null;
  };
  readonly gif: {
    /** Showdown GIF（表） */
    readonly front: string | null;
    /** Showdown GIF（裏） */
    readonly back: string | null;
  };
  /** 利用可能な全画像URLリスト（artwork.front を先頭に、null を除外済み） */
  readonly all: readonly string[];
}
