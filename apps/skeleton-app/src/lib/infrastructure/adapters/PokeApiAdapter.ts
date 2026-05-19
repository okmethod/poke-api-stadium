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

import type { PokeTypeData, PokeTypeName } from "$lib/domain/models/PokeType";
import type { PokeData, PokeImageUrls, PokeCryUrls, PokeStats } from "$lib/domain/models/PokeData";
import type { FlavorText, FlavorTextPair } from "$lib/domain/models/FlavorText";
import { generationData } from "$lib/domain/models/PokeGeneration";
import { pokeTypeColor, parsePokeTypeName } from "$lib/domain/models/PokeType";
import type { PokeAbility, AbilityRef } from "$lib/domain/models/PokeAbility";
import type { FormVariant, VarietyRef } from "$lib/domain/models/PokeForm";
import type {
  EvolutionChain,
  EvolutionCondition,
  EvolutionNode,
  EvolutionChainRef,
} from "$lib/domain/models/PokeEvolution";
import { parseEvolutionTrigger } from "$lib/domain/models/PokeEvolution";
import type { PokeMove, MoveCategory, MoveLearnRef, MoveLearnMethodName } from "$lib/domain/models/PokeMove";
import { MOVE_LEARN_METHODS, MOVE_LEARN_METHOD_ORDER } from "$lib/domain/models/PokeMove";
import type { PokeItem, PokeItemCategory, PokeItemCategoryMeta } from "$lib/domain/models/PokeItem";
import type { PokeLocationMeta, PokeLocation, PokeSpeciesMeta } from "$lib/domain/models/PokeRegion";
import type { IPokeRepository } from "$lib/application/ports/IPokeRepository";
import type {
  PokemonResponse,
  PokemonSpeciesResponse,
  ItemResponse,
  ItemCategoryResponse,
  AbilityResponse,
  MoveResponse,
  TypeResponse,
  EvolutionChainResponse,
} from "$lib/infrastructure/api/pokeapi";
import {
  fetchRegion,
  fetchLocation,
  fetchLocationArea,
  fetchPokemon,
  fetchPokemonSpecies,
  fetchPokemonSpeciesByUrl,
  fetchPokemonForm,
  fetchAbility,
  fetchItem,
  fetchItemPocket,
  fetchItemCategory,
  fetchMove,
  fetchType,
  fetchEvolutionChain,
} from "$lib/infrastructure/api/pokeapi";
import { pokeSpriteUrl, pokeArtworkUrl } from "$lib/infrastructure/api/pokeSprites";

// 最新バージョングループ（わざ一覧のフィルタ基準）
const LATEST_VERSION_GROUP = "scarlet-violet";

function parseMoveLearnMethod(name: string): MoveLearnMethodName {
  return MOVE_LEARN_METHODS.has(name as MoveLearnMethodName) ? (name as MoveLearnMethodName) : "level-up";
}

// PokeAPI は endpoint によって "ja-Hrkt" / "ja-hrkt" のどちらを返すか不定のため両方を許容する
function resolveJaName(entries: { language: { name: string }; name: string }[], fallback: string): string;
function resolveJaName(entries: { language: { name: string }; name: string }[]): string | null;
function resolveJaName(entries: { language: { name: string }; name: string }[], fallback?: string): string | null {
  return (
    entries.find((n) => n.language.name === "ja")?.name ??
    entries.find((n) => n.language.name === "ja-Hrkt" || n.language.name === "ja-hrkt")?.name ??
    fallback ??
    null
  );
}

function extractMoveLearnDetails(moves: PokemonResponse["moves"]): MoveLearnRef[] {
  const result: MoveLearnRef[] = [];
  for (const entry of moves) {
    const svDetail = entry.version_group_details.find((d) => d.version_group.name === LATEST_VERSION_GROUP);
    if (!svDetail) continue;
    result.push({
      enName: entry.move.name,
      url: entry.move.url,
      levelLearnedAt: svDetail.level_learned_at,
      learnMethod: parseMoveLearnMethod(svDetail.move_learn_method.name),
    });
  }
  return result.sort((a, b) => {
    const methodDiff = MOVE_LEARN_METHOD_ORDER[a.learnMethod] - MOVE_LEARN_METHOD_ORDER[b.learnMethod];
    if (methodDiff !== 0) return methodDiff;
    // level-up 内はレベル昇順（0 = 進化わざは先頭）
    return a.levelLearnedAt - b.levelLearnedAt;
  });
}

