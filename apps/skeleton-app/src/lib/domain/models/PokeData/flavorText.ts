/**
 * 図鑑テキスト情報
 */

/** 図鑑テキスト（バージョン別・重複除去済み） */
export interface FlavorText {
  readonly text: string;
  /** バージョン名（例: "scarlet", "sword"） */
  readonly version: string;
}
