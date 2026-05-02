import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { ALL_TYPE_NAMES, pokeTypeJaName, pokeTypeColor } from "$lib/domain/models/PokeData/pokeType";
import type { PokeTypeName } from "$lib/domain/models/PokeData/pokeType";
import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";

export const load: PageLoad = async ({ params, fetch }) => {
  if (!ALL_TYPE_NAMES.includes(params.type as PokeTypeName)) {
    error(404, "みはっけんのタイプ");
  }
  const typeName = params.type as PokeTypeName;
  const moveNames = await getPokeRepository().getMoveNamesByType(fetch, typeName);
  return {
    typeName,
    jaName: pokeTypeJaName(typeName),
    color: pokeTypeColor(typeName),
    moveNames,
  };
};
