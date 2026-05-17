/**
 * 重さ測りゲームの全操作コマンドの唯一の入り口
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Facade)
 * - ROLE: ゲーム進行制御、プレゼン層へのゲーム操作手段の提供
 * - ALLOWED: ドメイン層への依存、アプリ層ストアへの依存、アプリ層 Port への依存
 * - FORBIDDEN: インフラ層への直接依存、プレゼン層への依存
 */

import type { PokeData } from "$lib/domain/models/PokeData";
import type { PhysicsWorld2dConfig } from "$lib/domain/models/2dPhysics";
import type { IPokeRepository } from "$lib/application/ports/IPokeRepository";
import type { ISpringScalePhysicsEngine } from "$lib/application/ports/ISpringScalePhysicsEngine";
import type { FacadeResult } from "$lib/application/usecases/facadeTypes";
import { selectRandomPokemon } from "$lib/application/utils/pokeSelectionUtils";
import { withLoadingGuard } from "$lib/application/usecases/usecaseUtils";
import { storeWriter } from "./store";

// 目標重量（固定）
const TARGET_WEIGHT_KG = 100;

// バネ破断の重量閾値
const SPRING_BREAK_KG = 200;

// 釣り合い判定の許容誤差（目標重量の±5%）
const BALANCE_TOLERANCE = 0.05;

/** 配置済みポケモンと物理ボディ ID の対応 */
interface PlacedItem {
  readonly bodyId: string;
  readonly poke: PokeData;
}

/** 重さ測りゲームのゲーム操作を提供する Facade */
export class WeightBalanceFacade {
  private currentPokeData: PokeData | null = null;
  private placedItems: PlacedItem[] = [];
  private targetWeight: number = 0;
  private nextBodyId: number = 0;

  constructor(
    private readonly springEngine: ISpringScalePhysicsEngine,
    private readonly repository: IPokeRepository,
  ) {}

  /** ワールドを初期化してエンジンを起動する */
  async initialize(config: PhysicsWorld2dConfig): Promise<void> {
    await this.springEngine.initialize(config);
    storeWriter.reset();
  }

  /** エンジンを停止してリソースを解放する */
  dispose(): void {
    this.springEngine.dispose();
    this.currentPokeData = null;
    this.placedItems = [];
    this.targetWeight = 0;
    this.nextBodyId = 0;
  }

  /**
   * ゲームを開始（または再開）する
   *
   * エンジンをリセットして新しい目標重量を設定し、最初の候補ポケモンを引く。
   */
  async startGame(fetchFn: typeof fetch): Promise<FacadeResult> {
    this.springEngine.reset();

    this.currentPokeData = null;
    this.placedItems = [];
    this.targetWeight = 0;
    this.nextBodyId = 0;
    storeWriter.reset();

    this.targetWeight = TARGET_WEIGHT_KG;
    this.springEngine.setTargetWeight(TARGET_WEIGHT_KG);
    storeWriter.setTargetWeight(TARGET_WEIGHT_KG);
    storeWriter.setToleranceWeight(TARGET_WEIGHT_KG * BALANCE_TOLERANCE);

    return this._drawNextPokemon(fetchFn);
  }

  /** 現在の候補ポケモンを台に乗せて次の候補を引く */
  async placePokemon(fetchFn: typeof fetch): Promise<FacadeResult> {
    if (!this.currentPokeData) return { success: false, error: "No current pokemon" };

    const poke = this.currentPokeData;
    const bodyId = `placed-${this.nextBodyId++}`;
    const imageUrl = poke.imageUrls.pixel.front ?? poke.imageUrls.artwork.front ?? "";

    this.placedItems.push({ bodyId, poke });
    await this.springEngine.addPokeBody({ id: bodyId, imageUrl, mass: poke.weight });

    storeWriter.setPlacedPokeDataList(this.placedItems.map((item) => item.poke));
    this.currentPokeData = null;
    storeWriter.setCurrentPokeData(null);

    // 合計重量が閾値を超えたらバネ破断
    const totalWeight = this.placedItems.reduce((sum, item) => sum + item.poke.weight, 0);
    if (totalWeight > SPRING_BREAK_KG) {
      this.springEngine.breakSpring();
      storeWriter.setIsSpringBroken(true);
      return { success: true };
    }

    return this._drawNextPokemon(fetchFn);
  }

  /** 現在の候補ポケモンをパスして次の候補を引く */
  async skipPokemon(fetchFn: typeof fetch): Promise<FacadeResult> {
    this.currentPokeData = null;
    storeWriter.setCurrentPokeData(null);

    return this._drawNextPokemon(fetchFn);
  }

  /**
   * 指定インデックスのポケモンを台から取り除く
   *
   * 現在の候補ポケモンには影響しない。
   */
  discardPokemon(index: number): void {
    const item = this.placedItems[index];
    if (!item) return;

    this.springEngine.removePokeBody(item.bodyId);
    this.placedItems.splice(index, 1);
    storeWriter.setPlacedPokeDataList(this.placedItems.map((i) => i.poke));
  }

  /**
   * 現在の乗せ具合で結果を判定する
   *
   * 物理エンジンへの操作は不要（バネが常時動作中）。
   * 乗せた合計重量が目標の BALANCE_TOLERANCE 以内かどうかで判定する。
   */
  async compare(): Promise<FacadeResult> {
    const totalPlaced = this.placedItems.reduce((sum, item) => sum + item.poke.weight, 0);
    const isBalanced =
      this.targetWeight > 0 && Math.abs(this.targetWeight - totalPlaced) / this.targetWeight <= BALANCE_TOLERANCE;

    storeWriter.setIsBalanced(isBalanced);
    storeWriter.setIsRevealed(true);

    return { success: true };
  }

  /** 次の候補ポケモンをランダムに選出してストアに反映する */
  private async _drawNextPokemon(fetchFn: typeof fetch): Promise<FacadeResult> {
    return withLoadingGuard(
      () => selectRandomPokemon(this.repository, fetchFn),
      (v) => storeWriter.setIsLoading(v),
      (poke) => {
        this.currentPokeData = poke;
        storeWriter.setCurrentPokeData(poke);
      },
      () => {
        this.currentPokeData = null;
        storeWriter.setCurrentPokeData(null);
      },
    );
  }
}
