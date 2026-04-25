/**
 * PairCollisionDetectionFacade - えあわせゲームの全操作コマンドの唯一の入り口
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Facade)
 * - ROLE: ゲーム進行制御、プレゼン層へのゲーム操作手段の提供
 * - ALLOWED: ドメイン層への依存、アプリ層ストアへの依存、アプリ層 Port への依存
 * - FORBIDDEN: インフラ層への直接依存、プレゼン層への依存（Svelte/DOM/UIライブラリ）
 */

import type { I2dPhysicsEngine } from "$lib/application/ports/I2dPhysicsEngine";
import type { IPokeRepository } from "$lib/application/ports/IPokeRepository";
import type { FacadeResult } from "$lib/application/usecases/facadeTypes";
import type { PhysicsBody2dState, PhysicsWorld2dConfig } from "$lib/domain/models/2dPhysics";
import { resolvedCryUrl } from "$lib/domain/models/PokeData";
import { selectRandomPokemons } from "$lib/application/utils/pokeSelectionUtils";
import { getRandomNumber } from "$lib/shared/utils/randomUtils";
import { pairCollisionDetectionStoreWriter } from "./pairCollisionDetectionStore";

const SPAWN_Y = 50;
// カテゴリ 1 はアダプター内で壁に使用するため、ポケモンは 2 以降を使う
const POKEMON_CATEGORY_OFFSET = 2;

/** えあわせゲームのゲーム操作を提供する Facade */
export class PairCollisionDetectionFacade {
  private worldConfig: PhysicsWorld2dConfig | null = null;
  private removeCollisionListener: (() => void) | null = null;
  /** 衝突処理の二重実行を防ぐために追跡するアクティブボディID */
  private activeBodyIds = new Set<string>();
  /** カテゴリ → 鳴き声URL のマッピング */
  private categoryToCryUrl = new Map<number, string | null>();

  constructor(
    private readonly physics: I2dPhysicsEngine,
    private readonly repository: IPokeRepository,
  ) {}

  /** ワールドを初期化してエンジンを起動する */
  async initialize(config: PhysicsWorld2dConfig): Promise<void> {
    this.worldConfig = config;
    await this.physics.initialize(config);
    this.removeCollisionListener = this.physics.onCollision(this.handleCollision.bind(this));
    pairCollisionDetectionStoreWriter.reset();
  }

  /** エンジンを停止してリソースを解放する */
  dispose(): void {
    this.removeCollisionListener?.();
    this.physics.dispose();
    this.activeBodyIds.clear();
    this.categoryToCryUrl.clear();
  }

  /**
   * ランダムにポケモンを選出してフィールドに召喚する
   *
   * 各ポケモンを 2 体ずつ生成し、同カテゴリを割り当てる。
   */
  async spawnPokemons(fetchFn: typeof fetch, count: number): Promise<FacadeResult> {
    if (!this.worldConfig) return { success: false, error: "エンジンが初期化されていない" };
    try {
      const pokemons = await selectRandomPokemons(this.repository, fetchFn, count);

      pokemons.forEach((poke) => {
        const category = poke.id + POKEMON_CATEGORY_OFFSET;
        this.categoryToCryUrl.set(category, resolvedCryUrl(poke.cryUrls));

        const imageUrl = poke.imageUrls.pixel.front ?? poke.imageUrls.artwork.front;

        // 同カテゴリのボディを 2 体生成
        for (let i = 0; i < 2; i++) {
          const id = crypto.randomUUID();
          const spawnPoint = {
            x: getRandomNumber(this.worldConfig!.width),
            y: SPAWN_Y,
          };
          this.physics.addBody({ id, imageUrl, category, spawnPoint, radius: 32 });
          this.activeBodyIds.add(id);
        }
      });

      pairCollisionDetectionStoreWriter.addActiveBodyCount(pokemons.length * 2);
      return { success: true };
    } catch {
      return { success: false, error: "ポケモンをよびだせなかった" };
    }
  }

  // --- private ---

  private handleCollision(a: PhysicsBody2dState, b: PhysicsBody2dState): void {
    if (a.category !== b.category) return;
    // 両ボディがまだアクティブな場合のみマッチ成立（二重削除防止）
    if (!this.activeBodyIds.has(a.id) || !this.activeBodyIds.has(b.id)) return;

    this.activeBodyIds.delete(a.id);
    this.activeBodyIds.delete(b.id);
    this.physics.removeBody(a.id);
    this.physics.removeBody(b.id);

    pairCollisionDetectionStoreWriter.addMatchedCount(1);
    pairCollisionDetectionStoreWriter.addActiveBodyCount(-2);
    pairCollisionDetectionStoreWriter.setLastMatchCryUrl(this.categoryToCryUrl.get(a.category) ?? null);
  }
}
