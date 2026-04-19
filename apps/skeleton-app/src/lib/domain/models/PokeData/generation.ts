/**
 * GenerationData - ポケモンの世代情報
 *
 * @architecture レイヤー間依存ルール - ドメイン層
 * - ROLE: 外部に依存しない静的データモデル（Pure TypeScript）
 * - ALLOWED: なし（依存ゼロ）
 * - FORBIDDEN: Svelte / DOM / 外部ライブラリへの依存
 */

/** 世代番号（1〜9）。PokeAPI の generation-i 等と対応 */
export type GenerationNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/** 世代ごとのメタデータ */
export interface GenerationData {
  /** 表示ラベル（例: "第1世代"） */
  readonly label: string;
  /** 代表作タイトル（例: "赤・緑・青・黄"） */
  readonly titles: string;
  /** その世代までの図鑑最大ID */
  readonly lastPokeId: number;
}

const GENERATION_DATA: Record<GenerationNumber, GenerationData> = {
  1: { label: "第1世代", titles: "赤・緑・青・黄", lastPokeId: 151 },
  2: { label: "第2世代", titles: "金・銀・クリスタル", lastPokeId: 251 },
  3: { label: "第3世代", titles: "ルビー・サファイア・エメラルド", lastPokeId: 386 },
  4: { label: "第4世代", titles: "ダイヤモンド・パール・プラチナ", lastPokeId: 493 },
  5: { label: "第5世代", titles: "ブラック・ホワイト", lastPokeId: 649 },
  6: { label: "第6世代", titles: "X・Y", lastPokeId: 721 },
  7: { label: "第7世代", titles: "サン・ムーン", lastPokeId: 809 },
  8: { label: "第8世代", titles: "ソード・シールド", lastPokeId: 905 },
  9: { label: "第9世代", titles: "スカーレット・バイオレット", lastPokeId: 1025 },
};

/** 世代番号から世代データを取得する。不明な場合は null を返す */
export function generationData(gen: number): GenerationData | null {
  return GENERATION_DATA[gen as GenerationNumber] ?? null;
}
