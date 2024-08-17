import makeStaticPokeDict from "$lib/api/makeStaticPokeDict.client";
import makeStaticTypeDict from "$lib/api/makeStaticTypeDict.client";
import { TypeName } from "$lib/types/type";
import { FIRST_POKE_ID, POKE_COUNT, FIRST_ADDITIONAL_POKE_ID, ADDITIONAL_POKE_COUNT } from "$lib/constants/common";

export type makeFunction = (fetchFunction: typeof window.fetch, keys: any) => Promise<any>; // eslint-disable-line @typescript-eslint/no-explicit-any

export interface DownloadConfig {
  id: string;
  fileName: string;
  label: string;
  makeFunction: makeFunction;
  keys: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export async function load(): Promise<{ downloadConfigs: DownloadConfig[] }> {
  function _pokeIds(firstPokeId: number, idsLength: number): number[] {
    return Array.from({ length: idsLength }, (_, i) => firstPokeId + i);
  }
  function _typeNames(): string[] {
    return Object.values(TypeName) as string[];
  }
  const downloadConfigs: DownloadConfig[] = [
    {
      id: "dlPokeJson",
      fileName: "staticPokeDict.json",
      label: "全ポケモン(通常) Json",
      makeFunction: makeStaticPokeDict,
      keys: _pokeIds(FIRST_POKE_ID, POKE_COUNT),
    },
    {
      id: "dlAddPokeJson",
      fileName: "staticAddPokeDict.json",
      label: "全ポケモン(別ver) Json",
      makeFunction: makeStaticPokeDict,
      keys: _pokeIds(FIRST_ADDITIONAL_POKE_ID, ADDITIONAL_POKE_COUNT),
    },
    {
      id: "dlTypeJson",
      fileName: "staticTypeDict.json",
      label: "全タイプJson",
      makeFunction: makeStaticTypeDict,
      keys: _typeNames(),
    },
  ];

  return { downloadConfigs };
}
