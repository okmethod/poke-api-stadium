/**
 * ポケモン尋問クイズの再エクスポート
 */

import { InterrogationQuizFacade } from "./facade";
import * as storeFuncs from "./store";

export const InterrogationQuiz = {
  Facade: InterrogationQuizFacade,
  Store: {
    ...storeFuncs,
  },
};
