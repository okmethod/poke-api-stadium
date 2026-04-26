/**
 * おもさくらべの全操作コマンドの唯一の入り口
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Facade)
 * - ROLE: ゲーム進行制御、プレゼン層へのゲーム操作手段の提供
 * - ALLOWED: ドメイン層への依存、アプリ層ストアへの依存、アプリ層 Port への依存
 * - FORBIDDEN: インフラ層への直接依存、プレゼン層への依存
 */

import type { ISeesawPhysicsEngine } from "$lib/application/ports/ISeesawPhysicsEngine";
import type { IPokeRepository } from "$lib/application/ports/IPokeRepository";
import type { FacadeResult } from "$lib/application/usecases/facadeTypes";
import type { PhysicsWorld2dConfig } from "$lib/domain/models/2dPhysics";
import { selectRandomPokemons } from "$lib/application/utils/pokeSelectionUtils";
import { storeWriter } from "./store";

const POKE_COUNT = 2;
const SIDES = ["left", "right"] as const;

/** おもさくらべのゲーム操作を提供する Facade */
export class WeightComparisonFacade {
  private activeBodyIds: string[] = [];

  constructor(
    private readonly seesawEngine: ISeesawPhysicsEngine,
    private readonly repository: IPokeRepository,
  ) {}

  /** ワールドを初期化してエンジンを起動する */
  async initialize(config: PhysicsWorld2dConfig): Promise<void> {
    await this.seesawEngine.initialize(config);
    storeWriter.reset();
  }

  /** エンジンを停止してリソースを解放する */
  dispose(): void {
    this.seesawEngine.dispose();
    this.activeBodyIds = [];
  }

  /**
   * ランダムに2体のポケモンを選出してシーソーに配置する
   *
   * 前ラウンドのボディを除去・シーソーをリセットしてから新規選出する。
   */
  async pickPokemons(fetchFn: typeof fetch): Promise<FacadeResult> {
    for (const id of this.activeBodyIds) {
      this.seesawEngine.removePokeBody(id);
    }
    this.activeBodyIds = [];
    this.seesawEngine.resetSeesaw();
    storeWriter.setIsRevealed(false);

    storeWriter.setIsLoading(true);
    try {
      const pokemons = await selectRandomPokemons(this.repository, fetchFn, POKE_COUNT);
      storeWriter.setPokeDataList(pokemons);

      const addPromises = pokemons.map((poke, i) => {
        const id = crypto.randomUUID();
        this.activeBodyIds.push(id);
        const imageUrl = poke.imageUrls.pixel.front ?? poke.imageUrls.artwork.front ?? "";
        return this.seesawEngine.addPokeBody({ id, imageUrl, side: SIDES[i]!, mass: poke.weight });
      });
      await Promise.all(addPromises);
      return { success: true };
    } catch {
      storeWriter.setPokeDataList([]);
      return { success: false, error: "ポケモンをよびだせなかった" };
    } finally {
      storeWriter.setIsLoading(false);
    }
  }

  /** ポケモンボディを動的化してシーソーを動かす */
  reveal(): void {
    this.seesawEngine.release();
    storeWriter.setIsRevealed(true);
  }
}
