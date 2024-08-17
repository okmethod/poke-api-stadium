import type { StaticPokeData } from "$lib/types/poke";
import type { TypeName, TypeData, TypeColors } from "$lib/types/type";
import type { StaticItemData } from "$lib/types/item";

let staticPokeDict: { [key: string]: StaticPokeData } | null = null;
export async function fetchPokeData(key: string): Promise<StaticPokeData> {
  if (staticPokeDict === null) {
    const staticPokeDictModule = await import("$lib/constants/staticPokeDict.json");
    staticPokeDict = staticPokeDictModule.default as { [key: string]: StaticPokeData };
    console.log("staticPokeDict.json loaded");
  }
  return staticPokeDict[key];
}

let staticAddPokeDict: { [key: string]: StaticPokeData } | null = null;
export async function fetchAddPokeData(key: string): Promise<StaticPokeData> {
  if (staticAddPokeDict === null) {
    const staticPokeDictModule = await import("$lib/constants/staticAddPokeDict.json");
    staticAddPokeDict = staticPokeDictModule.default as { [key: string]: StaticPokeData };
    console.log("staticAPokeDict loaded");
  }
  return staticAddPokeDict[key];
}

export async function fetchTypeData(key: TypeName): Promise<TypeData & TypeColors> {
  const { STATIC_TYPE_DICT, TYPE_COLOR_DICT } = await import("$lib/constants/staticTypeData");
  return { ...(STATIC_TYPE_DICT[key] as TypeData), ...TYPE_COLOR_DICT[key] };
}

export async function fetchBall(key: string): Promise<StaticItemData> {
  const { STATIC_BALL_DICT } = await import("$lib/constants/staticItemData");
  return STATIC_BALL_DICT[key];
}
