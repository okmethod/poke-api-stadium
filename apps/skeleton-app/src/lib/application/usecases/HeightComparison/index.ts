/**
 * たかさくらべの再エクスポート
 */

import { HeightComparisonFacade } from "./facade";
import * as storeFuncs from "./store";

export const HeightComparison = {
  Facade: HeightComparisonFacade,
  Store: {
    ...storeFuncs,
  },
};
