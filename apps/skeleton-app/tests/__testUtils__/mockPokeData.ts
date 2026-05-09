/**
 * テスト用 PokeData フィクスチャ
 */

import type { PokeData } from "$lib/domain/models/PokeData";

/** 最小限のフィールドで PokeData モックを生成する */
export function buildMockPokeData(overrides: Partial<PokeData> = {}): PokeData {
  return {
    pokeId: 25,
    speciesId: 25,
    enName: "dummychu",
    jaName: "ダミチュウ",
    speciesEnName: "dummychu",
    speciesJaName: "ダミチュウ",
    height: 0.4,
    weight: 6.0,
    type1: "electric",
    type2: null,
    stats: { hp: 35, attack: 55, defense: 40, spAtk: 50, spDef: 50, speed: 90 },
    imageUrls: {
      pixel: { front: "https://example.com/pikachu.png", back: null },
      artwork: { front: "https://example.com/pikachu-art.png", back: null },
      gif: { front: null, back: null },
      all: ["https://example.com/pikachu-art.png"],
    },
    cryUrls: { latest: "https://example.com/pikachu.ogg", legacy: null },
    generationData: null,
    genus: "ダミーポケモン",
    isLegendary: false,
    isMythical: false,
    flavorTexts: [],
    abilityRefs: [],
    evolutionChainRef: { url: "https://pokeapi.co/api/v2/evolution-chain/10/" },
    varietyRefs: [],
    learnableMoveRefs: [],
    ...overrides,
  };
}
