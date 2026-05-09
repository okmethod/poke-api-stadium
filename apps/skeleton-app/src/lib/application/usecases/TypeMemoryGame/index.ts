/**
 * TypeMemoryGame の再エクスポート
 */

import { TypeMemoryGameFacade } from "./facade";
import * as storeFuncs from "./store";

export const TypeMemoryGame = {
  Facade: TypeMemoryGameFacade,
  Store: {
    ...storeFuncs,
  },
};
