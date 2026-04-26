/**
 * ステータス並べ替えクイズの再エクスポート
 */

import { StatsSortingQuizFacade, COMPARE_MODES } from "./facade";
import * as storeFuncs from "./store";

/** ポケモン数の選択肢（最小・最大） */
export const POKE_COUNT_MIN = 3;
export const POKE_COUNT_MAX = 6;

export const StatsSortingQuiz = {
  Facade: StatsSortingQuizFacade,
  Store: {
    ...storeFuncs,
  },
  COMPARE_MODES,
  POKE_COUNT_MIN,
  POKE_COUNT_MAX,
};

export type { CompareModeName } from "./facade";
