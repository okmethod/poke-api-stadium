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
}
