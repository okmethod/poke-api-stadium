/**
 * PokeApiAdapter のテスト
 *
 * アダプター層の変換ロジックを検証する。
 * URL→ID 変換・重複排除・fallback・フレーバーテキスト解決など、
 * 生レスポンスからドメインモデルへの変換が正しいかを確認する。
 * インフラ層 API 関数はモックを使用し、サンプル JSON を一部上書きしてテストケースに適合したデータを返す。
 *
 * なお、API 層（データパース）のテストは pokeapi.test.ts が担う。
 */
import { vi, describe, it, expect, beforeEach } from "vitest";
import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
import * as pokeapi from "$lib/infrastructure/api/pokeapi";
import type { PokemonSpeciesResponse, PokemonResponse, MoveResponse } from "$lib/infrastructure/api/pokeapi";
import sampleSpecies25 from "../../../data/sample_species_25.json";
import samplePokemon25 from "../../../data/sample_pokemon_25.json";
import sampleMove84 from "../../../data/sample_move_84.json";

vi.mock("$lib/infrastructure/api/pokeapi");

const mockFetch = vi.fn() as unknown as typeof fetch;

beforeEach(() => {
  vi.resetAllMocks();
});

describe("getRegionLocations", () => {
  it("地方IDからロケーションメタ一覧を返す", async () => {
    vi.mocked(pokeapi.fetchRegion).mockResolvedValue({
      id: 1,
      locations: [
        { name: "pallet-town", url: "https://pokeapi.co/api/v2/location/1/" },
        { name: "viridian-city", url: "https://pokeapi.co/api/v2/location/2/" },
      ],
    });

    const repo = getPokeRepository();
    const result = await repo.getRegionLocations(mockFetch, 1);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ id: 1, enName: "pallet-town" });
    expect(result[1]).toEqual({ id: 2, enName: "viridian-city" });
    expect(pokeapi.fetchRegion).toHaveBeenCalledWith(mockFetch, 1);
  });

  it("ロケーションが空の地方は空配列を返す", async () => {
    vi.mocked(pokeapi.fetchRegion).mockResolvedValue({
      id: 11,
      locations: [],
    });

    const repo = getPokeRepository();
    const result = await repo.getRegionLocations(mockFetch, 11);

    expect(result).toHaveLength(0);
  });
});

describe("getLocation", () => {
  it("エリア内のポケモンエンカウント名一覧を返す", async () => {
    vi.mocked(pokeapi.fetchLocation).mockResolvedValue({
      id: 1,
      name: "pallet-town",
      areas: [{ name: "pallet-town-area", url: "https://pokeapi.co/api/v2/location-area/1/" }],
    });
    vi.mocked(pokeapi.fetchLocationArea).mockResolvedValue({
      id: 1,
      name: "pallet-town-area",
      pokemon_encounters: [
        { pokemon: { name: "pidgey", url: "https://pokeapi.co/api/v2/pokemon/16/" } },
        { pokemon: { name: "rattata", url: "https://pokeapi.co/api/v2/pokemon/19/" } },
      ],
    });

    const repo = getPokeRepository();
    const result = await repo.getLocation(mockFetch, 1);

    expect(result.id).toBe(1);
    expect(result.enName).toBe("pallet-town");
    expect(result.encounterSpeciesNames).toContain("pidgey");
    expect(result.encounterSpeciesNames).toContain("rattata");
    expect(pokeapi.fetchLocation).toHaveBeenCalledWith(mockFetch, 1);
  });

  it("複数エリアにまたがる重複ポケモン名を排除する", async () => {
    vi.mocked(pokeapi.fetchLocation).mockResolvedValue({
      id: 2,
      name: "viridian-forest",
      areas: [
        { name: "area-1", url: "https://pokeapi.co/api/v2/location-area/1/" },
        { name: "area-2", url: "https://pokeapi.co/api/v2/location-area/2/" },
      ],
    });
    // 両エリアに "caterpie" が出現するが deduplicate される
    vi.mocked(pokeapi.fetchLocationArea).mockResolvedValue({
      id: 1,
      name: "area",
      pokemon_encounters: [
        { pokemon: { name: "caterpie", url: "https://pokeapi.co/api/v2/pokemon/10/" } },
        { pokemon: { name: "weedle", url: "https://pokeapi.co/api/v2/pokemon/13/" } },
      ],
    });

    const repo = getPokeRepository();
    const result = await repo.getLocation(mockFetch, 2);

    expect(result.encounterSpeciesNames.filter((n) => n === "caterpie")).toHaveLength(1);
    expect(result.encounterSpeciesNames).toContain("weedle");
  });

  it("エリアが空のロケーションは encounterSpeciesNames が空配列になる", async () => {
    vi.mocked(pokeapi.fetchLocation).mockResolvedValue({
      id: 99,
      name: "empty-location",
      areas: [],
    });

    const repo = getPokeRepository();
    const result = await repo.getLocation(mockFetch, 99);

    expect(result.encounterSpeciesNames).toHaveLength(0);
  });
});

