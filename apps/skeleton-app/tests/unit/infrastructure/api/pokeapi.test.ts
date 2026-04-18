/**
 * pokeapi.ts のテスト
 *
 * Zodバリデーションと各APIアクセス関数の動作をテストする。
 * 実際のAPIは呼び出さず、fetchのモックを使用する。
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { fetchPokemon, fetchPokemonSpecies, fetchType } from "$lib/infrastructure/api/pokeapi";

// --- モックフィクスチャ（PokeAPI レスポンス形式） ---

const mockPikachu = {
  id: 25,
  name: "pikachu",
  types: [{ slot: 1, type: { name: "electric", url: "https://pokeapi.co/api/v2/type/13/" } }],
  stats: [
    { base_stat: 35, stat: { name: "hp", url: "https://pokeapi.co/api/v2/stat/1/" } },
    { base_stat: 55, stat: { name: "attack", url: "https://pokeapi.co/api/v2/stat/2/" } },
  ],
  sprites: {
    other: {
      "official-artwork": {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
      },
    },
  },
};

const mockPikachuSpecies = {
  id: 25,
  names: [
    { language: { name: "ja", url: "https://pokeapi.co/api/v2/language/11/" }, name: "ピカチュウ" },
    { language: { name: "en", url: "https://pokeapi.co/api/v2/language/9/" }, name: "Pikachu" },
  ],
  generation: { name: "generation-i", url: "https://pokeapi.co/api/v2/generation/1/" },
};

const mockElectricType = {
  id: 13,
  name: "electric",
  damage_relations: {
    no_damage_to: [{ name: "ground", url: "https://pokeapi.co/api/v2/type/5/" }],
    half_damage_to: [
      { name: "electric", url: "https://pokeapi.co/api/v2/type/13/" },
      { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" },
      { name: "dragon", url: "https://pokeapi.co/api/v2/type/16/" },
    ],
    double_damage_to: [
      { name: "flying", url: "https://pokeapi.co/api/v2/type/3/" },
      { name: "water", url: "https://pokeapi.co/api/v2/type/11/" },
    ],
    no_damage_from: [],
    half_damage_from: [
      { name: "electric", url: "https://pokeapi.co/api/v2/type/13/" },
      { name: "flying", url: "https://pokeapi.co/api/v2/type/3/" },
      { name: "steel", url: "https://pokeapi.co/api/v2/type/9/" },
    ],
    double_damage_from: [{ name: "ground", url: "https://pokeapi.co/api/v2/type/5/" }],
  },
};

// --- テスト ---

afterEach(() => {
  vi.restoreAllMocks();
});

describe("fetchPokemon", () => {
  it("IDでポケモンを取得できる", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockPikachu,
    });

    const pokemon = await fetchPokemon(mockFetch, 25);

    expect(pokemon.id).toBe(25);
    expect(pokemon.name).toBe("pikachu");
    expect(pokemon.types).toHaveLength(1);
    expect(pokemon.types[0].type.name).toBe("electric");
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/pokemon/25"), expect.any(Object));
  });

  it("名前でポケモンを取得できる", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockPikachu,
    });

    const pokemon = await fetchPokemon(mockFetch, "pikachu");

    expect(pokemon.name).toBe("pikachu");
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/pokemon/pikachu"), expect.any(Object));
  });

  it("sprites.other.official-artwork が null でも取得できる", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        ...mockPikachu,
        sprites: { other: { "official-artwork": { front_default: null } } },
      }),
    });

    const pokemon = await fetchPokemon(mockFetch, 25);

    expect(pokemon.sprites.other["official-artwork"].front_default).toBeNull();
  });

  it("ネットワークエラー時に例外をスローする", async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error("Network Error"));

    await expect(fetchPokemon(mockFetch, 25)).rejects.toThrow("Failed to fetch");
  });

  it("不正なレスポンス形式の場合にZodエラーをスローする", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Not Found" }),
    });

    await expect(fetchPokemon(mockFetch, 9999)).rejects.toThrow();
  });
});

describe("fetchPokemonSpecies", () => {
  it("IDでポケモン種族を取得できる", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockPikachuSpecies,
    });

    const species = await fetchPokemonSpecies(mockFetch, 25);

    expect(species.id).toBe(25);
    expect(species.names).toHaveLength(2);
    expect(species.generation.name).toBe("generation-i");
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/pokemon-species/25"), expect.any(Object));
  });

  it("名前でポケモン種族を取得できる", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockPikachuSpecies,
    });

    const species = await fetchPokemonSpecies(mockFetch, "pikachu");

    expect(species.names.find((n) => n.language.name === "ja")?.name).toBe("ピカチュウ");
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/pokemon-species/pikachu"), expect.any(Object));
  });

  it("ネットワークエラー時に例外をスローする", async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error("Network Error"));

    await expect(fetchPokemonSpecies(mockFetch, 25)).rejects.toThrow("Failed to fetch");
  });

  it("不正なレスポンス形式の場合にZodエラーをスローする", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Not Found" }),
    });

    await expect(fetchPokemonSpecies(mockFetch, 9999)).rejects.toThrow();
  });
});

describe("fetchType", () => {
  it("IDでタイプを取得できる", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockElectricType,
    });

    const type = await fetchType(mockFetch, 13);

    expect(type.id).toBe(13);
    expect(type.name).toBe("electric");
    expect(type.damage_relations.double_damage_to).toHaveLength(2);
    expect(type.damage_relations.double_damage_from).toHaveLength(1);
    expect(type.damage_relations.no_damage_from).toHaveLength(0);
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/type/13"), expect.any(Object));
  });

  it("名前でタイプを取得できる", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockElectricType,
    });

    const type = await fetchType(mockFetch, "electric");

    expect(type.name).toBe("electric");
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/type/electric"), expect.any(Object));
  });

  it("damage_relations の全フィールドが含まれている", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockElectricType,
    });

    const type = await fetchType(mockFetch, 13);
    const dr = type.damage_relations;

    expect(dr).toHaveProperty("no_damage_to");
    expect(dr).toHaveProperty("half_damage_to");
    expect(dr).toHaveProperty("double_damage_to");
    expect(dr).toHaveProperty("no_damage_from");
    expect(dr).toHaveProperty("half_damage_from");
    expect(dr).toHaveProperty("double_damage_from");
  });

  it("ネットワークエラー時に例外をスローする", async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error("Network Error"));

    await expect(fetchType(mockFetch, 13)).rejects.toThrow("Failed to fetch");
  });

  it("不正なレスポンス形式の場合にZodエラーをスローする", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Not Found" }),
    });

    await expect(fetchType(mockFetch, 9999)).rejects.toThrow();
  });
});
