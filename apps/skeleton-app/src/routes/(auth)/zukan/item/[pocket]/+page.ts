import type { PageLoad } from "./$types";
import { ITEM_POCKETS } from "$lib/domain/models/PokeItem";
import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ params, fetch }) => {
  const pocket = ITEM_POCKETS.find((p) => p.enName === params.pocket);
  if (!pocket) error(404, "みはっけんのポケット");

  const categories = await getPokeRepository().getItemPocketCategories(fetch, params.pocket);
  return { pocket, categories };
};
