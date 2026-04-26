/**
 * AbstractMatterJsAdapter - matter.js アダプター共通基底クラス
 *
 * @remarks
 * Engine/Runner の生成・破棄と壁ボディ追加を共通化する。
 * 具象クラスは initialize/dispose 内で protected メソッドを呼び出す。
 *
 * @architecture レイヤー間依存ルール - インフラ層 (Adapter)
 * - ROLE: matter.js アダプター群の共通基盤
 * - ALLOWED: ドメイン層モデルへの依存
 * - FORBIDDEN: アプリ層 Port、プレゼン層への依存
 */

import type { PhysicsWorld2dConfig } from "$lib/domain/models/2dPhysics";
import type * as MatterType from "matter-js";

/** 壁ボディの厚さ */
export const WALL_THICKNESS = 100;
/** 輪郭ポリゴンの当たり判定縮小率 */
export const COLLISION_SCALE = 0.6;

/** matter.js アダプター共通基底クラス */
export abstract class AbstractMatterJsAdapter {
  protected M!: typeof MatterType;
  protected engine!: MatterType.Engine;
  protected runner!: MatterType.Runner;

  /** matter.js のインポートから Engine/Runner 起動まで行う */
  protected async initializeMatterJs(
    config: PhysicsWorld2dConfig,
    engineOptions: MatterType.IEngineDefinition = {},
  ): Promise<void> {
    this.M = await import("matter-js");
    this.engine = this.M.Engine.create(engineOptions);
    this.engine.gravity.y = config.gravity ?? 1;
    this.runner = this.M.Runner.create();
    this.M.Runner.run(this.runner, this.engine);
  }

  /** Engine/Runner を停止してワールドを破棄する */
  protected disposeMatterJs(): void {
    if (!this.M) return;
    this.M.Runner.stop(this.runner);
    this.M.Composite.clear(this.engine.world, false);
    this.M.Engine.clear(this.engine);
  }

  /** ワールド境界の壁ボディを4面追加する */
  protected addWalls(
    width: number,
    height: number,
    extraOptions: Omit<MatterType.IChamferableBodyDefinition, "isStatic"> = {},
  ): void {
    const t = WALL_THICKNESS;
    const opts = { isStatic: true as const, ...extraOptions };
    const walls = [
      this.M.Bodies.rectangle(width / 2, -t / 2, width + t * 2, t, opts), // 上
      this.M.Bodies.rectangle(width / 2, height + t / 2, width + t * 2, t, opts), // 下
      this.M.Bodies.rectangle(-t / 2, height / 2, t, height + t * 2, opts), // 左
      this.M.Bodies.rectangle(width + t / 2, height / 2, t, height + t * 2, opts), // 右
    ];
    this.M.Composite.add(this.engine.world, walls);
  }
}