function normalizeJaText(text: string): string {
  return (
    text
      // eslint-disable-next-line no-irregular-whitespace
      .replace(/　/g, " ") // 全角スペース→半角
      .replace(/[\f\r]+/g, "\n") // \f, \r → \n に統一
      .replace(/\n{2,}/g, "\n") // 複数改行 → 単一
      .replace(/ {2,}/g, " ") // 複数スペース → 単一
      .trim()
  );
}

// バージョングループの優先順位
const VERSION_GROUP_PRIORITY = [
  "scarlet-violet",
  "sword-shield",
  "sun-moon",
  "ultra-sun-ultra-moon",
  "x-y",
  "omega-ruby-alpha-sapphire",
  "black-2-white-2",
  "black-white",
];

// バージョングループごとに ja > ja-Hrkt 優先で1件選択し、テキスト重複を除去
function resolveMoveFlavorTexts(entries: MoveResponse["flavor_text_entries"]): FlavorText[] {
  const byVersionGroup = new Map<string, string>();
  for (const lang of ["ja", "ja-Hrkt", "ja-hrkt"]) {
    for (const entry of entries) {
      if (entry.language.name === lang && !byVersionGroup.has(entry.version_group.name)) {
        byVersionGroup.set(entry.version_group.name, entry.flavor_text);
      }
    }
  }
  const seenTexts = new Set<string>();
  const result: FlavorText[] = [];
  for (const vg of VERSION_GROUP_PRIORITY) {
    const rawText = byVersionGroup.get(vg);
    if (rawText) {
      const text = normalizeJaText(rawText);
      if (!seenTexts.has(text)) {
        seenTexts.add(text);
        result.push({ text, version: vg });
      }
    }
  }
  // 優先リスト外のバージョングループも追加
  for (const [vg, rawText] of byVersionGroup) {
    if (!VERSION_GROUP_PRIORITY.includes(vg)) {
      const text = normalizeJaText(rawText);
      if (!seenTexts.has(text)) {
        seenTexts.add(text);
        result.push({ text, version: vg });
      }
    }
  }
  return result;
}

// ポケモン種族のバージョン優先順位（個別バージョン名）
const SPECIES_VERSION_PRIORITY = [
  "scarlet",
  "violet",
  "sword",
  "shield",
  "sun",
  "moon",
  "ultra-sun",
  "ultra-moon",
  "x",
  "y",
  "omega-ruby",
  "alpha-sapphire",
  "black-2",
  "white-2",
  "black",
  "white",
];

/**
 * わざの漢字・かなフレーバーテキストペアを全バージョングループ分解決する。
 *
 * ja と ja-Hrkt が同一バージョングループに揃っているものを収集し、重複テキストを除外して返す。
 */
function resolveAllMoveFlavorTextPairs(entries: MoveResponse["flavor_text_entries"]): FlavorTextPair[] {
  const jaEntries = entries.filter((e) => e.language.name === "ja");
  const kanaEntries = entries.filter((e) => e.language.name === "ja-Hrkt" || e.language.name === "ja-hrkt");

  const pairs: FlavorTextPair[] = [];
  const seenKeys = new Set<string>();

  const addPair = (jaText: string, kanaText: string) => {
    const key = `${jaText}|${kanaText}`;
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      pairs.push({ kanji: jaText, kana: kanaText });
    }
  };

  // 優先度リスト順に、ja・ja-Hrkt が揃うバージョングループのペアを収集
  for (const vg of VERSION_GROUP_PRIORITY) {
    const jaEntry = jaEntries.find((e) => e.version_group.name === vg);
    const kanaEntry = kanaEntries.find((e) => e.version_group.name === vg);
    if (jaEntry && kanaEntry) {
      addPair(normalizeJaText(jaEntry.flavor_text), normalizeJaText(kanaEntry.flavor_text));
    }
  }

  // 優先度リスト外のバージョングループも探索（フォールバック）
  if (pairs.length === 0) {
    for (const jaEntry of jaEntries) {
      const kanaEntry = kanaEntries.find((e) => e.version_group.name === jaEntry.version_group.name);
      if (kanaEntry) {
        addPair(normalizeJaText(jaEntry.flavor_text), normalizeJaText(kanaEntry.flavor_text));
      }
    }
  }

  return pairs;
}

/**
 * ポケモン種族の漢字・かなフレーバーテキストペアを全バージョン分解決する。
 *
 * ja と ja-hrkt が同一バージョンに揃っているものを収集し、重複テキストを除外して返す。
 */