describe("getPokemonSpeciesMeta", () => {
  it("IDでポケモン種族メタを取得できる", async () => {
    vi.mocked(pokeapi.fetchPokemonSpecies).mockResolvedValue(sampleSpecies25 as unknown as PokemonSpeciesResponse);

    const repo = getPokeRepository();
    const result = await repo.getPokemonSpeciesMeta(mockFetch, 25);

    expect(result.id).toBe(25);
    expect(result.enName).toBe("pikachu");
    expect(result.jaName).toBe("ピカチュウ");
    expect(pokeapi.fetchPokemonSpecies).toHaveBeenCalledWith(mockFetch, 25);
  });

  it("fetchPokemonSpecies が失敗した場合は pokemon 経由でフォールバック取得する", async () => {
    vi.mocked(pokeapi.fetchPokemonSpecies).mockRejectedValue(new Error("Not found"));
    vi.mocked(pokeapi.fetchPokemon).mockResolvedValue(samplePokemon25 as unknown as PokemonResponse);
    vi.mocked(pokeapi.fetchPokemonSpeciesByUrl).mockResolvedValue(sampleSpecies25 as unknown as PokemonSpeciesResponse);

    const repo = getPokeRepository();
    const result = await repo.getPokemonSpeciesMeta(mockFetch, "pikachu-alola");

    expect(result.id).toBe(25);
    expect(result.jaName).toBe("ピカチュウ");
    expect(pokeapi.fetchPokemon).toHaveBeenCalledWith(mockFetch, "pikachu-alola");
    expect(pokeapi.fetchPokemonSpeciesByUrl).toHaveBeenCalledWith(
      mockFetch,
      "https://pokeapi.co/api/v2/pokemon-species/25/",
    );
  });
});

// --- フレーバーテキストペア ---

/** PokemonSpeciesResponse の flavor_text_entries 用ミニマルファクトリ */
function makeSpeciesEntry(flavorText: string, language: string, version: string) {
  return {
    flavor_text: flavorText,
    language: { name: language, url: "" },
    version: { name: version, url: "" },
  };
}

/** MoveResponse の flavor_text_entries 用ミニマルファクトリ */
function makeMoveEntry(flavorText: string, language: string, versionGroup: string) {
  return {
    flavor_text: flavorText,
    language: { name: language, url: "" },
    version_group: { name: versionGroup, url: "" },
  };
}

