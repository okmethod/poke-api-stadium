/**
 * WeightBalance の再エクスポート
 */

import { WeightBalanceFacade } from "./facade";
import * as storeFuncs from "./store";

export const WeightBalance = {
  Facade: WeightBalanceFacade,
  Store: {
    ...storeFuncs,
  },
};
