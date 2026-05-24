/**
 * BattleCalcQuiz の再エクスポート
 */

import { BattleCalcQuizFacade } from "./facade";
import * as storeFuncs from "./store";
import { PROBLEM_TEMPLATES } from "./problemTemplates";
import type { ProblemTemplate, Difficulty } from "./problemTemplates";

export const BattleCalcQuiz = {
  Facade: BattleCalcQuizFacade,
  Store: {
    ...storeFuncs,
  },
};

/** 問題テンプレート一覧（難易度フィルターや一覧表示などに利用） */
export { PROBLEM_TEMPLATES };
export type { ProblemTemplate, Difficulty };
