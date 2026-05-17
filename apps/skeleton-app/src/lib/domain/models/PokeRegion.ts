/**
 * PokeRegion - 地方・ロケーション・エリアのドメインモデル
 *
 * @architecture レイヤー間依存ルール - ドメイン層
 * - ROLE: 外部に依存しない静的データモデル（Pure TypeScript）
 * - ALLOWED: 同ドメイン層モデルへの依存
 * - FORBIDDEN: Svelte / DOM / 外部ライブラリへの依存
 */

/** 地方モデル */
export interface PokeRegion {
  readonly id: number;
  readonly enName: string;
  readonly jaName: string;
}

/** ロケーション一覧表示用メタ情報 */
export interface PokeLocationMeta {
  readonly id: number;
  readonly enName: string;
}

/** ロケーション詳細（全エリアのエンカウントポケモン英語名を含む） */
export interface PokeLocation extends PokeLocationMeta {
  /** 全エリアのエンカウントポケモン英語名（重複排除済み） */
  readonly encounterSpeciesNames: readonly string[];
}

/** ポケモン種族の軽量メタ情報（日本語名取得専用） */
export interface PokeSpeciesMeta {
  readonly id: number;
  readonly enName: string;
  readonly jaName: string;
}

/** PokeAPI の region エンドポイントで定義される 11 地方 */
export const REGIONS: readonly PokeRegion[] = [
  { id: 1, enName: "kanto", jaName: "カントー" },
  { id: 2, enName: "johto", jaName: "ジョウト" },
  { id: 3, enName: "hoenn", jaName: "ホウエン" },
  { id: 4, enName: "sinnoh", jaName: "シンオウ" },
  { id: 5, enName: "unova", jaName: "イッシュ" },
  { id: 6, enName: "kalos", jaName: "カロス" },
  { id: 7, enName: "alola", jaName: "アローラ" },
  { id: 8, enName: "galar", jaName: "ガラル" },
  { id: 9, enName: "hisui", jaName: "ヒスイ" },
  { id: 10, enName: "paldea", jaName: "パルデア" },
  { id: 11, enName: "orre", jaName: "オーレ" },
] as const;
