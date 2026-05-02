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
  readonly iconItemKey: string;
}

/** アイテムポケット enName をキーとするアイコン辞書 */
const ITEM_POCKET_ICONS = {
  misc: "poke-doll",
  medicine: "potion",
  pokeballs: "poke-ball",
  machines: "tm-normal",
  berries: "sitrus-berry",
  mail: "reply-mail",
  battle: "dire-hit",
  key: "bicycle",
} as const satisfies Record<string, string>;

/** PokeAPI の item-pocket エンドポイントで定義される 8 種のポケット */
export const ITEM_POCKETS: readonly PokeItemPocket[] = [
  { id: 1, enName: "misc", jaName: "どうぐ", iconItemKey: ITEM_POCKET_ICONS.misc },
  { id: 2, enName: "medicine", jaName: "かいふく", iconItemKey: ITEM_POCKET_ICONS.medicine },
  { id: 3, enName: "pokeballs", jaName: "ボール", iconItemKey: ITEM_POCKET_ICONS.pokeballs },
  { id: 4, enName: "machines", jaName: "わざマシン", iconItemKey: ITEM_POCKET_ICONS.machines },
  { id: 5, enName: "berries", jaName: "きのみ", iconItemKey: ITEM_POCKET_ICONS.berries },
  { id: 6, enName: "mail", jaName: "メール", iconItemKey: ITEM_POCKET_ICONS.mail },
  { id: 7, enName: "battle", jaName: "せんとう", iconItemKey: ITEM_POCKET_ICONS.battle },
  { id: 8, enName: "key", jaName: "たいせつなもの", iconItemKey: ITEM_POCKET_ICONS.key },
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
