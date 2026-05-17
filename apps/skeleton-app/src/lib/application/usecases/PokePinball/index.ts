/**
 * PokePinball の再エクスポート
 */

import { PokePinballFacade, GAME_CONFIG, FLIPPER_CONFIG, BUMPER_POSITIONS } from "./facade";
import * as storeFuncs from "./store";

export const PokePinball = {
  Facade: PokePinballFacade,
  Store: {
    ...storeFuncs,
  },
  GAME_CONFIG,
  FLIPPER_CONFIG,
  BUMPER_POSITIONS,
};
