/**
 * ポケモン神経衰弱の再エクスポート
 */

import { MemoryGameFacade } from "./facade";
import * as storeFuncs from "./store";

export const MemoryGame = {
  Facade: MemoryGameFacade,
  Store: {
    ...storeFuncs,
  },
};
