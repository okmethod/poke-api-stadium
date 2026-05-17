/**
 * AbstractMatterJsAdapter - matter.js アダプター共通基底クラス
 *
 * @remarks
 * matter.js の dynamic import（遅延読み込み）、Engine/Runner の生成・破棄、
 * 壁ボディ追加、画像輪郭からの凸包抽出、ポリゴンボディ生成を共通化する。
 * 具象クラスは initialize/dispose 内で protected メソッドを呼び出す。
 *
 * @architecture レイヤー間依存ルール - インフラ層 (Adapter)
 * - ROLE: matter.js アダプター群の共通基盤
 * - ALLOWED: ドメイン層モデルへの依存、アプリ層の共通基底 Port（I2dPhysicsEngine）への依存
 * - FORBIDDEN: 個別ゲーム Port（IBilliardPhysicsEngine 等）、プレゼン層への依存
 */

import type { PhysicsBody2dState, PhysicsWorld2dConfig, Point2d } from "$lib/domain/models/2dPhysics";
import { WALL_BODY_CATEGORY } from "$lib/application/ports/I2dPhysicsEngine";
import type * as MatterType from "matter-js";
import { extractNormalizedVertices } from "./imageVertexExtractor";

/** 壁ボディの厚さ */
export const WALL_THICKNESS = 100;
/** 輪郭ポリゴンの当たり判定縮小率 */
export const COLLISION_SCALE = 0.6;

/** matter.js アダプター共通基底クラス */
export abstract class AbstractMatterJsAdapter {
  // Promiseをキャッシュすることで、複数インスタンスが同時に initialize() しても1回だけロードされる
  private static matterImport: Promise<typeof MatterType> | null = null;

  protected M!: typeof MatterType;
  protected engine!: MatterType.Engine;
  protected runner!: MatterType.Runner;

  /** matter.js のインポートから Engine/Runner 起動まで行う */
  protected async initializeMatterJs(
    config: PhysicsWorld2dConfig,
    engineOptions: MatterType.IEngineDefinition = {},
  ): Promise<void> {
    AbstractMatterJsAdapter.matterImport ??= import("matter-js");
    this.M = await AbstractMatterJsAdapter.matterImport;
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

  /** matter.js Body から PhysicsBody2dState を生成する */
  protected toBodyState(
    id: string,
    body: MatterType.Body,
    imageUrl: string | undefined,
    renderWidth: number,
    renderHeight: number,
    category = WALL_BODY_CATEGORY,
  ): PhysicsBody2dState {
    return {
      id,
      imageUrl,
      category,
      position: { x: body.position.x, y: body.position.y },
      angle: body.angle,
      renderWidth,
      renderHeight,
    };
  }

  /**
   * 画像輪郭から COLLISION_SCALE 適用済みの凸包頂点列を生成する
   *
   * release() などの同期コンテキストでボディを再生成する場合は、
   * 戻り値をキャッシュして buildBodyFromHull() に渡す。
   */
  protected async extractHull(imageUrl: string, visualRadius: number): Promise<Point2d[] | null> {
    const normalizedVerts = await extractNormalizedVertices(imageUrl, visualRadius);
    if (!normalizedVerts || normalizedVerts.length < 3) {
      console.warn("[Physics] vertex extraction failed, fallback to circle", imageUrl);
      return null;
    }
    return this.M.Vertices.hull(normalizedVerts as unknown as MatterType.Vertex[]).map((v) => ({
      x: v.x * COLLISION_SCALE,
      y: v.y * COLLISION_SCALE,
    }));
  }

  /**
   * 凸包頂点からポリゴンボディを生成する（同期・hull が null なら円フォールバック）
   *
   * Bodies.fromVertices() は isConvex() の浮動小数点誤差で誤判定するため
   * Body.create({ vertices }) で直接生成して poly-decomp 警告を回避する。
   */
  protected buildBodyFromHull(
    hull: Point2d[] | null,
    id: string,
    position: Point2d,
    visualRadius: number,
    extraOptions: MatterType.IChamferableBodyDefinition = {},
  ): MatterType.Body {
    const opts = { label: id, ...extraOptions };
    if (hull) {
      try {
        const body = this.M.Body.create({ ...opts, vertices: hull, position });
        console.debug(`[Physics] polygon body: ${hull.length} verts`, id);
        return body;
      } catch (e) {
        console.warn("[Physics] polygon body failed, fallback to circle", id, e);
      }
    }
    return this.M.Bodies.circle(position.x, position.y, visualRadius * COLLISION_SCALE, opts);
  }

  /** 画像輪郭から非同期にポリゴンボディを生成する（extractHull + buildBodyFromHull の合成） */
  protected async buildBodyFromImage(
    id: string,
    imageUrl: string,
    visualRadius: number,
    position: Point2d,
    extraOptions: MatterType.IChamferableBodyDefinition = {},
  ): Promise<MatterType.Body> {
    const hull = await this.extractHull(imageUrl, visualRadius);
    return this.buildBodyFromHull(hull, id, position, visualRadius, extraOptions);
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
