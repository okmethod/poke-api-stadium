/**
 * スライドパズルの再エクスポート
 */

import { SlidePuzzleFacade } from "./facade";
import * as storeFuncs from "./store";

export const SlidePuzzle = {
  Facade: SlidePuzzleFacade,
  Store: {
    ...storeFuncs,
  },
};
