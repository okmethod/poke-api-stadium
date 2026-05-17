/**
 * テスト用 IPokeRepository モック
 */

import { vi } from "vitest";
import type { IPokeRepository } from "$lib/application/ports/IPokeRepository";

/** vi.fn() で全メソッドを実装した IPokeRepository モックを生成する */
export function createMockRepository(): IPokeRepository {
  return {
    getPokemon: vi.fn(),
    getPokemons: vi.fn(),
    getType: vi.fn(),
    getTypes: vi.fn(),
    getEvolutionChain: vi.fn(),
    getFormVariants: vi.fn(),
    getAbilities: vi.fn(),
    getMoves: vi.fn(),
    getMove: vi.fn(),
    getMoveNamesByType: vi.fn(),
    getItem: vi.fn(),
    getItemPocketCategories: vi.fn(),
    getItemCategory: vi.fn(),
    getRegionLocations: vi.fn(),
    getLocation: vi.fn(),
    getPokemonSpeciesMeta: vi.fn(),
  };
}
