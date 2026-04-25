import type { LoadEvent } from "@sveltejs/kit";
import type { LLMProvider } from "$lib/application/ports/ILLMServiceRepository";
import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
import { getSelectedPokeIds } from "$lib/application/stores/generationStore";
import { getRandomNumber } from "$lib/shared/utils/randomUtils";

const LLM_PROVIDERS: readonly LLMProvider[] = ["stub", "gemini", "claude", "groq"];
function isLLMProvider(value: unknown): value is LLMProvider {
  return LLM_PROVIDERS.includes(value as LLMProvider);
}

const providerEnv = import.meta.env.VITE_DEFAULT_LLM_PROVIDER;

export async function load({
  fetch,
}: LoadEvent): Promise<{ pokeName: string; pokeImageUrl: string; pokeCryUrl: string | null; provider: LLMProvider }> {
  const allIds = getSelectedPokeIds();
  const id = allIds[getRandomNumber(allIds.length)]!;
  const pokeData = await getPokeRepository().getPokemon(fetch, id);
  return {
    pokeName: pokeData.jaName,
    pokeImageUrl: pokeData.imageUrls.pixel.front || pokeData.imageUrls.artwork.front,
    pokeCryUrl: pokeData.cryUrls.latest ?? pokeData.cryUrls.legacy,
    provider: isLLMProvider(providerEnv) ? providerEnv : "stub",
  };
}
