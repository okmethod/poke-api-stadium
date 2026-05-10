/**
 * TypeJanken の再エクスポート
 */

import { TypeJankenFacade } from "./facade";
import * as storeFuncs from "./store";

export const TypeJanken = {
  Facade: TypeJankenFacade,
  Store: {
    ...storeFuncs,
  },
};
