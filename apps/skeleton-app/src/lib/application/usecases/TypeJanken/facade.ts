/**
 * あとだしタイプじゃんけんの全操作コマンドの唯一の入り口
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Facade)
 * - ROLE: ゲーム進行制御、プレゼン層へのゲーム操作手段の提供
 * - ALLOWED: ドメイン層への依存、アプリ層ストアへの依存、アプリ層 Port への依存
 * - FORBIDDEN: インフラ層への直接依存、プレゼン層への依存
 */

import { get } from "svelte/store";
import type { PokeData } from "$lib/domain/models/PokeData";
import type { GenerationNumber } from "$lib/domain/models/PokeGeneration";
import { generationData } from "$lib/domain/models/PokeGeneration";
import type { IPokeRepository } from "$lib/application/ports/IPokeRepository";
import { getSelectedGenerations } from "$lib/application/stores/generationStore";
import type { FacadeResult } from "$lib/application/usecases/facadeTypes";
import { withLoadingGuard } from "$lib/application/usecases/usecaseUtils";
import { getRandomNumber } from "$lib/shared/utils/randomUtils";
import {
  storeWriter,
  currentPokemon,
  roundResult,
  isGameOver,
  score,
  gameStartTime,
  type StarterType,
  type EvolutionStage,
} from "./store";

/** 1ゲームのラウンド数 */
export const TOTAL_ROUNDS = 10;

const STARTER_TYPES: StarterType[] = ["grass", "fire", "water"];
const EVOLUTION_STAGES: EvolutionStage[] = ["basic", "stage2"];

interface StarterIds {
  readonly basicId: number;
  readonly stage1Id: number;
  readonly stage2Id: number;
}

interface StarterSet {
  readonly grass: StarterIds;
  readonly fire: StarterIds;
  readonly water: StarterIds;
}

/**
 * 三すくみの勝敗を判定する
 *
 * fire > grass > water > fire の循環関係。
 * ドメイン層の calcTypeEffectiveness は「APIから取得した DamageRelations」を前提とするが、
 * このゲームの三すくみは API 依存を持ち込まず、ゲームロジックとして独立して記述する。
 */
export function judgeJanken(playerType: StarterType, opponentType: StarterType): "win" | "lose" | "draw" {
  if (playerType === opponentType) return "draw";
  if (
    (playerType === "fire" && opponentType === "grass") ||
    (playerType === "grass" && opponentType === "water") ||
    (playerType === "water" && opponentType === "fire")
  ) {
    return "win";
  }
  return "lose";
}

/**
 * 出現ポケモンの進化段階に応じた正解タイプを返す
 *
 * - 最終進化（stage2）→ 勝つ手を選ぶ（通常）
 * - 未進化（basic）→ 負ける手を選ぶ（わざと負ける）
 * - 中間進化（stage1）→ あいこ（ゲームでは未使用）
 *
 */
export function getCorrectType(opponentType: StarterType, stage: EvolutionStage): StarterType {
  if (stage === "stage2") {
    if (opponentType === "grass") return "fire";
    if (opponentType === "fire") return "water";
    return "grass";
  }
  if (stage === "basic") {
    if (opponentType === "grass") return "water";
    if (opponentType === "fire") return "grass";
    return "fire";
  }
  return opponentType;
}

/**
 * あとだしタイプじゃんけんのゲーム操作を提供する Facade
 *
 * 御三家9体（3タイプ × 3進化段階）を startGame 時に一括取得し、
 * nextRound ではAPIコール不要でランダムに選出する。
 */
export class TypeJankenFacade {
  private starterSet: StarterSet | null = null;
  private pokemonPool: Map<number, PokeData> = new Map();
  private difficulty: "easy" | "hard" = "hard";

  constructor(private readonly repository: IPokeRepository) {}

