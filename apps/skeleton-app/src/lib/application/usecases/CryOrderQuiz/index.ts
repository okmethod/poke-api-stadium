/**
 * CryOrderQuiz の再エクスポート
 */

import { CryOrderQuizFacade } from "./facade";
import * as storeFuncs from "./store";

export const CryOrderQuiz = {
  Facade: CryOrderQuizFacade,
  Store: {
    ...storeFuncs,
  },
};
