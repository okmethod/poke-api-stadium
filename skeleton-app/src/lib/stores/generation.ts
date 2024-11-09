import { writable, get } from "svelte/store";

export enum GenerationId {
  All = "all",
  GenerationI = "generation-i",
  GenerationII = "generation-ii",
  GenerationIII = "generation-iii",
  GenerationIV = "generation-iv",
  GenerationV = "generation-v",
  GenerationVI = "generation-vi",
  GenerationVII = "generation-vii",
  GenerationVIII = "generation-viii",
  GenerationIX = "generation-ix",
}

const savedGenerationId: GenerationId = (() => {
  if (typeof localStorage === "undefined") {
    return GenerationId.All;
  }
  const item = localStorage.getItem("generationId");
  if (item && Object.values(GenerationId).includes(item as GenerationId)) {
    return item as GenerationId;
  }
  return GenerationId.All;
})();

const generationIdStore = writable<GenerationId>(savedGenerationId ?? "all");

export function getGenerationId(): GenerationId {
  return get(generationIdStore);
}

export function setGenerationId(generationId: GenerationId): void {
  generationIdStore.set(generationId);
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("generationId", generationId);
  }
}

export interface GenerationData {
  label: string;
  description: string;
  lastPokeId: number;
  symbolPokeIds: number[];
}

export const generations: Record<GenerationId, GenerationData> = {
  "generation-i": {
    label: "第1世代",
    description: "赤・緑・青・黄",
    lastPokeId: 151,
    symbolPokeIds: [1, 4, 7],
  },
  "generation-ii": {
    label: "第2世代",
    description: "金・銀・クリスタル",
    lastPokeId: 251,
    symbolPokeIds: [152, 155, 158],
  },
  "generation-iii": {
    label: "第3世代",
    description: "ルビー・サファイア・エメラルド",
    lastPokeId: 386,
    symbolPokeIds: [252, 255, 258],
  },
  "generation-iv": {
    label: "第4世代",
    description: "ダイヤモンド・パール",
    lastPokeId: 494,
    symbolPokeIds: [387, 390, 393],
  },
  "generation-v": {
    label: "第5世代",
    description: "ブラック・ホワイト",
    lastPokeId: 649,
    symbolPokeIds: [495, 498, 501],
  },
  "generation-vi": {
    label: "第6世代",
    description: "X・Y",
    lastPokeId: 721,
    symbolPokeIds: [650, 653, 656],
  },
  "generation-vii": {
    label: "第7世代",
    description: "サン・ムーン",
    lastPokeId: 809,
    symbolPokeIds: [722, 725, 728],
  },
  "generation-viii": {
    label: "第8世代",
    description: "ソード・シールド",
    lastPokeId: 905,
    symbolPokeIds: [810, 813, 816],
  },
  "generation-ix": {
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
  const currentGenerationId = getGenerationId();
  const filteredArray =
    currentGenerationId === ("all" as GenerationId)
      ? array
      : array.filter((item) => Number(item[pokeIdName]) <= generations[currentGenerationId].lastPokeId);
  return filteredArray;
}

export function filterDictByGeneration<T>(dict: Record<number, T>, pokeIdName: keyof T): Record<number, T> {
  const currentGenerationId = getGenerationId();
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
