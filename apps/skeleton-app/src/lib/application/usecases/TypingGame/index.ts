/**
 * TypingGame の再エクスポート
 */

import { TypingGameFacade } from "./facade";
import * as storeFuncs from "./store";

export const TypingGame = {
  Facade: TypingGameFacade,
  Store: {
    ...storeFuncs,
  },
};
