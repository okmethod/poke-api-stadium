/**
 * PokeApiAdapter のテスト（リージョン関連メソッド）
 *
 * インフラ層 API 関数はすべてモック化し、URL→ID変換・重複排除・fallback などの
 * 変換ロジックのみを検証する。
 */
import { vi, describe, it, expect, beforeEach } from "vitest";
import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
import * as pokeapi from "$lib/infrastructure/api/pokeapi";
import type { PokemonSpeciesResponse, PokemonResponse } from "$lib/infrastructure/api/pokeapi";
import sampleSpecies25 from "../../../data/sample_species_25.json";
import samplePokemon25 from "../../../data/sample_pokemon_25.json";

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
