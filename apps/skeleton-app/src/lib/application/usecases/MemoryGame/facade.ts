/**
 * ポケモン神経衰弱の全操作コマンドの唯一の入り口
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Facade)
 * - ROLE: ゲーム進行制御、プレゼン層へのゲーム操作手段の提供
 * - ALLOWED: ドメイン層への依存、アプリ層ストアへの依存、アプリ層 Port への依存
 * - FORBIDDEN: インフラ層への直接依存、プレゼン層への依存
 */

import { get } from "svelte/store";
import type { IPokeRepository } from "$lib/application/ports/IPokeRepository";
import type { FacadeResult } from "$lib/application/usecases/facadeTypes";
import { selectRandomPokemons } from "$lib/application/utils/pokeSelectionUtils";
import { withLoadingGuard } from "$lib/application/usecases/usecaseUtils";
import { shuffleArray } from "$lib/shared/utils/arrayUtils";
import { storeWriter, cards, firstSelectedIndex, isChecking, matchedPairCount, totalPairCount } from "./store";
import type { MemoryCard } from "./store";

const DEFAULT_PAIR_COUNT = 8;

// 不一致時に裏返すまでの待機時間（ms）
const FLIP_BACK_DELAY_MS = 1000;

/**
 * ポケモン神経衰弱のゲーム操作を提供する Facade
 *
 * IPokeRepository を constructor injection で受け取ることで、
 * テスト時にモックを注入可能にする。
 */
export class MemoryGameFacade {
  constructor(private readonly repository: IPokeRepository) {}

  /** ゲームを開始: pairCount 体のポケモンを選出してカードペアを生成・シャッフル */
  async startGame(fetchFn: typeof fetch, pairCount: number = DEFAULT_PAIR_COUNT): Promise<FacadeResult> {
    storeWriter.reset();
    storeWriter.setTotalPairCount(pairCount);
    return withLoadingGuard(
      () => selectRandomPokemons(this.repository, fetchFn, pairCount),
      (v) => storeWriter.setIsLoading(v),
      (pokeDataList) => {
        const pairs: MemoryCard[] = pokeDataList.flatMap((pokeData, pairId) => [
          { cardId: pairId * 2, pairId, pokeData, isFlipped: false, isMatched: false },
          { cardId: pairId * 2 + 1, pairId, pokeData, isFlipped: false, isMatched: false },
        ]);
        storeWriter.setCards(shuffleArray(pairs));
      },
      () => storeWriter.setCards([]),
    );
  }

  /**
   * カードを選択する
   *
   * 1枚目: 表に返す。2枚目: ペア判定し、不一致なら FLIP_BACK_DELAY_MS 後に裏返す。
   * isChecking 中は連打を防ぐため操作を無視する。
   */
  selectCard(index: number): void {
    const currentCards = get(cards);
    const card = currentCards[index];
    if (!card || card.isFlipped || card.isMatched || get(isChecking)) return;

    const firstIdx = get(firstSelectedIndex);

    if (firstIdx === null) {
      // 1枚目の選択
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
    if (firstCard.pairId === card.pairId) {
      // ペア一致: 即座に確定してクリア判定
      storeWriter.updateCard(firstIdx, { isMatched: true });
      storeWriter.updateCard(index, { isMatched: true });
      storeWriter.incrementMatchedPairCount();
      storeWriter.setIsChecking(false);
      if (get(matchedPairCount) >= get(totalPairCount)) {
        storeWriter.setIsGameClear(true);
      }
    } else {
      // 不一致: 一定時間後に裏返す
      setTimeout(() => {
        storeWriter.updateCard(firstIdx, { isFlipped: false });
        storeWriter.updateCard(index, { isFlipped: false });
        storeWriter.setIsChecking(false);
      }, FLIP_BACK_DELAY_MS);
    }
  }
}
