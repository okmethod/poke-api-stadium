import type { StaticPokeData } from "$lib/types/poke";
import type { TypeName, TypeData, TypeColors } from "$lib/types/type";
import type { StaticItemData } from "$lib/types/item";

export async function fetchPokeData(key: string): Promise<StaticPokeData> {
  const { STATIC_POKE_DICT } = await import("$lib/constants/staticPokeData");
  return STATIC_POKE_DICT[key];
}

export async function fetchAddPokeData(key: string): Promise<StaticPokeData> {
  const { STATIC_ADDITIONAL_POKE_DICT } = await import("$lib/constants/staticAddPokeData");
  return STATIC_ADDITIONAL_POKE_DICT[key];
}

export async function fetchTypeData(key: TypeName): Promise<TypeData & TypeColors> {
  const { STATIC_TYPE_DICT, TYPE_COLOR_DICT } = await import("$lib/constants/staticTypeData");
  return { ...(STATIC_TYPE_DICT[key] as TypeData), ...TYPE_COLOR_DICT[key] };
}

export async function fetchBall(key: string): Promise<StaticItemData> {
  const { STATIC_BALL_DICT } = await import("$lib/constants/staticItemData");
  return STATIC_BALL_DICT[key];
}
