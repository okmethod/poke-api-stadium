import { base } from "$app/paths";
import type { StaticPokeData } from "$lib/types/poke";
import type { TypeName, TypeData, TypeColors } from "$lib/types/type";
import type { StaticItemData } from "$lib/types/item";
import { loadCompressedFile } from "$lib/utils/download.client";

let staticPokeDict: { [key: string]: StaticPokeData } | null = null;
export async function fetchPokeData(key: string): Promise<StaticPokeData> {
  const gzFilePath = `${base}/staticPokeDict.json.gz`;
  if (staticPokeDict === null) {
    staticPokeDict = (await loadCompressedFile(gzFilePath)) as { [key: string]: StaticPokeData };
  }
  return staticPokeDict[key];
}

let staticAddPokeDict: { [key: string]: StaticPokeData } | null = null;
export async function fetchAddPokeData(key: string): Promise<StaticPokeData> {
  const gzFilePath = `${base}/staticAddPokeDict.json.gz`;
  if (staticAddPokeDict === null) {
    staticAddPokeDict = (await loadCompressedFile(gzFilePath)) as { [key: string]: StaticPokeData };
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