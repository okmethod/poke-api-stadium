/**
 * MoveWhack の再エクスポート
 */

import { MoveWhackFacade, FIXED_MOVES, isSuperEffective } from "./facade";
import * as storeFuncs from "./store";

export const MoveWhack = {
  Facade: MoveWhackFacade,
  Store: {
    ...storeFuncs,
  },
  FIXED_MOVES,
  isSuperEffective,
};