  /** ゲームを開始する: 最新世代の御三家9体を取得してボタン用ポケモンをセット */
  async startGame(fetchFn: typeof fetch, difficulty: "easy" | "hard" = "hard"): Promise<FacadeResult> {
    this.difficulty = difficulty;
    storeWriter.reset();
    return withLoadingGuard(
      async () => {
        const gens = getSelectedGenerations();
        const latestGen = Math.max(...gens) as GenerationNumber;
        const data = generationData(latestGen);
        if (!data) throw new Error("Generation data not found");

        // starters の順番は [くさ, ほのお, みず]（PokeGeneration.ts の定義に従う）
        const starterSet: StarterSet = {
          grass: { basicId: data.starters[0], stage1Id: data.starters[0] + 1, stage2Id: data.starters[0] + 2 },
          fire: { basicId: data.starters[1], stage1Id: data.starters[1] + 1, stage2Id: data.starters[1] + 2 },
          water: { basicId: data.starters[2], stage1Id: data.starters[2] + 1, stage2Id: data.starters[2] + 2 },
        };

        const ids = [
          starterSet.grass.basicId,
          starterSet.grass.stage1Id,
          starterSet.grass.stage2Id,
          starterSet.fire.basicId,
          starterSet.fire.stage1Id,
          starterSet.fire.stage2Id,
          starterSet.water.basicId,
          starterSet.water.stage1Id,
          starterSet.water.stage2Id,
        ];
        const pokeMap = await this.repository.getPokemons(fetchFn, ids);

        const fetchedCount = Object.keys(pokeMap).length;
        if (fetchedCount < 9) throw new Error(`Failed to fetch all starter pokemons (got ${fetchedCount}/9)`);

        return { starterSet, pokeMap };
      },
      (v) => storeWriter.setIsLoading(v),
      ({ starterSet, pokeMap }) => {
        this.starterSet = starterSet;
        this.pokemonPool = new Map(Object.entries(pokeMap).map(([k, v]) => [Number(k), v]));

        storeWriter.setButtonPokemons({
          grass: pokeMap[starterSet.grass.stage1Id.toString()]!,
          fire: pokeMap[starterSet.fire.stage1Id.toString()]!,
          water: pokeMap[starterSet.water.stage1Id.toString()]!,
        });

        storeWriter.setGameStartTime(Date.now());
        this.nextRound();
      },
      () => storeWriter.reset(),
    );
  }

  /** 次のラウンドをセット（保持済みデータから同期的にランダム選出） */
  nextRound(): void {
    if (!this.starterSet) return;

    const randomType = STARTER_TYPES[getRandomNumber(3)]!;
    const randomStage: EvolutionStage = this.difficulty === "easy" ? "stage2" : EVOLUTION_STAGES[getRandomNumber(2)]!;
    const ids = this.starterSet[randomType];
    const id = randomStage === "basic" ? ids.basicId : ids.stage2Id;
    const pokeData = this.pokemonPool.get(id);
    if (!pokeData) return;

    const correctType = getCorrectType(randomType, randomStage);
    storeWriter.setCurrentPokemon({ pokeData, starterType: randomType, stage: randomStage, correctType });
    storeWriter.setRoundResult(null);
  }

  /** ゲームをリセットして初期状態に戻す */
  resetGame(): void {
    storeWriter.reset();
  }

  /** プレイヤーが手（タイプ）を選択する */
  selectType(playerType: StarterType): void {
    const current = get(currentPokemon);
    if (!current || get(isGameOver)) return;
    if (get(roundResult) !== null) return;

    const judgment = judgeJanken(playerType, current.starterType);
    const isCorrect = playerType === current.correctType;

    storeWriter.setRoundResult({ playerType, judgment, isCorrect });
    if (isCorrect) storeWriter.incrementScore();
    storeWriter.incrementRoundCount();

    // 10問正解でタイムアタック終了
    if (isCorrect && get(score) >= TOTAL_ROUNDS) {
      const startTime = get(gameStartTime);
      if (startTime !== null) storeWriter.setFinalElapsedMs(Date.now() - startTime);
      storeWriter.setIsGameOver(true);
    } else {
      // 0.5秒後に自動で次のポケモンへ
      setTimeout(() => this.nextRound(), 500);
    }
  }
}
