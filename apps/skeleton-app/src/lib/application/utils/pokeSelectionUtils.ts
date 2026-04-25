/**
 * pokeSelectionUtils - ポケモンランダム選出の共通ユーティリティ
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Utility)
 * - ROLE: 選択世代からのポケモン選出ロジックを各 Facade で共有する
 * - ALLOWED: アプリ層 Port への依存、ドメイン層モデルへの依存
 * - FORBIDDEN: インフラ層への直接依存、プレゼン層への依存
 */

import type { PokeData } from "$lib/domain/models/PokeData";
import type { IPokeRepository } from "$lib/application/ports/IPokeRepository";
import { getSelectedPokeIds } from "$lib/application/stores/generationStore";
import { getRandomNumber, pickRandomNumbers } from "$lib/shared/utils/randomUtils";

/** 選択世代からランダムに1体のポケモンデータを取得する */
export async function selectRandomPokemon(repository: IPokeRepository, fetchFn: typeof fetch): Promise<PokeData> {
  const allIds = getSelectedPokeIds();
  const id = allIds[getRandomNumber(allIds.length)]!;
  return repository.getPokemon(fetchFn, id);
}

/** 選択世代からランダムに複数のポケモンデータを取得する（選出順序を保持） */
export async function selectRandomPokemons(
  repository: IPokeRepository,
  fetchFn: typeof fetch,
  count: number,
): Promise<PokeData[]> {
  const allIds = getSelectedPokeIds();
  const ids = pickRandomNumbers(allIds, count);
  const pokeDataMap = await repository.getPokemons(fetchFn, ids);
  return ids.map((id) => pokeDataMap[id.toString()]).filter((d): d is PokeData => d !== undefined);
}
