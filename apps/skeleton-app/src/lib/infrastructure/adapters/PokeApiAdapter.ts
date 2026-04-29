/**
 * PokeApiAdapter - Port/Adapter パターンの Adapter (具象実装)
 *
 * PokeAPI との通信と、レスポンスのドメインモデルへの変換を担う。
 *
 * @remarks
 * - /pokemon と /pokemon-species を並列取得して PokeData に統合
 * - Zod によるレスポンス検証は pokeapi.ts に委譲
 * - Singleton パターンで単一インスタンスを共有
 *
 * @architecture レイヤー間依存ルール - インフラ層 (Adapter)
 * - ROLE: Port に従った具体的な技術実装（API通信 + ドメイン変換）
 * - ALLOWED: アプリ層の Port への依存、ドメイン層モデルへの依存
 * - FORBIDDEN: プレゼン層への依存
 */

import type {
  PokeData,
  PokeTypeData,
  PokeTypeName,
  PokeImageUrls,
  PokeCryUrls,
  PokeStats,
  AbilityRef,
  EvolutionChainRef,
  VarietyRef,
  FlavorText,
} from "$lib/domain/models/PokeData";
import { pokeTypeColor, generationData } from "$lib/domain/models/PokeData";
import type { IPokeRepository } from "$lib/application/ports/IPokeRepository";
import {
  fetchPokemon,
  fetchPokemonSpecies,
  fetchType,
  type PokemonResponse,
  type PokemonSpeciesResponse,
  type TypeResponse,
} from "$lib/infrastructure/api/pokeapi";

// 世代名（ローマ数字）→ 世代番号 の対応表
const GENERATION_NAME_MAP: Record<string, number> = {
  "generation-i": 1,
  "generation-ii": 2,
  "generation-iii": 3,
  "generation-iv": 4,
  "generation-v": 5,
  "generation-vi": 6,
  "generation-vii": 7,
  "generation-viii": 8,
  "generation-ix": 9,
};

function convertToStats(rawStats: PokemonResponse["stats"]): PokeStats {
  const find = (name: string): number => rawStats.find((s) => s.stat.name === name)?.base_stat ?? 0;
  return {
    hp: find("hp"),
    attack: find("attack"),
    defense: find("defense"),
    spAtk: find("special-attack"),
    spDef: find("special-defense"),
    speed: find("speed"),
  };
}

// sprites オブジェクトから画像URLを再帰的に抽出（png / gif のみ対象）
function extractImageUrls(obj: unknown): string[] {
  if (typeof obj === "string") {
    return /\.(png|gif)(\?|$)/i.test(obj) ? [obj] : [];
  }
  if (Array.isArray(obj)) {
    return obj.flatMap(extractImageUrls);
  }
  if (obj !== null && typeof obj === "object") {
    return Object.values(obj as Record<string, unknown>).flatMap(extractImageUrls);
  }
  return [];
}

