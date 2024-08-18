import { writable, get } from "svelte/store";

export type GenerationId = "all" | "gen1" | "gen2" | "gen3" | "gen4" | "gen5" | "gen6" | "gen7" | "gen8" | "gen9";

export interface GenerationData {
  label: string;
  description: string;
  lastPokeId: number;
}

const savedGenerationId =
  typeof localStorage !== "undefined" ? (localStorage.getItem("generationId") as GenerationId) : "all";

export const generationId = writable<GenerationId>(savedGenerationId ?? "all");

export const generations: Record<GenerationId, GenerationData> = {
  gen1: {
    label: "第1世代",
    description: "赤・緑・青・黄",
    lastPokeId: 151,
  },
  gen2: {
    label: "第2世代",
    description: "金・銀・クリスタル",
    lastPokeId: 251,
  },
  gen3: {
    label: "第3世代",
    description: "ルビー・サファイア・エメラルド",
    lastPokeId: 386,
  },
  gen4: {
    label: "第4世代",
    description: "ダイヤモンド・パール",
    lastPokeId: 494,
  },
  gen5: {
    label: "第5世代",
    description: "ブラック・ホワイト",
    lastPokeId: 649,
  },
  gen6: {
    label: "第6世代",
    description: "X・Y",
    lastPokeId: 721,
  },
  gen7: {
    label: "第7世代",
    description: "サン・ムーン",
    lastPokeId: 809,
  },
  gen8: {
    label: "第8世代",
    description: "ソード・シールド",
    lastPokeId: 903,
  },
  gen9: {
    label: "第9世代",
    description: "スカーレット・バイオレット",
    lastPokeId: 1025,
  },
  all: {
    label: "全世代",
    description: "すべて",
    lastPokeId: 1025,
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
