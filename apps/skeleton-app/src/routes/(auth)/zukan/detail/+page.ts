import type { PageLoad } from "./$types";
import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";

export const load: PageLoad = async ({ url, fetch }) => {
  const idParam = url.searchParams.get("id");
  const tab = url.searchParams.get("tab") ?? "basic";
  const id = idParam ? parseInt(idParam, 10) : null;

  if (!id || isNaN(id) || id < 1) {
    return { pokeData: null, evolutionChain: null, tab, fetchError: null };
  }

  let pokeData = null;
  try {
    pokeData = await getPokeRepository().getPokemon(fetch, id);
  } catch {
    return { pokeData: null, evolutionChain: null, tab, fetchError: "みはっけんのポケモン" };
  }

  let evolutionChain = null;
  if (tab === "evolution") {
    try {
      evolutionChain = await getPokeRepository().getEvolutionChain(fetch, pokeData.evolutionChainRef.url);
    } catch (err) {
      console.error("Failed to fetch evolution chain:", err);
    }
  }

  return { pokeData, evolutionChain, tab, fetchError: null };
};
