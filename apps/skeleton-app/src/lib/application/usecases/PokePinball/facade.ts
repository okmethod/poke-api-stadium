/**
 * PokePinball の全操作コマンドの唯一の入り口
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Facade)
 * - ROLE: ゲーム進行制御、プレゼン層へのゲーム操作手段の提供
 * - ALLOWED: ドメイン層への依存、アプリ層ストアへの依存、アプリ層 Port への依存
 * - FORBIDDEN: インフラ層への直接依存、プレゼン層への依存
 */

import type { Point2d } from "$lib/domain/models/2dPhysics";
import type { IPokeRepository } from "$lib/application/ports/IPokeRepository";
import type { IPinballPhysicsEngine } from "$lib/application/ports/IPinballPhysicsEngine";
import type { FacadeResult } from "$lib/application/usecases/facadeTypes";
import { selectRandomPokemon } from "$lib/application/utils/pokeSelectionUtils";
import { storeWriter, type PinballPhase, type PinballBumper } from "./store";

/** プレゼン層からも参照するゲーム固有の定数 */
export const GAME_CONFIG = {
  canvasWidth: 380,
  canvasHeight: 580,
  ballRadius: 12,
  bumperRadius: 22,
  bumperCount: 5,
  initialLives: 3,
  pointsPerHit: 10,
  ballSpriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
} as const;

/** フリッパー配置定数（キャンバス描画でも参照） */
export const FLIPPER_CONFIG = {
  leftPivot: { x: 95, y: 530 } satisfies Point2d,
  rightPivot: { x: 285, y: 530 } satisfies Point2d,
  length: 90,
  height: 12,
  /** 左フリッパーの静止角（ラジアン） */
  leftRestAngle: 0.45,
  /** 右フリッパーの静止角（ラジアン） */
  rightRestAngle: Math.PI - 0.45,
} as const;

/** テーブル上のバンパー固定位置（5 箇所） */
export const BUMPER_POSITIONS: readonly Point2d[] = [
  { x: 130, y: 180 },
  { x: 250, y: 180 },
  { x: 190, y: 270 },
  { x: 120, y: 360 },
  { x: 260, y: 360 },
];

// 右レーン上部からスタート
const BALL_START: Point2d = { x: 340, y: 200 };

/** PokePinball のゲーム操作を提供する Facade */
export class PokePinballFacade {
  private phase: PinballPhase = "idle";
  private score = 0;
  private lives = 0;
  private engineInitialized = false;
  private unsubscribeBumperHit: (() => void) | null = null;

  constructor(
    private readonly repository: IPokeRepository,
    private readonly engine: IPinballPhysicsEngine,
  ) {}

  /**
   * ゲームを開始する
   *
   * ポケモンを BUMPER_COUNT 体ランダムに選出し、バンパーとして配置する。
   * エンジンは初回のみ初期化し、以降はリセットして再利用する。
   */
  async startGame(fetchFn: typeof fetch): Promise<FacadeResult> {
    storeWriter.reset();
    storeWriter.setIsLoading(true);

    this.unsubscribeBumperHit?.();
    this.unsubscribeBumperHit = null;

    try {
      if (!this.engineInitialized) {
        await this.engine.initialize({
          width: GAME_CONFIG.canvasWidth,
          height: GAME_CONFIG.canvasHeight,
          ballRadius: GAME_CONFIG.ballRadius,
          ballStartPosition: BALL_START,
        });
        this.engineInitialized = true;
      } else {
        this.engine.reset();
      }

      const pokemonsData = await Promise.all(
        Array.from({ length: GAME_CONFIG.bumperCount }, () => selectRandomPokemon(this.repository, fetchFn)),
      );

      const bumperList: PinballBumper[] = pokemonsData.map((poke, i) => ({
        id: String(poke.pokeId),
        pokeData: poke,
        tablePosition: BUMPER_POSITIONS[i]!,
      }));

      this.engine.setupBumpers(
        bumperList.map((b) => ({
          id: b.id,
          position: b.tablePosition,
          radius: GAME_CONFIG.bumperRadius,
          imageUrl: b.pokeData.imageUrls.pixel.front ?? "",
        })),
      );

      this.unsubscribeBumperHit = this.engine.onBumperHit((id) => this.handleBumperHit(id));

      this.score = 0;
      this.lives = GAME_CONFIG.initialLives;
      this.phase = "playing";

      storeWriter.setBumpers(bumperList);
      storeWriter.setScore(0);
      storeWriter.setLivesRemaining(this.lives);
      storeWriter.setPhase("playing");

      return { success: true };
    } catch (e) {
      return { success: false, error: e instanceof Error ? e.message : String(e) };
    } finally {
      storeWriter.setIsLoading(false);
    }
  }

  /** 物理状態を1フレーム分ポーリングする（requestAnimationFrame から毎フレーム呼ぶ） */
  tick(): void {
    if (this.phase !== "playing") return;

    const state = this.engine.getState();
    if (!state.isBallLost) return;

    this.lives--;
    storeWriter.setLivesRemaining(this.lives);

    if (this.lives <= 0) {
      this.phase = "gameover";
      storeWriter.setPhase("gameover");
    } else {
      this.phase = "lost";
      storeWriter.setPhase("lost");
    }
  }

  /** 次のボールへ進む（lost フェーズから呼ぶ） */
  nextBall(): void {
    if (this.phase !== "lost") return;
    this.engine.reset();
    this.phase = "playing";
    storeWriter.setPhase("playing");
  }

  /** ボールを発射する */
  launch(): void {
    if (this.phase !== "playing") return;
    this.engine.launchBall();
  }

  /** 左フリッパーのアクティブ状態を設定する */
  flipLeft(active: boolean): void {
    this.engine.setFlipperLeft(active);
  }

  /** 右フリッパーのアクティブ状態を設定する */
  flipRight(active: boolean): void {
    this.engine.setFlipperRight(active);
  }

  /** エンジンを停止してリソースを解放する */
  dispose(): void {
    this.unsubscribeBumperHit?.();
    this.engine.dispose();
  }

  // --- private ---

  private handleBumperHit(_id: string): void {
    this.score += GAME_CONFIG.pointsPerHit;
    storeWriter.setScore(this.score);
  }
}
