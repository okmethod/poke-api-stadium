/**
 * 汎用的なランダム選択ユーティリティ関数
 *
 * 整数・配列要素・オブジェクト値をランダムかつ重複なく取得するヘルパー群。
 */

import { shuffleArray } from "./arrayUtils";

/** `[0, length)` の範囲でランダムな整数を返す */
export function getRandomNumber(length: number): number {
  return Math.floor(Math.random() * length);
}

/** 数値配列からランダムに `count` 個を重複なく選択して返す */
export function pickRandomNumbers(numbers: readonly number[], count: number): number[] {
  if (numbers.length < count) {
    throw new Error("shortage elements in the array");
  }
  return shuffleArray(numbers).slice(0, count);
}

/** 配列からランダムに `count` 個の要素を重複なく選択して返す */
export function pickRandomElementsFromArray<T>(array: readonly T[], count: number): T[] {
  if (array.length < count) {
    throw new Error("shortage elements in the array");
  }
  return shuffleArray(array).slice(0, count);
}

/** オブジェクトの値からランダムに `count` 個を重複なく選択して返す */
export function pickRandomElementsFromObject<T>(obj: Readonly<Record<string, T>>, count: number): T[] {
  const keys = Object.keys(obj);
  const pickedKeys = pickRandomElementsFromArray(keys, count);
  return pickedKeys.map((key) => obj[key]);
}