function resolveAllSpeciesFlavorTextPairs(entries: PokemonSpeciesResponse["flavor_text_entries"]): FlavorTextPair[] {
  const jaEntries = entries.filter((e) => e.language.name === "ja");
  const kanaEntries = entries.filter((e) => e.language.name === "ja-hrkt" || e.language.name === "ja-Hrkt");

  const pairs: FlavorTextPair[] = [];
  const seenKeys = new Set<string>();

  const addPair = (jaText: string, kanaText: string) => {
    const key = `${jaText}|${kanaText}`;
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      pairs.push({ kanji: jaText, kana: kanaText });
    }
  };

  // 優先度リスト順に、ja・ja-hrkt が揃うバージョンのペアを収集
  for (const v of SPECIES_VERSION_PRIORITY) {
    const jaEntry = jaEntries.find((e) => e.version.name === v);
    const kanaEntry = kanaEntries.find((e) => e.version.name === v);
    if (jaEntry && kanaEntry) {
      addPair(normalizeJaText(jaEntry.flavor_text), normalizeJaText(kanaEntry.flavor_text));
    }
  }

  // 優先度リスト外のバージョンも探索（フォールバック）
  if (pairs.length === 0) {
    for (const jaEntry of jaEntries) {
      const kanaEntry = kanaEntries.find((e) => e.version.name === jaEntry.version.name);
      if (kanaEntry) {
        addPair(normalizeJaText(jaEntry.flavor_text), normalizeJaText(kanaEntry.flavor_text));
      }
    }
  }

  return pairs;
}

function convertToAbility(raw: AbilityResponse, isHidden: boolean): PokeAbility {
  const jaName = resolveJaName(raw.names, raw.name);
  // ja > ja-Hrkt の優先順で最初に見つかった説明文を採用
  const flavorText =
    raw.flavor_text_entries.find((e) => e.language.name === "ja")?.flavor_text ??
    raw.flavor_text_entries.find((e) => e.language.name === "ja-Hrkt" || e.language.name === "ja-hrkt")?.flavor_text ??
    null;
  return {
    id: raw.id,
    enName: raw.name,
    jaName,
    isHidden,
    flavorText: flavorText
      ? flavorText
          .replace(/[\n\f\r]+/g, " ")
          .replace(/\s{2,}/g, " ")
          .trim()
      : null,
  };
}

function convertToMove(raw: MoveResponse): PokeMove {
  const jaName = resolveJaName(raw.names, raw.name);
  return {
    id: raw.id,
    enName: raw.name,
    jaName,
    type: parsePokeTypeName(raw.type.name),
    category: raw.damage_class.name as MoveCategory,
    power: raw.power,
    accuracy: raw.accuracy,
    pp: raw.pp,
    flavorTexts: resolveMoveFlavorTexts(raw.flavor_text_entries),
  };
}

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

function convertToPokeData(
  pokemon: PokemonResponse,
  species: PokemonSpeciesResponse,
  formJaName: string | null = null,
): PokeData {
  // 日本語名: フォーム名があればそれを優先（リージョンフォーム等）、なければ species 名を使用
  const baseJaName = resolveJaName(species.names, pokemon.name);
  const jaName = formJaName ?? baseJaName;

  // 分類: "ja" を優先し、なければ "ja-hrkt" を使用
  const genus =
    species.genera.find((g) => g.language.name === "ja")?.genus ??
    species.genera.find((g) => g.language.name === "ja-Hrkt" || g.language.name === "ja-hrkt")?.genus ??
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

  const abilityRefs: AbilityRef[] = pokemon.abilities.map((a) => ({
    name: a.ability.name,
    url: a.ability.url,
    isHidden: a.is_hidden,
  }));

  const evolutionChainRef: EvolutionChainRef = {
    url: species.evolution_chain.url,
  };

  const varietyRefs: VarietyRef[] = species.varieties.map((v) => ({
    name: v.pokemon.name,
    url: v.pokemon.url,
    isDefault: v.is_default,
  }));

  const generationNumber = GENERATION_NAME_MAP[species.generation.name] ?? 0;

  return {
    speciesId: species.id,
    pokeId: pokemon.id,
    enName: pokemon.name,
    speciesEnName: species.name,
    jaName,
    speciesJaName: baseJaName,
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
    abilityRefs,
    evolutionChainRef,
    varietyRefs,
    learnableMoveRefs: extractMoveLearnDetails(pokemon.moves),
  };
}

function extractIdFromUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? Number(match[1]) : 0;
}

function resolveItemFlavorText(entries: ItemResponse["flavor_text_entries"]): string {
  const jaEntries = entries.filter((e) => e.language.name === "ja" || e.language.name === "ja-Hrkt");
  for (const vg of VERSION_GROUP_PRIORITY) {
    const entry =
      jaEntries.find((e) => e.version_group.name === vg && e.language.name === "ja") ??
      jaEntries.find((e) => e.version_group.name === vg && e.language.name === "ja-Hrkt");
    if (entry) {
      return entry.text
        .replace(/[\n\f\r]+/g, " ")
        .replace(/\s{2,}/g, " ")
        .trim();
    }
  }
  const fallback = jaEntries[0];
  return fallback
    ? fallback.text
        .replace(/[\n\f\r]+/g, " ")
        .replace(/\s{2,}/g, " ")
        .trim()
    : "";
}

function convertToPokeItem(raw: ItemResponse): PokeItem {
  const jaName = resolveJaName(raw.names, raw.name);
  return {
    id: raw.id,
    enName: raw.name,
    jaName,
    imageUrl: raw.sprites.default,
    category: raw.category.name,
    flavorText: resolveItemFlavorText(raw.flavor_text_entries),
  };
}

function convertToPokeItemCategoryMeta(raw: ItemCategoryResponse): PokeItemCategoryMeta {
  const jaName = resolveJaName(raw.names) ?? raw.name;
  return { id: raw.id, enName: raw.name, jaName };
}

