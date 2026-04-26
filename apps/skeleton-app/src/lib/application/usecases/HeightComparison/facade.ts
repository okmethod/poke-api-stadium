/**
 * たかさくらべの全操作コマンドの唯一の入り口
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Facade)
 * - ROLE: ゲーム進行制御、プレゼン層へのゲーム操作手段の提供
 * - ALLOWED: ドメイン層への依存、アプリ層ストアへの依存、アプリ層 Port への依存
 * - FORBIDDEN: インフラ層への直接依存、プレゼン層への依存
 */

import type { I2dPhysicsEngine } from "$lib/application/ports/I2dPhysicsEngine";
import type { IPokeRepository } from "$lib/application/ports/IPokeRepository";
import type { FacadeResult } from "$lib/application/usecases/facadeTypes";
import type { PhysicsWorld2dConfig } from "$lib/domain/models/2dPhysics";
import { selectRandomPokemons } from "$lib/application/utils/pokeSelectionUtils";
import { withLoadingGuard } from "$lib/application/usecases/usecaseUtils";
import { storeWriter } from "./store";
import type { PokeData } from "$lib/domain/models/PokeData";

const SPAWN_Y = 50;

// 1.0m = 40px として実寸比をそのままスケールする（大きすぎるポケモンはキャンバスをはみ出す）
const BASE_RADIUS_PER_METER = 40;

/** たかさくらべのゲーム操作を提供する Facade */
export class HeightComparisonFacade {
  private worldConfig: PhysicsWorld2dConfig | null = null;
  /** reveal 済みボディのID（次の pick 時に削除する） */
  private activeBodyIds: string[] = [];

  constructor(
    private readonly physics: I2dPhysicsEngine,
    private readonly repository: IPokeRepository,
  ) {}

  /** ワールドを初期化してエンジンを起動する */
  async initialize(config: PhysicsWorld2dConfig): Promise<void> {
    this.worldConfig = config;
    await this.physics.initialize(config);
    storeWriter.reset();
  }

  /** エンジンを停止してリソースを解放する */
  dispose(): void {
    this.physics.dispose();
    this.activeBodyIds = [];
  }

  /**
   * ランダムにポケモンを選出してストアを更新する
   *
   * 前ラウンドで追加した物理ボディを先に除去してから新規選出する。
   */
  async pickPokemons(fetchFn: typeof fetch, count: number): Promise<FacadeResult> {
    // 前ラウンドのボディを除去
    for (const id of this.activeBodyIds) {
      this.physics.removeBody(id);
    }
    this.activeBodyIds = [];
    storeWriter.setIsRevealed(false);
    storeWriter.setResult(null);

    return withLoadingGuard(
      () => selectRandomPokemons(this.repository, fetchFn, count),
      (v) => storeWriter.setIsLoading(v),
      (pokemons) => storeWriter.setPokeDataList(pokemons),
      () => storeWriter.setPokeDataList([]),
    );
  }

  /**
   * dnd で並べ替えた順に物理ボディを配置し、各位置の正誤を判定する
   *
   * orderedPokeData は左→右の順（1ばんめ→N ばんめ）で渡す。
   * 高さ降順の正解と比較して各位置の結果を storeWriter へ書き込む。
   */
  async reveal(orderedPokeData: PokeData[]): Promise<FacadeResult> {
    if (!this.worldConfig || orderedPokeData.length === 0) {
      return { success: false, error: "ポケモンが選出されていない" };
    }

    // 高さ降順の正解と比較（同値は正解扱い）
    const sorted = [...orderedPokeData].sort((a, b) => b.height - a.height);
    const isCorrect = orderedPokeData.every((poke, i) => poke.height === sorted[i]!.height);
    storeWriter.setResult(isCorrect ? "せいかい！" : "ざんねん...");
    storeWriter.setIsRevealed(true);

    // dnd の並び順で物理ボディを配置
    const addBodyPromises: Promise<void>[] = [];
    for (let i = 0; i < orderedPokeData.length; i++) {
      const poke = orderedPokeData[i]!;
      const radius = poke.height * BASE_RADIUS_PER_METER;
      const id = crypto.randomUUID();
      const spawnX = (i + 0.5) * (this.worldConfig.width / orderedPokeData.length);
      const imageUrl = poke.imageUrls.pixel.front ?? poke.imageUrls.artwork.front ?? "";

      this.activeBodyIds.push(id);
      addBodyPromises.push(
        this.physics.addBody({ id, imageUrl, category: 1, spawnPoint: { x: spawnX, y: SPAWN_Y }, radius }),
      );
    }

    try {
      await Promise.all(addBodyPromises);
      return { success: true };
    } catch {
      return { success: false, error: "ポケモンをひょうじできなかった" };
    }
  }
}
