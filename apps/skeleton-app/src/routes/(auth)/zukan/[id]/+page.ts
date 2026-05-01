import type { PageLoad } from "./$types";
import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ params, url, fetch }) => {
  const id = parseInt(params.id, 10);
  const tab = url.searchParams.get("tab") ?? "basic";

  if (isNaN(id) || id < 1) {
    error(404, "みはっけんのポケモン");
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
