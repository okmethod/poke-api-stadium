/**
 * ポケモン対消滅の再エクスポート
 */

import { PairCollisionDetectionFacade } from "./facade";
import * as storeFuncs from "./store";

export const PairCollisionDetection = {
  Facade: PairCollisionDetectionFacade,
  Store: {
    ...storeFuncs,
  },
};
