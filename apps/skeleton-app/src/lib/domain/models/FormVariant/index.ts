/**
 * FormVariant - アプリ内部のポケモンフォーム（すがた）表現
 *
 * @architecture レイヤー間依存ルール - ドメイン層
 * - ROLE: 外部に依存しない静的データモデル（Pure TypeScript）
 * - ALLOWED: 同ドメイン層モデルへの依存
 * - FORBIDDEN: Svelte / DOM / 外部ライブラリへの依存
 */

import type { PokeTypeName } from "$lib/domain/models/PokeData/pokeType";

/** ポケモン1フォームのデータ */
export interface FormVariant {
  readonly pokemonId: number;
  readonly enName: string;
  readonly jaName: string;
  readonly isDefault: boolean;
  readonly isMega: boolean;
  readonly isBattleOnly: boolean;
  readonly type1: PokeTypeName;
  readonly type2: PokeTypeName | null;
  /** 公式アートワーク優先、なければピクセルスプライト */
  readonly imageUrl: string | null;
}
