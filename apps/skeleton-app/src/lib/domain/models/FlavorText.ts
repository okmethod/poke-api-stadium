/**
 * FlavorText - フレーバーテキスト共通モデル
 *
 * @architecture レイヤー間依存ルール - ドメイン層
 * - ROLE: 外部に依存しない静的データモデル（Pure TypeScript）
 * - ALLOWED: 同ドメイン層モデルへの依存
 * - FORBIDDEN: Svelte / DOM / 外部ライブラリへの依存
 */

/**
 * バージョン別フレーバーテキスト（図鑑・わざ共通）
 *
 * @remarks
 * - 図鑑テキスト（species）: `version` に個別バージョン名が入る（例: "scarlet", "sword"）
 * - わざテキスト（move）: `version` にバージョングループ名が入る（例: "scarlet-violet", "sword-shield"）
 */
export interface FlavorText {
  readonly text: string;
  readonly version: string;
}

/** 漢字・かなのテキストペア（漢字クイズ用） */
export interface FlavorTextPair {
  /** ja 版（漢字あり） */
  readonly kanji: string;
  /** ja-Hrkt 版（ひらがな/カタカナのみ） */
  readonly kana: string;
}
