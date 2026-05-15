/**
 * PokeItem - アプリ内部のアイテム（グッズ）表現
 *
 * @architecture レイヤー間依存ルール - ドメイン層
 * - ROLE: 外部に依存しない静的データモデル（Pure TypeScript）
 * - ALLOWED: 同ドメイン層モデルへの依存
 * - FORBIDDEN: Svelte / DOM / 外部ライブラリへの依存
 */

/** アプリ内部のアイテムモデル */
export interface PokeItem {
  readonly id: number;
  readonly enName: string;
  readonly jaName: string;
  readonly imageUrl: string | null;
  readonly category: string;
  readonly flavorText: string | null;
}

/** アイテムポケット（ゲーム内バッグのポケット区分） */
export interface PokeItemPocket {
  readonly id: number;
  readonly enName: string;
  readonly jaName: string;
}

/** PokeAPI の item-pocket エンドポイントで定義される 8 種のポケット */
export const ITEM_POCKETS: readonly PokeItemPocket[] = [
  { id: 1, enName: "misc", jaName: "どうぐ" },
  { id: 2, enName: "medicine", jaName: "かいふく" },
  { id: 3, enName: "pokeballs", jaName: "ボール" },
  { id: 4, enName: "machines", jaName: "わざマシン" },
  { id: 5, enName: "berries", jaName: "きのみ" },
  { id: 6, enName: "mail", jaName: "メール" },
  { id: 7, enName: "battle", jaName: "せんとう" },
  { id: 8, enName: "key", jaName: "たいせつなもの" },
] as const;

/** アイテムカテゴリのメタ情報（一覧表示用） */
export interface PokeItemCategoryMeta {
  readonly id: number;
  readonly enName: string;
  readonly jaName: string;
}

/** アイテムカテゴリ（カテゴリ内アイテム一覧を含む） */
export interface PokeItemCategory extends PokeItemCategoryMeta {
  /** カテゴリに属するアイテムの英語名一覧 */
  readonly items: readonly string[];
}

/** アプリ内部のアイテムモデル */
export interface PokeItem {
  readonly id: number;
  readonly enName: string;
  readonly jaName: string;
  readonly imageUrl: string | null;
  readonly category: string;
  readonly flavorText: string | null;
}
