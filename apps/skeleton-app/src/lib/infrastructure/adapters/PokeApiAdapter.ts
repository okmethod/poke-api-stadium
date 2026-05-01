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
import { pokeTypeColor, generationData, parsePokeTypeName } from "$lib/domain/models/PokeData";
import type { EvolutionChain, EvolutionCondition, EvolutionNode } from "$lib/domain/models/EvolutionChain";
import { parseEvolutionTrigger } from "$lib/domain/models/EvolutionChain";
import type { FormVariant } from "$lib/domain/models/FormVariant";
import type { PokeItem } from "$lib/domain/models/PokeItem";
import type { IPokeRepository } from "$lib/application/ports/IPokeRepository";
import {
  fetchPokemon,
  fetchPokemonSpecies,
  fetchPokemonForm,
  fetchItem,
  fetchType,
  fetchEvolutionChain,
  type PokemonResponse,
  type PokemonSpeciesResponse,
  type ItemResponse,
  type TypeResponse,
  type EvolutionChainResponse,
} from "$lib/infrastructure/api/pokeapi";
import { pokeSpriteUrl, pokeArtworkUrl } from "$lib/infrastructure/api/pokeSprites";

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

  const type1 = parsePokeTypeName(pokemon.types.find((t) => t.slot === 1)?.type.name ?? "");
  const type2Name = pokemon.types.find((t) => t.slot === 2)?.type.name;
  const type2 = type2Name != null ? parsePokeTypeName(type2Name) : null;

  const artworkFront = pokemon.sprites.other["official-artwork"].front_default ?? pokeSpriteUrl(pokemon.id);

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

function extractSpeciesId(url: string): number {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? Number(match[1]) : 0;
}

function convertToPokeItem(raw: ItemResponse): PokeItem {
  const jaName =
    raw.names.find((n) => n.language.name === "ja")?.name ??
    raw.names.find((n) => n.language.name === "ja-Hrkt")?.name ??
    raw.name;
  return {
    id: raw.id,
    enName: raw.name,
    jaName,
    imageUrl: raw.sprites.default,
  };
}

function convertToEvolutionCondition(
  detail: EvolutionChainResponse["chain"]["evolution_details"][number] | undefined,
  itemMap: Map<string, PokeItem>,
): EvolutionCondition {
  if (!detail) return { trigger: "other" };

  const trigger = parseEvolutionTrigger(detail.trigger.name);
  switch (trigger) {
    case "level-up":
      return {
        trigger,
        minLevel: detail.min_level,
        minHappiness: detail.min_happiness,
        timeOfDay: detail.time_of_day,
        knownMove: detail.known_move?.name ?? null,
      };
    case "use-item":
      return {
        trigger,
        useItem: detail.item ? (itemMap.get(detail.item.name) ?? null) : null,
      };
    case "trade":
      return {
        trigger,
        heldItem: detail.held_item ? (itemMap.get(detail.held_item.name) ?? null) : null,
      };
    default:
      return { trigger };
  }
}

function collectSpeciesNames(node: EvolutionChainResponse["chain"]): string[] {
  return [node.species.name, ...node.evolves_to.flatMap((child) => collectSpeciesNames(child))];
}

function collectItemNames(node: EvolutionChainResponse["chain"]): string[] {
  const names: string[] = [];
  for (const child of node.evolves_to) {
    for (const detail of child.evolution_details) {
      if (detail.item?.name) names.push(detail.item.name);
      if (detail.held_item?.name) names.push(detail.held_item.name);
    }
    names.push(...collectItemNames(child));
  }
  return names;
}

async function enrichEvolutionChain(
  fetchFunction: typeof fetch,
  response: EvolutionChainResponse,
): Promise<EvolutionChain> {
  const allSpeciesNames = collectSpeciesNames(response.chain);
  const allItemNames = [...new Set(collectItemNames(response.chain))];

  const jaNameMap = new Map<string, string>();
  const itemMap = new Map<string, PokeItem>();

  await Promise.all([
    ...allSpeciesNames.map(async (name) => {
      const species = await fetchPokemonSpecies(fetchFunction, name);
      const jaName =
        species.names.find((n) => n.language.name === "ja")?.name ??
        species.names.find((n) => n.language.name === "ja-hrkt")?.name ??
        name;
      jaNameMap.set(name, jaName);
    }),
    ...allItemNames.map(async (name) => {
      const raw = await fetchItem(fetchFunction, name);
      itemMap.set(name, convertToPokeItem(raw));
    }),
  ]);

  function buildNode(node: EvolutionChainResponse["chain"]): EvolutionNode {
    const speciesId = extractSpeciesId(node.species.url);
    return {
      speciesId,
      speciesName: node.species.name,
      jaName: jaNameMap.get(node.species.name) ?? node.species.name,
      // pokemon-species エンドポイントに画像URLはないため、IDからURLを構築して使用
      imageUrl: pokeArtworkUrl(speciesId),
      evolvesTo: node.evolves_to.map((child) => ({
        condition: convertToEvolutionCondition(child.evolution_details[0], itemMap),
        next: buildNode(child),
      })),
    };
  }

  return { id: response.id, root: buildNode(response.chain) };
}

function convertToTypeData(raw: TypeResponse): PokeTypeData {
  const toTypeNames = (list: { name: string }[]): PokeTypeName[] => list.map((t) => parsePokeTypeName(t.name));
  const name = parsePokeTypeName(raw.name);
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

  /** 番号またはタイプ名でタイプデータを取得 */
  async getType(fetchFunction: typeof fetch, idOrName: number | string): Promise<PokeTypeData> {
    const raw = await fetchType(fetchFunction, idOrName);
    return convertToTypeData(raw);
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

  /** 進化チェーン参照 URL から進化チェーンデータを取得 */
  async getEvolutionChain(fetchFunction: typeof fetch, url: string): Promise<EvolutionChain> {
    const raw = await fetchEvolutionChain(fetchFunction, url);
    return enrichEvolutionChain(fetchFunction, raw);
  }

  /** バリエーション参照リストからフォーム詳細を並列取得 */
  async getFormVariants(
    fetchFunction: typeof fetch,
    varieties: readonly VarietyRef[],
    defaultJaName: string,
  ): Promise<readonly FormVariant[]> {
    return Promise.all(
      varieties.map(async (variety): Promise<FormVariant> => {
        const form = await fetchPokemonForm(fetchFunction, variety.name);

        const jaName =
          form.form_names.find((n) => n.language.name === "ja")?.name ??
          form.form_names.find((n) => n.language.name === "ja-hrkt")?.name ??
          defaultJaName;

        const type1 = parsePokeTypeName(form.types.find((t) => t.slot === 1)?.type.name ?? "");
        const type2Name = form.types.find((t) => t.slot === 2)?.type.name;
        const type2 = type2Name != null ? parsePokeTypeName(type2Name) : null;

        // variety.url (pokemon エンドポイント) から ID を取得し、アートワークURLを優先する
        const pokemonId = extractSpeciesId(variety.url);
        const imageUrl = pokemonId > 0 ? pokeArtworkUrl(pokemonId) : (form.sprites.front_default ?? null);

        return {
          enName: variety.name,
          jaName,
          isDefault: variety.isDefault,
          isMega: form.is_mega,
          isBattleOnly: form.is_battle_only,
          type1,
          type2,
          imageUrl,
        };
      }),
    );
  }

  /** 番号または英語名でアイテムデータを取得 */
  async getItem(fetchFunction: typeof fetch, idOrName: number | string): Promise<PokeItem> {
    const raw = await fetchItem(fetchFunction, idOrName);
    return convertToPokeItem(raw);
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
