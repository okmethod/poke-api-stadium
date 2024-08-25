import { writable, get } from "svelte/store";

export type GenerationId = "all" | "gen1" | "gen2" | "gen3" | "gen4" | "gen5" | "gen6" | "gen7" | "gen8" | "gen9";

export interface GenerationData {
  label: string;
  description: string;
  lastPokeId: number;
  symbolPokeIds: number[];
}

const savedGenerationId =
  typeof localStorage !== "undefined" ? (localStorage.getItem("generationId") as GenerationId) : "all";

export const generationId = writable<GenerationId>(savedGenerationId ?? "all");

generationId.subscribe((value: GenerationId) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("generationId", value);
  }
});

export const generations: Record<GenerationId, GenerationData> = {
  gen1: {
    label: "第1世代",
    description: "赤・緑・青・黄",
    lastPokeId: 151,
    symbolPokeIds: [1, 4, 7],
  },
  gen2: {
    label: "第2世代",
    description: "金・銀・クリスタル",
    lastPokeId: 251,
    symbolPokeIds: [152, 155, 158],
  },
  gen3: {
    label: "第3世代",
    description: "ルビー・サファイア・エメラルド",
    lastPokeId: 386,
    symbolPokeIds: [252, 255, 258],
  },
  gen4: {
    label: "第4世代",
    description: "ダイヤモンド・パール",
    lastPokeId: 494,
    symbolPokeIds: [387, 390, 393],
  },
  gen5: {
    label: "第5世代",
    description: "ブラック・ホワイト",
    lastPokeId: 649,
    symbolPokeIds: [495, 498, 501],
  },
  gen6: {
    label: "第6世代",
    description: "X・Y",
    lastPokeId: 721,
    symbolPokeIds: [650, 653, 656],
  },
  gen7: {
    label: "第7世代",
    description: "サン・ムーン",
    lastPokeId: 809,
    symbolPokeIds: [722, 725, 728],
  },
  gen8: {
    label: "第8世代",
    description: "ソード・シールド",
    lastPokeId: 905,
    symbolPokeIds: [810, 813, 816],
  },
  gen9: {
    label: "第9世代",
    description: "スカーレット・バイオレット",
    lastPokeId: 1025,
    symbolPokeIds: [906, 909, 912],
  },
  all: {
    label: "全世代",
    description: "すべて",
    lastPokeId: 1025,
    symbolPokeIds: [1024],
  },
};

export function filterArrayByGeneration<T>(array: Array<T>, pokeIdName: keyof T): Array<T> {
  const currentGenerationId = get(generationId);
  const filteredArray =
    currentGenerationId === ("all" as GenerationId)
      ? array
      : array.filter((item) => Number(item[pokeIdName]) <= generations[currentGenerationId].lastPokeId);
  return filteredArray;
}

export function filterDictByGeneration<T>(dict: Record<number, T>, pokeIdName: keyof T): Record<number, T> {
  const currentGenerationId = get(generationId);
  const filteredDict = Object.entries(dict).reduce(
    (acc, [key, value]) => {
      if (
        currentGenerationId === ("all" as GenerationId) ||
        Number(value[pokeIdName]) <= generations[currentGenerationId].lastPokeId
      ) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, T>,
  );
  return filteredDict;
}