// バージョンごとに ja > ja-hrkt 優先で1件選択し、テキスト重複を除去
function resolveFlavorTexts(entries: PokemonSpeciesResponse["flavor_text_entries"]): FlavorText[] {
  const byVersion = new Map<string, string>();
  for (const lang of ["ja", "ja-hrkt"]) {
    for (const entry of entries) {
      if (entry.language.name === lang && !byVersion.has(entry.version.name)) {
        byVersion.set(entry.version.name, entry.flavor_text);
      }
    }
  }
  const seenTexts = new Set<string>();
  const result: FlavorText[] = [];
  for (const [version, rawText] of byVersion) {
    const text = rawText
      .replace(/[\n\f\r]+/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim();
    if (!seenTexts.has(text)) {
      seenTexts.add(text);
      result.push({ text, version });
    }
  }
  return result;
}

function convertToPokeData(pokemon: PokemonResponse, species: PokemonSpeciesResponse): PokeData {
  // 日本語名: "ja" (漢字あり) を優先し、なければ "ja-hrkt" (カナ) を使用
  const jaName =
    species.names.find((n) => n.language.name === "ja")?.name ??
    species.names.find((n) => n.language.name === "ja-hrkt")?.name ??
    pokemon.name;

  // 分類: "ja" を優先し、なければ "ja-hrkt" を使用
  const genus =
    species.genera.find((g) => g.language.name === "ja")?.genus ??
    species.genera.find((g) => g.language.name === "ja-hrkt")?.genus ??
    "";

  const type1 = pokemon.types.find((t) => t.slot === 1)?.type.name as PokeTypeName;
  const type2 = (pokemon.types.find((t) => t.slot === 2)?.type.name as PokeTypeName) ?? null;

  const artworkFront =
    pokemon.sprites.other["official-artwork"].front_default ??
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

  // artwork.front を先頭に固定し、sprites 全体から重複なく全画像URLを収集
  const allImageUrls: string[] = [
    artworkFront,
    ...extractImageUrls(pokemon.sprites).filter((url) => url !== artworkFront),
  ];

  const imageUrls: PokeImageUrls = {
    pixel: {
      front: pokemon.sprites.front_default ?? null,
      back: pokemon.sprites.back_default ?? null,
    },
    artwork: {
      front: artworkFront,
      back: pokemon.sprites.other["official-artwork"].back_default ?? null,
    },
    gif: {
      front: pokemon.sprites.other.showdown?.front_default ?? null,
      back: pokemon.sprites.other.showdown?.back_default ?? null,
    },
    all: allImageUrls,
  };

  const cryUrls: PokeCryUrls = {
    latest: pokemon.cries.latest ?? null,
    legacy: pokemon.cries.legacy ?? null,
  };

  const abilities: AbilityRef[] = pokemon.abilities.map((a) => ({
    name: a.ability.name,
    url: a.ability.url,
    isHidden: a.is_hidden,
  }));

  const evolutionChainRef: EvolutionChainRef = {
    url: species.evolution_chain.url,
  };

  const varieties: VarietyRef[] = species.varieties.map((v) => ({
    name: v.pokemon.name,
    url: v.pokemon.url,
    isDefault: v.is_default,
  }));

  const generationNumber = GENERATION_NAME_MAP[species.generation.name] ?? 0;

  return {
    id: pokemon.id,
    enName: pokemon.name,
    jaName,
    genus,
    // PokeAPI は height をデシメートル、weight をヘクトグラムで返すため変換
    height: pokemon.height / 10,
    weight: pokemon.weight / 10,
    type1,
    type2,
    stats: convertToStats(pokemon.stats),
    imageUrls,
    cryUrls,
    generationData: generationData(generationNumber),
    isLegendary: species.is_legendary,
    isMythical: species.is_mythical,
    flavorTexts: resolveFlavorTexts(species.flavor_text_entries),
    abilities,
    evolutionChainRef,
    varieties,
  };
}

function convertToTypeData(raw: TypeResponse): PokeTypeData {
  const toTypeNames = (list: { name: string }[]): PokeTypeName[] => list.map((t) => t.name as PokeTypeName);
  const name = raw.name as PokeTypeName;
  // "ja" (漢字あり) を優先し、なければ "ja-Hrkt" (カナ) を使用
  const jaName =
    raw.names.find((n) => n.language.name === "ja")?.name ??
    raw.names.find((n) => n.language.name === "ja-Hrkt")?.name ??
    name;

  return {
    name,
    jaName,
    color: pokeTypeColor(name),
    damageRelations: {
      noDamageTo: toTypeNames(raw.damage_relations.no_damage_to),
      halfDamageTo: toTypeNames(raw.damage_relations.half_damage_to),
      doubleDamageTo: toTypeNames(raw.damage_relations.double_damage_to),
      noDamageFrom: toTypeNames(raw.damage_relations.no_damage_from),
      halfDamageFrom: toTypeNames(raw.damage_relations.half_damage_from),
      doubleDamageFrom: toTypeNames(raw.damage_relations.double_damage_from),
    },
  };
}

/** PokeAPI データ取得の具象実装 */
class PokeApiAdapter implements IPokeRepository {
  /** 図鑑番号または英語名でポケモンデータを取得 */
  async getPokemon(fetchFunction: typeof fetch, idOrName: number | string): Promise<PokeData> {
    const [pokemon, species] = await Promise.all([
      fetchPokemon(fetchFunction, idOrName),
      fetchPokemonSpecies(fetchFunction, idOrName),
    ]);
    return convertToPokeData(pokemon, species);
  }

  /** 番号またはタイプ名でタイプデータを取得 */
  async getType(fetchFunction: typeof fetch, idOrName: number | string): Promise<PokeTypeData> {
    const raw = await fetchType(fetchFunction, idOrName);
    return convertToTypeData(raw);
  }

  /**
   * 複数の図鑑番号からポケモン辞書を取得（失敗したIDはスキップ）
   *
   * PokeAPI の REST エンドポイントは単一リソース取得のみ対応で、複数ID一括取得は未サポート。
   * （GraphQL beta では可能だが安定性の観点で不採用）
   * そのため Promise.all による並列リクエストで代替している。
   */
  async getPokemons(fetchFunction: typeof fetch, ids: number[]): Promise<Record<string, PokeData>> {
    const result: Record<string, PokeData> = {};
    await Promise.all(
      ids.map(async (id) => {
        try {
          result[id.toString()] = await this.getPokemon(fetchFunction, id);
        } catch (error) {
          console.error(`Failed to fetch pokemon ${id}:`, error);
        }
      }),
    );
    return result;
  }

  /** 複数のタイプ名からタイプ辞書を取得 */
  async getTypes(fetchFunction: typeof fetch, names: string[]): Promise<Record<string, PokeTypeData>> {
    const result: Record<string, PokeTypeData> = {};
    await Promise.all(
      names.map(async (name) => {
        result[name] = await this.getType(fetchFunction, name);
      }),
    );
    return result;
  }
}

// Singleton インスタンス
let repositoryInstance: IPokeRepository | null = null;

/**
 * Singleton getter
 *
 * アプリ層から利用する統一アクセスポイント。
 */
export function getPokeRepository(): IPokeRepository {
  if (!repositoryInstance) {
    repositoryInstance = new PokeApiAdapter();
  }
  return repositoryInstance;
}