function convertToPokeItemCategory(raw: ItemCategoryResponse): PokeItemCategory {
  return {
    ...convertToPokeItemCategoryMeta(raw),
    items: raw.items.map((r) => r.name),
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
      const jaName = resolveJaName(species.names, name);
      jaNameMap.set(name, jaName);
    }),
    ...allItemNames.map(async (name) => {
      const raw = await fetchItem(fetchFunction, name);
      itemMap.set(name, convertToPokeItem(raw));
    }),
  ]);

  function buildNode(node: EvolutionChainResponse["chain"]): EvolutionNode {
    const speciesId = extractIdFromUrl(node.species.url);
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
  const jaName = resolveJaName(raw.names, name);

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
    // リージョンフォーム（ID ≥ 10000）は pokemon-species/{id} が存在しないため、
    // pokemon レスポンスの species.url を使って species を取得する
    const pokemon = await fetchPokemon(fetchFunction, idOrName);
    const species = await fetchPokemonSpeciesByUrl(fetchFunction, pokemon.species.url);

    // pokemon.id と species.id が異なる場合はフォームデータからフォーム名を取得
    let formJaName: string | null = null;
    if (pokemon.id !== species.id) {
      try {
        const form = await fetchPokemonForm(fetchFunction, pokemon.name);
        formJaName = resolveJaName(form.form_names);
      } catch {
        // フォームデータが取得できない場合は species 名にフォールバック
      }
    }

    return convertToPokeData(pokemon, species, formJaName);
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

        const jaName = resolveJaName(form.form_names, defaultJaName);

        const type1 = parsePokeTypeName(form.types.find((t) => t.slot === 1)?.type.name ?? "");
        const type2Name = form.types.find((t) => t.slot === 2)?.type.name;
        const type2 = type2Name != null ? parsePokeTypeName(type2Name) : null;

        // variety.url (pokemon エンドポイント) から ID を取得し、アートワークURLを優先する
        const pokeId = extractIdFromUrl(variety.url);
        const imageUrl = pokeId > 0 ? pokeArtworkUrl(pokeId) : (form.sprites.front_default ?? null);

        return {
          pokeId,
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

  /** 特性参照リストから特性詳細を並列取得 */
  async getAbilities(fetchFunction: typeof fetch, abilityRefs: readonly AbilityRef[]): Promise<readonly PokeAbility[]> {
    return Promise.all(
      abilityRefs.map(async (ref) => {
        const raw = await fetchAbility(fetchFunction, ref.name);
        return convertToAbility(raw, ref.isHidden);
      }),
    );
  }

  /** 習得可能わざ参照リストのスライスからわざ詳細を並列取得 */
  async getMoves(fetchFunction: typeof fetch, details: readonly MoveLearnRef[]): Promise<readonly PokeMove[]> {
    return Promise.all(
      details.map(async (detail) => {
        const raw = await fetchMove(fetchFunction, detail.enName);
        return convertToMove(raw);
      }),
    );
  }

  /** 番号または英語名でわざデータを取得 */
  async getMove(fetchFunction: typeof fetch, idOrName: number | string): Promise<PokeMove> {
    const raw = await fetchMove(fetchFunction, idOrName);
    return convertToMove(raw);
  }

  /** タイプ名でそのタイプのわざ英語名一覧を取得 */
  async getMoveNamesByType(fetchFunction: typeof fetch, typeName: string): Promise<string[]> {
    const type = await fetchType(fetchFunction, typeName);
    return type.moves.map((m) => m.name);
  }

  /** 番号または英語名でアイテムデータを取得 */
  async getItem(fetchFunction: typeof fetch, idOrName: number | string): Promise<PokeItem> {
    const raw = await fetchItem(fetchFunction, idOrName);
    return convertToPokeItem(raw);
  }

  /** ポケット名でそのポケット内のカテゴリ一覧（アイテム名一覧付き）を取得 */
  async getItemPocketCategories(fetchFunction: typeof fetch, pocketName: string): Promise<PokeItemCategory[]> {
    const pocket = await fetchItemPocket(fetchFunction, pocketName);
    const categories = await Promise.all(pocket.categories.map((r) => fetchItemCategory(fetchFunction, r.name)));
    return categories.map(convertToPokeItemCategory);
  }

  /** 番号または英語名でアイテムカテゴリ（アイテム名一覧付き）を取得 */
  async getItemCategory(fetchFunction: typeof fetch, idOrName: number | string): Promise<PokeItemCategory> {
    const raw = await fetchItemCategory(fetchFunction, idOrName);
    return convertToPokeItemCategory(raw);
  }

  /** 地方IDでその地方のロケーション一覧を取得 */
  async getRegionLocations(fetchFunction: typeof fetch, regionId: number): Promise<PokeLocationMeta[]> {
    const raw = await fetchRegion(fetchFunction, regionId);
    return raw.locations.map((loc) => ({
      id: extractIdFromUrl(loc.url),
      enName: loc.name,
    }));
  }

  /** IDでロケーション詳細（全エリアを並列取得してflatten + 重複排除）を取得 */
  async getLocation(fetchFunction: typeof fetch, id: number): Promise<PokeLocation> {
    const raw = await fetchLocation(fetchFunction, id);
    const areas = await Promise.all(raw.areas.map((a) => fetchLocationArea(fetchFunction, extractIdFromUrl(a.url))));
    const allNames = areas.flatMap((a) => a.pokemon_encounters.map((e) => e.pokemon.name));
    const unique = [...new Set(allNames)];
    return { id: raw.id, enName: raw.name, encounterSpeciesNames: unique };
  }

  /** 番号または英語名でポケモン種族のメタ情報（日本語名）を取得 */
  async getPokemonSpeciesMeta(fetchFunction: typeof fetch, idOrName: number | string): Promise<PokeSpeciesMeta> {
    try {
      const raw = await fetchPokemonSpecies(fetchFunction, idOrName);
      return { id: raw.id, enName: raw.name, jaName: resolveJaName(raw.names, raw.name) };
    } catch {
      // リージョンフォーム等でspecies直取得が失敗する場合は pokemon → species URL 経由で取得
      const pokemon = await fetchPokemon(fetchFunction, idOrName);
      const species = await fetchPokemonSpeciesByUrl(fetchFunction, pokemon.species.url);
      return { id: species.id, enName: species.name, jaName: resolveJaName(species.names, species.name) };
    }
  }

  /** 番号または英語名でポケモン種族の漢字・かなフレーバーテキストペアを全バージョン分取得 */
  async getSpeciesFlavorTextPairs(fetchFunction: typeof fetch, idOrName: number | string): Promise<FlavorTextPair[]> {
    const raw = await fetchPokemonSpecies(fetchFunction, idOrName);
    return resolveAllSpeciesFlavorTextPairs(raw.flavor_text_entries);
  }

  /** 番号または英語名でわざの漢字・かなフレーバーテキストペアを全バージョングループ分取得 */
  async getMoveFlavorTextPairs(fetchFunction: typeof fetch, idOrName: number | string): Promise<FlavorTextPair[]> {
    const raw = await fetchMove(fetchFunction, idOrName);
    return resolveAllMoveFlavorTextPairs(raw.flavor_text_entries);
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
