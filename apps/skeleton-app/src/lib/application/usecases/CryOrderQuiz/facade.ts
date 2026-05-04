/**
 * CryOrderQuiz の全操作コマンドの唯一の入り口
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Facade)
 * - ROLE: ゲーム進行制御、プレゼン層へのゲーム操作手段の提供
 * - ALLOWED: ドメイン層への依存、アプリ層ストアへの依存、アプリ層 Port への依存
 * - FORBIDDEN: インフラ層への直接依存、プレゼン層への依存
 */

import type { PokeData } from "$lib/domain/models/PokeData";
import type { IPokeRepository } from "$lib/application/ports/IPokeRepository";
import type { FacadeResult } from "$lib/application/usecases/facadeTypes";
import { selectRandomPokemons } from "$lib/application/utils/pokeSelectionUtils";
import { withLoadingGuard } from "$lib/application/usecases/usecaseUtils";
import { shuffleArray } from "$lib/shared/utils/arrayUtils";
import { storeWriter } from "./store";

/** 選出するポケモン数（固定） */
export const POKE_COUNT = 3;

/**
 * 鳴き声順番クイズのゲーム操作を提供する Facade
 *
 * IPokeRepository を constructor injection で受け取ることで、
 * テスト時にモックを注入可能にする。
 */
export class CryOrderQuizFacade {
  constructor(private readonly repository: IPokeRepository) {}

  /** ランダムに3体を選出し、鳴き声の再生順をシャッフルしてストアを更新する */
  async pickPokemons(fetchFn: typeof fetch): Promise<FacadeResult> {
    storeWriter.reset();
    return withLoadingGuard(
      () => selectRandomPokemons(this.repository, fetchFn, POKE_COUNT),
      (v) => storeWriter.setIsLoading(v),
      (pokeDataList) => {
        storeWriter.setPokeDataList(pokeDataList);
        // 表示順（[0,1,2]）と異なる順になるまでシャッフル
        let seq = shuffleArray([0, 1, 2]);
        while (seq.every((v, i) => v === i)) {
          seq = shuffleArray([0, 1, 2]);
        }
        storeWriter.setCrySequence(seq);
      },
      () => storeWriter.setPokeDataList([]),
    );
  }

  /**
   * ユーザーの並び順を正解（crySequence）と照合してストアを更新する
   *
   * userArrangement は左→右の順にユーザーが並べた結果を期待する。
   * 正解は pokeDataList[crySequence[i]] の順。
   */
  revealResult(userArrangement: PokeData[], pokeDataList: PokeData[], crySequence: number[]): void {
    const isCorrect = userArrangement.every((poke, i) => poke.speciesId === pokeDataList[crySequence[i]!]!.speciesId);
    const message = isCorrect ? "せいかい！" : "ざんねん...";
    storeWriter.setResult({ isCorrect, message });
  }

  /** ゲーム状態をリセットする */
  reset(): void {
    storeWriter.reset();
  }
}
