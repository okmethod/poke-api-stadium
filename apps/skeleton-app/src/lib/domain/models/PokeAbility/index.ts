/**
 * PokeAbility - アプリ内部の特性表現
 *
 * @architecture レイヤー間依存ルール - ドメイン層
 * - ROLE: 外部に依存しない静的データモデル（Pure TypeScript）
 * - ALLOWED: 同ドメイン層モデルへの依存
 * - FORBIDDEN: Svelte / DOM / 外部ライブラリへの依存
 */

/** 特性詳細モデル（遅延ロード対象） */
export interface PokeAbility {
  readonly id: number;
  readonly enName: string;
  readonly jaName: string;
  readonly isHidden: boolean;
  readonly flavorText: string | null;
}
