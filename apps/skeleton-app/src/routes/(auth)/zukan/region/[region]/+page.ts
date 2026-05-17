import type { PageLoad } from "./$types";
import { REGIONS } from "$lib/domain/models/PokeRegion";
import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ params, fetch }) => {
  const region = REGIONS.find((r) => r.enName === params.region);
  if (!region) error(404, "みはっけんの地方");

  const locations = await getPokeRepository().getRegionLocations(fetch, region.id);
  return { region, locations };
};