describe("getSpeciesFlavorTextPairs", () => {
  it("IDでポケモン種族フレーバーテキストペアを取得できる", async () => {
    vi.mocked(pokeapi.fetchPokemonSpecies).mockResolvedValue(sampleSpecies25 as unknown as PokemonSpeciesResponse);

    const repo = getPokeRepository();
    await repo.getSpeciesFlavorTextPairs(mockFetch, 25);

    expect(pokeapi.fetchPokemonSpecies).toHaveBeenCalledWith(mockFetch, 25);
  });

  it("ja と ja-hrkt の両エントリがある場合に FlavorTextPair[] を返す", async () => {
    vi.mocked(pokeapi.fetchPokemonSpecies).mockResolvedValue({
      ...sampleSpecies25,
      flavor_text_entries: [
        makeSpeciesEntry("ほっぺたに電気袋を持つ。", "ja", "scarlet"),
        makeSpeciesEntry("ほっぺたにでんきぶくろをもつ。", "ja-hrkt", "scarlet"),
      ],
    } as unknown as PokemonSpeciesResponse);

    const repo = getPokeRepository();
    const result = await repo.getSpeciesFlavorTextPairs(mockFetch, 25);

    expect(result).toHaveLength(1);
    expect(result[0]!.kanji).toBe("ほっぺたに電気袋を持つ。");
    expect(result[0]!.kana).toBe("ほっぺたにでんきぶくろをもつ。");
  });

  it("複数バージョンに両エントリがある場合に全ペアを返す", async () => {
    vi.mocked(pokeapi.fetchPokemonSpecies).mockResolvedValue({
      ...sampleSpecies25,
      flavor_text_entries: [
        makeSpeciesEntry("古いテキスト（漢字）", "ja", "x"),
        makeSpeciesEntry("新しいテキスト（漢字）", "ja", "scarlet"),
        makeSpeciesEntry("古いテキスト（かな）", "ja-hrkt", "x"),
        makeSpeciesEntry("新しいテキスト（かな）", "ja-hrkt", "scarlet"),
      ],
    } as unknown as PokemonSpeciesResponse);

    const repo = getPokeRepository();
    const result = await repo.getSpeciesFlavorTextPairs(mockFetch, 25);

    expect(result).toHaveLength(2);
    // scarlet が優先度リストで先に来るため最初に含まれる
    expect(result[0]!.kanji).toBe("新しいテキスト（漢字）");
    expect(result[1]!.kanji).toBe("古いテキスト（漢字）");
  });

  it("同一テキストの重複は除外する", async () => {
    vi.mocked(pokeapi.fetchPokemonSpecies).mockResolvedValue({
      ...sampleSpecies25,
      flavor_text_entries: [
        makeSpeciesEntry("同じテキスト（漢字）", "ja", "scarlet"),
        makeSpeciesEntry("同じテキスト（漢字）", "ja", "violet"),
        makeSpeciesEntry("同じテキスト（かな）", "ja-hrkt", "scarlet"),
        makeSpeciesEntry("同じテキスト（かな）", "ja-hrkt", "violet"),
      ],
    } as unknown as PokemonSpeciesResponse);

    const repo = getPokeRepository();
    const result = await repo.getSpeciesFlavorTextPairs(mockFetch, 25);

    expect(result).toHaveLength(1);
  });

  it("テキスト内の改行文字を保持して正規化する", async () => {
    vi.mocked(pokeapi.fetchPokemonSpecies).mockResolvedValue({
      ...sampleSpecies25,
      flavor_text_entries: [
        makeSpeciesEntry("ほっぺたに\n電気袋を\n持つ。", "ja", "scarlet"),
        makeSpeciesEntry("ほっぺたに\nでんきぶくろを\nもつ。", "ja-hrkt", "scarlet"),
      ],
    } as unknown as PokemonSpeciesResponse);

    const repo = getPokeRepository();
    const result = await repo.getSpeciesFlavorTextPairs(mockFetch, 25);

    expect(result[0]!.kanji).toBe("ほっぺたに\n電気袋を\n持つ。");
    expect(result[0]!.kana).toBe("ほっぺたに\nでんきぶくろを\nもつ。");
  });

  it("ja-hrkt エントリが存在しない場合は空配列を返す", async () => {
    vi.mocked(pokeapi.fetchPokemonSpecies).mockResolvedValue({
      ...sampleSpecies25,
      flavor_text_entries: [makeSpeciesEntry("ほっぺたに電気袋を持つ。", "ja", "scarlet")],
    } as unknown as PokemonSpeciesResponse);

    const repo = getPokeRepository();
    const result = await repo.getSpeciesFlavorTextPairs(mockFetch, 25);

    expect(result).toHaveLength(0);
  });

  it("エントリが空の場合は空配列を返す", async () => {
    vi.mocked(pokeapi.fetchPokemonSpecies).mockResolvedValue({
      ...sampleSpecies25,
      flavor_text_entries: [],
    } as unknown as PokemonSpeciesResponse);

    const repo = getPokeRepository();
    const result = await repo.getSpeciesFlavorTextPairs(mockFetch, 25);

    expect(result).toHaveLength(0);
  });
});

