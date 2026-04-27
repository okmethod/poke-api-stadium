/**
 * WordChain - ポケモンしりとり usecase の公開API
 */

import { WordChainFacade } from "./facade";
import * as storeFuncs from "./store";

export const WordChain = {
  Facade: WordChainFacade,
  Store: { ...storeFuncs },
};

export type { ShiritoriPokeItem } from "./store";
