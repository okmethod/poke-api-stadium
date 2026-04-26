/**
 * おもさくらべの再エクスポート
 */

import { WeightComparisonFacade } from "./facade";
import * as storeFuncs from "./store";

export const WeightComparison = {
  Facade: WeightComparisonFacade,
  Store: {
    ...storeFuncs,
  },
};