describe("getMoveFlavorTextPairs", () => {
  it("IDでわざフレーバーテキストペアを取得できる", async () => {
    vi.mocked(pokeapi.fetchMove).mockResolvedValue(sampleMove84 as unknown as MoveResponse);

    const repo = getPokeRepository();
    await repo.getMoveFlavorTextPairs(mockFetch, 84);

    expect(pokeapi.fetchMove).toHaveBeenCalledWith(mockFetch, 84);
  });

  it("ja と ja-Hrkt の両エントリがある場合に FlavorTextPair[] を返す", async () => {
    vi.mocked(pokeapi.fetchMove).mockResolvedValue({
      ...sampleMove84,
      flavor_text_entries: [
        makeMoveEntry("電気の刺激を相手に浴びせる。", "ja", "scarlet-violet"),
        makeMoveEntry("でんきのしげきをあいてにあびせる。", "ja-Hrkt", "scarlet-violet"),
      ],
    } as unknown as MoveResponse);

    const repo = getPokeRepository();
    const result = await repo.getMoveFlavorTextPairs(mockFetch, 84);

    expect(result).toHaveLength(1);
    expect(result[0]!.kanji).toBe("電気の刺激を相手に浴びせる。");
    expect(result[0]!.kana).toBe("でんきのしげきをあいてにあびせる。");
  });

  it("複数バージョングループに両エントリがある場合に全ペアを返す", async () => {
    vi.mocked(pokeapi.fetchMove).mockResolvedValue({
      ...sampleMove84,
      flavor_text_entries: [
        makeMoveEntry("古いテキスト（漢字）", "ja", "x-y"),
        makeMoveEntry("新しいテキスト（漢字）", "ja", "scarlet-violet"),
        makeMoveEntry("古いテキスト（かな）", "ja-Hrkt", "x-y"),
        makeMoveEntry("新しいテキスト（かな）", "ja-Hrkt", "scarlet-violet"),
      ],
    } as unknown as MoveResponse);

    const repo = getPokeRepository();
    const result = await repo.getMoveFlavorTextPairs(mockFetch, 84);

    expect(result).toHaveLength(2);
    // scarlet-violet が優先度リストで先に来るため最初に含まれる
    expect(result[0]!.kanji).toBe("新しいテキスト（漢字）");
    expect(result[1]!.kanji).toBe("古いテキスト（漢字）");
  });

  it("同一テキストの重複は除外する", async () => {
    vi.mocked(pokeapi.fetchMove).mockResolvedValue({
      ...sampleMove84,
      flavor_text_entries: [
        makeMoveEntry("同じテキスト（漢字）", "ja", "scarlet-violet"),
        makeMoveEntry("同じテキスト（漢字）", "ja", "sword-shield"),
        makeMoveEntry("同じテキスト（かな）", "ja-Hrkt", "scarlet-violet"),
        makeMoveEntry("同じテキスト（かな）", "ja-Hrkt", "sword-shield"),
      ],
    } as unknown as MoveResponse);

    const repo = getPokeRepository();
    const result = await repo.getMoveFlavorTextPairs(mockFetch, 84);

    expect(result).toHaveLength(1);
  });

  it("テキスト内の改行文字を保持して正規化する", async () => {
    vi.mocked(pokeapi.fetchMove).mockResolvedValue({
      ...sampleMove84,
      flavor_text_entries: [
        makeMoveEntry("電気の\nしげきを\n浴びせる。", "ja", "scarlet-violet"),
        makeMoveEntry("でんきの\nしげきを\nあびせる。", "ja-Hrkt", "scarlet-violet"),
      ],
    } as unknown as MoveResponse);

    const repo = getPokeRepository();
    const result = await repo.getMoveFlavorTextPairs(mockFetch, 84);

    expect(result[0]!.kanji).toBe("電気の\nしげきを\n浴びせる。");
    expect(result[0]!.kana).toBe("でんきの\nしげきを\nあびせる。");
  });

  it("ja-Hrkt エントリが存在しない場合は空配列を返す", async () => {
    vi.mocked(pokeapi.fetchMove).mockResolvedValue({
      ...sampleMove84,
      flavor_text_entries: [makeMoveEntry("電気の刺激を相手に浴びせる。", "ja", "scarlet-violet")],
    } as unknown as MoveResponse);

    const repo = getPokeRepository();
    const result = await repo.getMoveFlavorTextPairs(mockFetch, 84);

    expect(result).toHaveLength(0);
  });

  it("ja エントリが存在しない場合は空配列を返す", async () => {
    vi.mocked(pokeapi.fetchMove).mockResolvedValue({
      ...sampleMove84,
      flavor_text_entries: [makeMoveEntry("でんきのしげきをあいてにあびせる。", "ja-Hrkt", "scarlet-violet")],
    } as unknown as MoveResponse);

    const repo = getPokeRepository();
    const result = await repo.getMoveFlavorTextPairs(mockFetch, 84);

    expect(result).toHaveLength(0);
  });

  it("エントリが空の場合は空配列を返す", async () => {
    vi.mocked(pokeapi.fetchMove).mockResolvedValue({
      ...sampleMove84,
      flavor_text_entries: [],
    } as unknown as MoveResponse);

    const repo = getPokeRepository();
    const result = await repo.getMoveFlavorTextPairs(mockFetch, 84);

    expect(result).toHaveLength(0);
  });
});
