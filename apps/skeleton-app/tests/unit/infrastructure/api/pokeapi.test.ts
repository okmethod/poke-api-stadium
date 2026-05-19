/**
 * pokeapi.ts のテスト
 *
 * API 層のデータ取得（パース）ロジックを検証する。
 * Zod スキーマによるレスポンス検証と、fetch 関数のURL・エラーハンドリングを確認する。
 * 実際の API は呼び出さず、fetch のモックを使用する。
 * モックはサンプル JSON を返し、正しく parse できるかを保証する。
 *
 * なお、アダプター層（変換ロジック）のテストは PokeApiAdapter.test.ts が担う。
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import {
  fetchRegion,
  fetchLocation,
  fetchLocationArea,
  fetchPokemon,
  fetchPokemonSpecies,
  fetchPokemonSpeciesByUrl,
  fetchPokemonForm,
  fetchAbility,
  fetchMove,
  fetchItem,
  fetchItemPocket,
  fetchItemCategory,
  fetchType,
  fetchEvolutionChain,
  clearCache,
} from "$lib/infrastructure/api/pokeapi";
import {
  createOkMockFetch,
  createNetworkErrorMockFetch,
  createNotFoundMockFetch,
} from "../../../__testUtils__/mockFetch";
import samplePokemon25 from "../../../data/sample_pokemon_25.json";
import sampleSpecies25 from "../../../data/sample_species_25.json";
import samplePokemonFormPikachu from "../../../data/sample_pokemon_form_pikachu.json";
import sampleAbility9 from "../../../data/sample_ability_9.json";
import sampleMove84 from "../../../data/sample_move_84.json";
import sampleItem4 from "../../../data/sample_item_4.json";
import sampleItemPocket1 from "../../../data/sample_item_pocket_1.json";
import sampleItemCategory34 from "../../../data/sample_item_category_34.json";
import sampleType13 from "../../../data/sample_type_13.json";
import sampleEvolutionChain10 from "../../../data/sample_evolution_chain_10.json";
import sampleRegion1 from "../../../data/sample_region_1.json";
import sampleLocation1 from "../../../data/sample_location_1.json";
import sampleLocationArea1 from "../../../data/sample_location_area_1.json";

// --- テスト ---

afterEach(() => {
  vi.restoreAllMocks();
  clearCache();
});

describe("fetchRegion", () => {
  it("IDで地方を取得できる", async () => {
    const mockFetch = createOkMockFetch(sampleRegion1);

    const region = await fetchRegion(mockFetch, 1);

    expect(region.id).toBe(1);
    expect(region.locations).toHaveLength(2);
    expect(region.locations[0]!.name).toBe("pallet-town");
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/region/1"), expect.any(Object));
  });

  it("名前で地方を取得できる", async () => {
    const mockFetch = createOkMockFetch(sampleRegion1);

    const region = await fetchRegion(mockFetch, "kanto");

    expect(region.id).toBe(1);
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/region/kanto"), expect.any(Object));
  });

  it("ネットワークエラー時に例外をスローする", async () => {
    const mockFetch = createNetworkErrorMockFetch();

    await expect(fetchRegion(mockFetch, 1)).rejects.toThrow("Failed to fetch");
  });

  it("不正なレスポンス形式の場合にZodエラーをスローする", async () => {
    const mockFetch = createNotFoundMockFetch();

    await expect(fetchRegion(mockFetch, 9999)).rejects.toThrow();
  });
});

describe("fetchLocation", () => {
  it("IDでロケーションを取得できる", async () => {
    const mockFetch = createOkMockFetch(sampleLocation1);

    const location = await fetchLocation(mockFetch, 1);

    expect(location.id).toBe(1);
    expect(location.name).toBe("pallet-town");
    expect(location.areas).toHaveLength(1);
    expect(location.areas[0]!.name).toBe("pallet-town-area");
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/location/1"), expect.any(Object));
  });

  it("ネットワークエラー時に例外をスローする", async () => {
    const mockFetch = createNetworkErrorMockFetch();

    await expect(fetchLocation(mockFetch, 1)).rejects.toThrow("Failed to fetch");
  });

  it("不正なレスポンス形式の場合にZodエラーをスローする", async () => {
    const mockFetch = createNotFoundMockFetch();

    await expect(fetchLocation(mockFetch, 9999)).rejects.toThrow();
  });
});

describe("fetchLocationArea", () => {
  it("IDでロケーションエリアを取得できる", async () => {
    const mockFetch = createOkMockFetch(sampleLocationArea1);

    const area = await fetchLocationArea(mockFetch, 1);

    expect(area.id).toBe(1);
    expect(area.name).toBe("pallet-town-area");
    expect(area.pokemon_encounters).toHaveLength(2);
    expect(area.pokemon_encounters[0]!.pokemon.name).toBe("pidgey");
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/location-area/1"), expect.any(Object));
  });

  it("ネットワークエラー時に例外をスローする", async () => {
    const mockFetch = createNetworkErrorMockFetch();

    await expect(fetchLocationArea(mockFetch, 1)).rejects.toThrow("Failed to fetch");
  });

  it("不正なレスポンス形式の場合にZodエラーをスローする", async () => {
    const mockFetch = createNotFoundMockFetch();

    await expect(fetchLocationArea(mockFetch, 9999)).rejects.toThrow();
  });
});

describe("fetchPokemon", () => {
  it("IDでポケモンを取得できる", async () => {
    const mockFetch = createOkMockFetch(samplePokemon25);

    const pokemon = await fetchPokemon(mockFetch, 25);

    expect(pokemon.id).toBe(25);
    expect(pokemon.name).toBe("pikachu");
    expect(pokemon.types).toHaveLength(1);
    expect(pokemon.types[0]!.type.name).toBe("electric");
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/pokemon/25"), expect.any(Object));
  });

  it("名前でポケモンを取得できる", async () => {
    const mockFetch = createOkMockFetch(samplePokemon25);

    const pokemon = await fetchPokemon(mockFetch, "pikachu");

    expect(pokemon.name).toBe("pikachu");
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/pokemon/pikachu"), expect.any(Object));
  });

  it("sprites.other.official-artwork が null でも取得できる", async () => {
    const mockFetch = createOkMockFetch({
      ...samplePokemon25,
      sprites: { other: { "official-artwork": { front_default: null } } },
    });

    const pokemon = await fetchPokemon(mockFetch, 25);

    expect(pokemon.sprites.other["official-artwork"].front_default).toBeNull();
  });

  it("ネットワークエラー時に例外をスローする", async () => {
    const mockFetch = createNetworkErrorMockFetch();

    await expect(fetchPokemon(mockFetch, 25)).rejects.toThrow("Failed to fetch");
  });

  it("不正なレスポンス形式の場合にZodエラーをスローする", async () => {
    const mockFetch = createNotFoundMockFetch();

    await expect(fetchPokemon(mockFetch, 9999)).rejects.toThrow();
  });
});

describe("fetchPokemonSpecies", () => {
  it("IDでポケモン種族を取得できる", async () => {
    const mockFetch = createOkMockFetch(sampleSpecies25);

    const species = await fetchPokemonSpecies(mockFetch, 25);

    expect(species.id).toBe(25);
    expect(species.names.length).toBeGreaterThan(0);
    expect(species.generation.name).toBe("generation-i");
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/pokemon-species/25"), expect.any(Object));
  });

  it("名前でポケモン種族を取得できる", async () => {
    const mockFetch = createOkMockFetch(sampleSpecies25);

    const species = await fetchPokemonSpecies(mockFetch, "pikachu");

    expect(species.names.find((n) => n.language.name === "ja")?.name).toBe("ピカチュウ");
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/pokemon-species/pikachu"), expect.any(Object));
  });

  it("flavor_text_entries に漢字・かなの日本語エントリが含まれている", async () => {
    const mockFetch = createOkMockFetch(sampleSpecies25);

    const species = await fetchPokemonSpecies(mockFetch, 25);

    expect(species.flavor_text_entries.some((e) => e.language.name === "ja")).toBe(true);
    expect(
      species.flavor_text_entries.some((e) => e.language.name === "ja-hrkt" || e.language.name === "ja-Hrkt"),
    ).toBe(true);
  });

  it("ネットワークエラー時に例外をスローする", async () => {
    const mockFetch = createNetworkErrorMockFetch();

    await expect(fetchPokemonSpecies(mockFetch, 25)).rejects.toThrow("Failed to fetch");
  });

  it("不正なレスポンス形式の場合にZodエラーをスローする", async () => {
    const mockFetch = createNotFoundMockFetch();

    await expect(fetchPokemonSpecies(mockFetch, 9999)).rejects.toThrow();
  });
});

describe("fetchType", () => {
  it("IDでタイプを取得できる", async () => {
    const mockFetch = createOkMockFetch(sampleType13);

    const type = await fetchType(mockFetch, 13);

    expect(type.id).toBe(13);
    expect(type.name).toBe("electric");
    expect(type.damage_relations.double_damage_to).toHaveLength(2);
    expect(type.damage_relations.double_damage_from).toHaveLength(1);
    expect(type.damage_relations.no_damage_from).toHaveLength(0);
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/type/13"), expect.any(Object));
  });

  it("名前でタイプを取得できる", async () => {
    const mockFetch = createOkMockFetch(sampleType13);

    const type = await fetchType(mockFetch, "electric");

    expect(type.name).toBe("electric");
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/type/electric"), expect.any(Object));
  });

  it("damage_relations の全フィールドが含まれている", async () => {
    const mockFetch = createOkMockFetch(sampleType13);

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
    const mockFetch = createNetworkErrorMockFetch();

    await expect(fetchType(mockFetch, 13)).rejects.toThrow("Failed to fetch");
  });

  it("不正なレスポンス形式の場合にZodエラーをスローする", async () => {
    const mockFetch = createNotFoundMockFetch();

    await expect(fetchType(mockFetch, 9999)).rejects.toThrow();
  });
});

describe("fetchPokemonSpeciesByUrl", () => {
  it("絶対URLで種族を取得できる", async () => {
    const mockFetch = createOkMockFetch(sampleSpecies25);
    const url = "https://pokeapi.co/api/v2/pokemon-species/25/";

    const species = await fetchPokemonSpeciesByUrl(mockFetch, url);

    expect(species.id).toBe(25);
    expect(mockFetch).toHaveBeenCalledWith(url, expect.any(Object));
  });
});

describe("fetchPokemonForm", () => {
  it("フォーム名でポケモンフォームを取得できる", async () => {
    const mockFetch = createOkMockFetch(samplePokemonFormPikachu);

    const form = await fetchPokemonForm(mockFetch, "pikachu");

    expect(form.id).toBe(25);
    expect(form.name).toBe("pikachu");
    expect(form.is_default).toBe(true);
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/pokemon-form/pikachu"), expect.any(Object));
  });
});

describe("fetchAbility", () => {
  it("IDでとくせいを取得できる", async () => {
    const mockFetch = createOkMockFetch(sampleAbility9);

    const ability = await fetchAbility(mockFetch, 9);

    expect(ability.id).toBe(9);
    expect(ability.name).toBe("static");
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/ability/9"), expect.any(Object));
  });
});

describe("fetchMove", () => {
  it("IDでわざを取得できる", async () => {
    const mockFetch = createOkMockFetch(sampleMove84);

    const move = await fetchMove(mockFetch, 84);

    expect(move.id).toBe(84);
    expect(move.name).toBe("thunder-shock");
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/move/84"), expect.any(Object));
  });

  it("flavor_text_entries に漢字・かなの日本語エントリが含まれている", async () => {
    const mockFetch = createOkMockFetch(sampleMove84);

    const move = await fetchMove(mockFetch, 84);

    expect(move.flavor_text_entries.some((e) => e.language.name === "ja")).toBe(true);
    expect(move.flavor_text_entries.some((e) => e.language.name === "ja-Hrkt" || e.language.name === "ja-hrkt")).toBe(
      true,
    );
  });
});

describe("fetchItem", () => {
  it("IDでアイテムを取得できる", async () => {
    const mockFetch = createOkMockFetch(sampleItem4);

    const item = await fetchItem(mockFetch, 4);

    expect(item.id).toBe(4);
    expect(item.name).toBe("poke-ball");
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/item/4"), expect.any(Object));
  });
});

describe("fetchItemPocket", () => {
  it("名前でアイテムポケットを取得できる", async () => {
    const mockFetch = createOkMockFetch(sampleItemPocket1);

    const pocket = await fetchItemPocket(mockFetch, "misc");

    expect(pocket.id).toBe(1);
    expect(pocket.name).toBe("misc");
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/item-pocket/misc"), expect.any(Object));
  });
});

describe("fetchItemCategory", () => {
  it("IDでアイテムカテゴリを取得できる", async () => {
    const mockFetch = createOkMockFetch(sampleItemCategory34);

    const category = await fetchItemCategory(mockFetch, 34);

    expect(category.id).toBe(34);
    expect(category.name).toBe("standard-balls");
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/item-category/34"), expect.any(Object));
  });
});

describe("fetchEvolutionChain", () => {
  it("IDで進化チェーンを取得できる", async () => {
    const mockFetch = createOkMockFetch(sampleEvolutionChain10);

    const chain = await fetchEvolutionChain(mockFetch, 10);

    expect(chain.id).toBe(10);
    expect(chain.chain.species.name).toBe("pichu");
    expect(chain.chain.evolves_to[0]?.species.name).toBe("pikachu");
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/evolution-chain/10"), expect.any(Object));
  });

  it("絶対URLで進化チェーンを取得できる", async () => {
    const mockFetch = createOkMockFetch(sampleEvolutionChain10);
    const url = "https://pokeapi.co/api/v2/evolution-chain/10/";

    const chain = await fetchEvolutionChain(mockFetch, url);

    expect(chain.id).toBe(10);
    // 絶対URLがそのまま fetch に渡されることを確認
    expect(mockFetch).toHaveBeenCalledWith(url, expect.any(Object));
  });
});

describe("キャッシュ", () => {
  it("同一URLへの2回目の呼び出しはfetchを発行しない", async () => {
    const mockFetch = createOkMockFetch(samplePokemon25);

    await fetchPokemon(mockFetch, 25);
    await fetchPokemon(mockFetch, 25);

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("clearCache後は再びfetchを発行する", async () => {
    const mockFetch = createOkMockFetch(samplePokemon25);

    await fetchPokemon(mockFetch, 25);
    clearCache();
    await fetchPokemon(mockFetch, 25);

    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it("fetchRegion の同一URLへの2回目の呼び出しはfetchを発行しない", async () => {
    const mockFetch = createOkMockFetch(sampleRegion1);

    await fetchRegion(mockFetch, 1);
    await fetchRegion(mockFetch, 1);

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("fetchLocation の同一URLへの2回目の呼び出しはfetchを発行しない", async () => {
    const mockFetch = createOkMockFetch(sampleLocation1);

    await fetchLocation(mockFetch, 1);
    await fetchLocation(mockFetch, 1);

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("fetchLocationArea の同一URLへの2回目の呼び出しはfetchを発行しない", async () => {
    const mockFetch = createOkMockFetch(sampleLocationArea1);

    await fetchLocationArea(mockFetch, 1);
    await fetchLocationArea(mockFetch, 1);

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
