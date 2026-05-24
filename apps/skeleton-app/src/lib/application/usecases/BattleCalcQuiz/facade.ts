/**
 * BattleCalcQuiz の全操作コマンドの唯一の入り口
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Facade)
 * - ROLE: ゲーム進行制御、プレゼン層へのゲーム操作手段の提供
 * - ALLOWED: ドメイン層への依存、アプリ層ストアへの依存、アプリ層 Port への依存
 * - FORBIDDEN: インフラ層への直接依存、プレゼン層への依存
 */

import { get } from "svelte/store";
import type { PokeData } from "$lib/domain/models/PokeData";
import type { IPokeRepository } from "$lib/application/ports/IPokeRepository";
import type { FacadeResult } from "$lib/application/usecases/facadeTypes";
import { withLoadingGuard } from "$lib/application/usecases/usecaseUtils";
import { selectRandomPokemons } from "$lib/application/utils/pokeSelectionUtils";
import { getRandomNumber } from "$lib/shared/utils/randomUtils";
import { PROBLEM_TEMPLATES } from "./problemTemplates";
import type { Difficulty } from "./problemTemplates";
import { storeWriter, difficulties, type CalcProblem } from "./store";

/** ポケモンペアの振り直し上限（テンプレート条件を満たすペアが見つからない場合） */
const MAX_PAIR_RETRIES = 5;

/**
 * バトル計算ドリルのゲーム操作を提供する Facade
 *
 * IPokeRepository を constructor injection で受け取ることで、
 * テスト時にモックを注入可能にする。
 */
export class BattleCalcQuizFacade {
  constructor(private readonly repository: IPokeRepository) {}

  /** ゲームを開始する（スコアリセット） */
  async startGame(fetchFn: typeof fetch): Promise<FacadeResult> {
    storeWriter.reset();
    return this.fetchAndSetProblem(fetchFn);
  }

  /** 次の問題へ進む（新しいポケモンペアで問題を生成、スコアリセットなし） */
  async nextProblem(fetchFn: typeof fetch): Promise<FacadeResult> {
    storeWriter.setProblem(null);
    return this.fetchAndSetProblem(fetchFn);
  }

  /** 難易度を1つ選択する */
  setDifficulty(difficulty: Difficulty): void {
    storeWriter.setDifficulties([difficulty]);
  }

  // --- private ---

  private fetchAndSetProblem(fetchFn: typeof fetch): Promise<FacadeResult> {
    return withLoadingGuard(
      () => this.generateProblem(fetchFn),
      (v) => storeWriter.setIsLoading(v),
      ({ pair, problem: p }) => {
        storeWriter.setPokeDataPair(pair);
        storeWriter.setProblem(p);
      },
      () => storeWriter.setPokeDataPair(null),
    );
  }

  /**
   * 難易度からテンプレートを選び、条件に合うポケモンペアを探して問題を生成する
   * テンプレートを先に固定し、ペアを振り直すことで難易度設定が確実に反映される
   */
  private async generateProblem(fetchFn: typeof fetch): Promise<{ pair: [PokeData, PokeData]; problem: CalcProblem }> {
    const activeDifficulties = get(difficulties);
    const candidates = PROBLEM_TEMPLATES.filter((t) => activeDifficulties.includes(t.difficulty));
    const template = candidates[getRandomNumber(candidates.length)]!;

    for (let i = 0; i < MAX_PAIR_RETRIES; i++) {
      const pokemons = await selectRandomPokemons(this.repository, fetchFn, 2);
      const pair = pokemons as [PokeData, PokeData];
      const p = template.generate(pair);
      if (p !== null) return { pair, problem: p };
    }

    // フォールバック: total_hp は必ず成功
    const fallback = PROBLEM_TEMPLATES.find((t) => t.id === "total_hp")!;
    const pokemons = await selectRandomPokemons(this.repository, fetchFn, 2);
    const pair = pokemons as [PokeData, PokeData];
    return { pair, problem: fallback.generate(pair)! };
  }
}
