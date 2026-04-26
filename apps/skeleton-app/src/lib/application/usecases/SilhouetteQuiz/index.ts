/**
 * ポケモンシルエットクイズの再エクスポート
 */

import { SilhouetteQuizFacade } from "./facade";
import * as storeFuncs from "./store";

export const SilhouetteQuiz = {
  Facade: SilhouetteQuizFacade,
  Store: {
    ...storeFuncs,
  },
};
