import type { LoadEvent } from "@sveltejs/kit";
import type { LLMProvider } from "$lib/application/ports/ILLMServiceRepository";
import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
import { getRandomNumber } from "$lib/shared/utils/randomUtils";

/** 対象ポケモン: 第1世代（1〜151番） */
const GEN1_MAX_ID = 151;

const DEFAULT_PROVIDER: LLMProvider = "stub";

export async function load({ fetch }: LoadEvent): Promise<{ pokeName: string; provider: LLMProvider }> {
  const id = getRandomNumber(GEN1_MAX_ID) + 1; // 1〜151
  const pokeData = await getPokeRepository().getPokemon(fetch, id);
  return {
    pokeName: pokeData.jaName,
    provider: DEFAULT_PROVIDER,
  };
}
