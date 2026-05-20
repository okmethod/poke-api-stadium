/**
 * KanjiFillQuiz の再エクスポート
 */

import { KanjiFillQuizFacade } from "./facade";
import * as storeFuncs from "./store";

export const KanjiFillQuiz = {
  Facade: KanjiFillQuizFacade,
  Store: {
    ...storeFuncs,
  },
};

export type { KanjiQuizItem } from "./facade";
export { parseFlavorTextPair } from "./facade";
