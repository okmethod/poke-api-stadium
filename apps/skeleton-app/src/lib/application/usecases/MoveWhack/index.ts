/**
 * MoveWhack の再エクスポート
 */

import { MoveWhackFacade, MOVE_POOL } from "./facade";
import * as storeFuncs from "./store";

export const MoveWhack = {
  Facade: MoveWhackFacade,
  Store: {
    ...storeFuncs,
  },
  MOVE_POOL,
};
