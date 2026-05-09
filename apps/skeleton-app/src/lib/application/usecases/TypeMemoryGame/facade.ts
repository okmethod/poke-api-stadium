/**
 * タイプ神経衰弱の全操作コマンドの唯一の入り口
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Facade)
 * - ROLE: ゲーム進行制御、プレゼン層へのゲーム操作手段の提供
 * - ALLOWED: ドメイン層への依存、アプリ層ストアへの依存、アプリ層 Port への依存
 * - FORBIDDEN: インフラ層への直接依存、プレゼン層への依存
 */

import { get } from "svelte/store";
import type { IPokeRepository } from "$lib/application/ports/IPokeRepository";
import type { FacadeResult } from "$lib/application/usecases/facadeTypes";
import type { PokeData } from "$lib/domain/models/PokeData";
import type { PokeTypeName } from "$lib/domain/models/PokeType";
import { selectRandomPokemons } from "$lib/application/utils/pokeSelectionUtils";
import { withLoadingGuard } from "$lib/application/usecases/usecaseUtils";
import { shuffleArray } from "$lib/shared/utils/arrayUtils";
import { storeWriter, cards, firstSelectedIndex, isChecking, matchedPairCount, totalPairCount } from "./store";
import type { TypeMemoryCard } from "./store";

const DEFAULT_PAIR_COUNT = 8;
const FLIP_BACK_DELAY_MS = 1000;
const FETCH_MULTIPLIER = 4;
// greedy pair-building が失敗した場合のフォールバック試行回数
const SUBSET_ATTEMPTS = 3;

/**
 * タイプ神経衰弱のゲーム操作を提供する Facade
 *
 * IPokeRepository を constructor injection で受け取ることで、
 * テスト時にモックを注入可能にする。
 */
export class TypeMemoryGameFacade {
  constructor(private readonly repository: IPokeRepository) {}

  /**
   * ゲームを開始: buildSolvablePairs() で完全マッチング可能なカード群を生成・シャッフル
   *
   * 共通タイプを持つ任意の2枚がマッチする動的判定方式（案B-2）。
   * greedy pair-building はプールに十分な多様性があれば 1 回の試行で成功する。
   * SUBSET_ATTEMPTS 回試行しても確保できなければエラーを返す。
   */
  async startGame(fetchFn: typeof fetch, pairCount: number = DEFAULT_PAIR_COUNT): Promise<FacadeResult> {
    storeWriter.reset();
    return withLoadingGuard(
      async () => {
        const pool = await selectRandomPokemons(this.repository, fetchFn, pairCount * FETCH_MULTIPLIER);
        for (let attempt = 0; attempt < SUBSET_ATTEMPTS; attempt++) {
          const candidate = buildSolvablePairs(shuffleArray(pool), pairCount);
          if (candidate !== null) return candidate;
        }
        throw new Error("Failed to generate solvable game");
      },
      (v) => storeWriter.setIsLoading(v),
      (selectedPokemons) => {
        storeWriter.setTotalPairCount(pairCount);
        const newCards: TypeMemoryCard[] = shuffleArray(selectedPokemons).map((pokeData, cardId) => ({
          cardId,
          pokeData,
          isFlipped: false,
          isMatched: false,
          matchedType: null,
        }));
        storeWriter.setCards(newCards);
      },
      () => storeWriter.setCards([]),
    );
  }

  /**
   * カードを選択する
   *
   * 1枚目: 表に返す。2枚目: 共通タイプで一致判定し、不一致なら FLIP_BACK_DELAY_MS 後に裏返す。
   * isChecking 中は連打を防ぐため操作を無視する。
   */
  selectCard(index: number): void {
    const currentCards = get(cards);
    const card = currentCards[index];
    if (!card || card.isFlipped || card.isMatched || get(isChecking)) return;

    const firstIdx = get(firstSelectedIndex);

    if (firstIdx === null) {
      // 1枚目の選択: 前回の判定結果をリセット
      storeWriter.setLastMatchResult(null);
      storeWriter.updateCard(index, { isFlipped: true });
      storeWriter.setFirstSelectedIndex(index);
      return;
    }

    // 2枚目の選択
    storeWriter.updateCard(index, { isFlipped: true });
    storeWriter.setFirstSelectedIndex(null);
    storeWriter.incrementMoveCount();
    storeWriter.setIsChecking(true);

    const firstCard = currentCards[firstIdx]!;
    const sharedType = findSharedType(firstCard.pokeData, card.pokeData);

    if (sharedType !== null) {
      // 共通タイプあり: 即座に確定してクリア判定
      storeWriter.updateCard(firstIdx, { isMatched: true, matchedType: sharedType });
      storeWriter.updateCard(index, { isMatched: true, matchedType: sharedType });
      storeWriter.incrementMatchedPairCount();
      storeWriter.setIsChecking(false);
      storeWriter.setLastMatchResult({ isCorrect: true });
      if (get(matchedPairCount) >= get(totalPairCount)) {
        storeWriter.setIsGameClear(true);
      }
    } else {
      // 共通タイプなし: SE を即座に鳴らし、一定時間後に裏返す
      storeWriter.setLastMatchResult({ isCorrect: false });
      setTimeout(() => {
        storeWriter.updateCard(firstIdx, { isFlipped: false });
        storeWriter.updateCard(index, { isFlipped: false });
        storeWriter.setIsChecking(false);
      }, FLIP_BACK_DELAY_MS);
    }
  }

  /** 同じポケモン・同じ配置のままゲーム状態のみリセットする（詰み回避用） */
  resetGame(): void {
    storeWriter.resetCardsState();
  }
}

/** 2体のポケモンが共通して持つタイプを返す（なければ null） */
export function findSharedType(pokeA: PokeData, pokeB: PokeData): PokeTypeName | null {
  const typesA = [pokeA.type1, pokeA.type2].filter((t): t is PokeTypeName => t !== null);
  const typesB = [pokeB.type1, pokeB.type2].filter((t): t is PokeTypeName => t !== null);
  return typesA.find((t) => typesB.includes(t)) ?? null;
}

/**
 * シャッフル済みプールから共通タイプを持つペアを pairCount 組確保して返す
 *
 * ランダムサブセット + isSolvable 検証と異なり、ペアを能動的に確保するため、
 * プールに十分な多様性があれば 1 回の試行でほぼ確実に成功する。
 * greedy の選択パスはシャッフル順序に依存するため、
 * 異なるシャッフルで複数回呼ぶことで局所解への固着を回避できる。
 */
export function buildSolvablePairs(shuffledPool: PokeData[], pairCount: number): PokeData[] | null {
  const used = new Array<boolean>(shuffledPool.length).fill(false);
  const pairs: PokeData[] = [];

  for (let i = 0; i < shuffledPool.length && pairs.length < pairCount * 2; i++) {
    if (used[i]) continue;
    for (let j = i + 1; j < shuffledPool.length; j++) {
      if (!used[j] && findSharedType(shuffledPool[i]!, shuffledPool[j]!) !== null) {
        pairs.push(shuffledPool[i]!, shuffledPool[j]!);
        used[i] = true;
        used[j] = true;
        break;
      }
    }
  }

  return pairs.length === pairCount * 2 ? pairs : null;
}
