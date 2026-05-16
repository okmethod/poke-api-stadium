/**
 * CaptureBilliard の再エクスポート
 */

import { CaptureBilliardFacade, GAME_CONFIG } from "./facade";
import * as storeFuncs from "./store";

export const CaptureBilliard = {
  Facade: CaptureBilliardFacade,
  Store: {
    ...storeFuncs,
  },
  GAME_CONFIG,
};
