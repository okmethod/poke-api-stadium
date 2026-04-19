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

/** 全世代番号の配列（UI でのイテレーション用） */
export const ALL_GENERATION_NUMBERS: GenerationNumber[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/** 世代ごとのメタデータ */
export interface GenerationData {
  /** 表示ラベル（例: "第1世代"） */
  readonly label: string;
  /** 代表作タイトル（例: "赤・緑・青・黄"） */
  readonly titles: string;
  /** その世代の図鑑先頭ID */
  readonly firstPokeId: number;
  /** その世代の図鑑末尾ID */
  readonly lastPokeId: number;
  /** その世代の御三家ポケモンID [草, 炎, 水] */
  readonly starters: readonly [number, number, number];
}

/** 図鑑ID範囲（連続区間） */
export interface PokeIdRange {
  readonly first: number;
  readonly last: number;
}

const GENERATION_DATA: Record<GenerationNumber, GenerationData> = {
  1: { label: "第1世代", titles: "赤・緑・青・黄", firstPokeId: 1, lastPokeId: 151, starters: [1, 4, 7] },
  2: { label: "第2世代", titles: "金・銀・クリスタル", firstPokeId: 152, lastPokeId: 251, starters: [152, 155, 158] },
  3: {
    label: "第3世代",
    titles: "ルビー・サファイア・エメラルド",
    firstPokeId: 252,
    lastPokeId: 386,
    starters: [252, 255, 258],
  },
  4: {
    label: "第4世代",
    titles: "ダイヤモンド・パール・プラチナ",
    firstPokeId: 387,
    lastPokeId: 493,
    starters: [387, 390, 393],
  },
  5: { label: "第5世代", titles: "ブラック・ホワイト", firstPokeId: 494, lastPokeId: 649, starters: [495, 498, 501] },
  6: { label: "第6世代", titles: "X・Y", firstPokeId: 650, lastPokeId: 721, starters: [650, 653, 656] },
  7: { label: "第7世代", titles: "サン・ムーン", firstPokeId: 722, lastPokeId: 809, starters: [722, 725, 728] },
  8: { label: "第8世代", titles: "ソード・シールド", firstPokeId: 810, lastPokeId: 905, starters: [810, 813, 816] },
  9: {
    label: "第9世代",
    titles: "スカーレット・バイオレット",
    firstPokeId: 906,
    lastPokeId: 1025,
    starters: [906, 909, 912],
  },
};

/** 世代番号から世代データを取得する。不明な場合は null を返す */
export function generationData(gen: number): GenerationData | null {
  return GENERATION_DATA[gen as GenerationNumber] ?? null;
}

/**
 * 選択中の世代番号リストから、有効な図鑑ID範囲リストを返す。
 * 空配列の場合は全世代（1〜1025）を返す。
 */
export function getPokeIdRanges(selected: GenerationNumber[]): PokeIdRange[] {
  const targets = selected.length > 0 ? selected : ALL_GENERATION_NUMBERS;
  return targets.map((gen) => ({
    first: GENERATION_DATA[gen].firstPokeId,
    last: GENERATION_DATA[gen].lastPokeId,
  }));
}
