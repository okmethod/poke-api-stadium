/**
 * ポケモンゲットビリヤードの全操作コマンドの唯一の入り口
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Facade)
 * - ROLE: ゲーム進行制御、プレゼン層へのゲーム操作手段の提供
 * - ALLOWED: ドメイン層への依存、アプリ層ストアへの依存、アプリ層 Port への依存
 * - FORBIDDEN: インフラ層への直接依存、プレゼン層への依存
 */

import type { IPokeRepository } from "$lib/application/ports/IPokeRepository";
import type { IBilliardPhysicsEngine } from "$lib/application/ports/IBilliardPhysicsEngine";
import type {
  IBilliardGameEngine,
  BilliardCanvasState,
  BilliardCanvasPokemon,
  BilliardCanvasObstacle,
  BilliardPhase,
} from "$lib/application/ports/IBilliardPhysicsEngine";
import type { FacadeResult } from "$lib/application/usecases/facadeTypes";
import type { PokeData } from "$lib/domain/models/PokeData";
import type { Point2d } from "$lib/domain/models/2dPhysics";
import { selectRandomPokemon } from "$lib/application/utils/pokeSelectionUtils";
import { storeWriter, type BilliardPokemon } from "./store";

/** プレゼン層からも参照するゲーム固有の寸法定数 */
export const GAME_CONFIG = {
  canvasWidth: 380,
  canvasHeight: 520,
  ballRadius: 16,
  pokemonRadius: 24,
  ballStartX: 190,
  ballStartY: 470,
  ballCount: 6,
  pokemonCount: 3,
  ballSpriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/safari-ball.png",
} as const;

const {
  canvasWidth: W,
  canvasHeight: H,
  ballRadius: BALL_R,
  pokemonRadius: POKE_R,
  ballStartX: BALL_X0,
  ballStartY: BALL_Y0,
  ballCount: BALL_COUNT,
  pokemonCount: POKEMON_COUNT,
} = GAME_CONFIG;

// --- 発射パラメーター ---
const SPEED_MULTIPLIER = 0.4;
const MAX_SPEED = 20;
const MIN_LAUNCH_DIST = 15;
const AIM_START_RADIUS = 50;

// --- 停止判定パラメーター ---
const SLOW_TICK_THRESHOLD = 120;
const MIN_SPEED_THRESHOLD = 0.3;

// --- コース生成パラメーター ---
const OBSTACLE_COUNT = 8;
const OBS_MARGIN = 40;
const OBS_LONG_MIN = 40;
const OBS_LONG_MAX = 80;
const OBS_SHORT_MIN = 12;
const OBS_SHORT_MAX = 24;
const OBSTACLE_ZONE_TOP = 40;
const OBSTACLE_ZONE_BOTTOM = 450;
const POKEMON_ZONE_TOP = 50;
const POKEMON_ZONE_BOTTOM = 280;

/** ポケモンゲットビリヤードのゲーム操作を提供する Facade */
export class CaptureBilliardFacade implements IBilliardGameEngine {
  private phase: BilliardPhase = "waiting";
  private slowTickCount = 0;
  private currentPokemons: BilliardPokemon[] = [];
  private currentObstacles: BilliardCanvasObstacle[] = [];
  private aimOriginState: Point2d | null = null;
  private aimTargetState: Point2d | null = null;
  private ballsRemaining = 0;
  private caughtPokemonsData: PokeData[] = [];
  private engineInitialized = false;
  private unsubscribePokemonHit: (() => void) | null = null;

  constructor(
    private readonly repository: IPokeRepository,
    private readonly engine: IBilliardPhysicsEngine,
  ) {}

  /**
   * ラウンドを開始する
   *
   * ポケモンを POKEMON_COUNT 体ランダムに選出し、コースを生成してゲームを待機状態にする。
   */
  async startRound(fetchFn: typeof fetch): Promise<FacadeResult> {
    storeWriter.reset();
    storeWriter.setIsLoading(true);

    // 前回のポケモン命中ハンドラを解除
    this.unsubscribePokemonHit?.();
    this.unsubscribePokemonHit = null;

    try {
      // エンジンは初回のみ初期化（ラウンドをまたいで使い回す）
      if (!this.engineInitialized) {
        await this.engine.initialize({
          width: W,
          height: H,
          ballRadius: BALL_R,
          ballStartPosition: { x: BALL_X0, y: BALL_Y0 },
        });
        this.engineInitialized = true;
      } else {
        this.engine.resetBall();
      }

      const pokemonsData = await Promise.all(
        Array.from({ length: POKEMON_COUNT }, () => selectRandomPokemon(this.repository, fetchFn)),
      );

      this.ballsRemaining = BALL_COUNT;
      this.caughtPokemonsData = [];

      const course = this.generateCourse(pokemonsData);
      this.currentPokemons = course.pokemons;
      this.currentObstacles = course.obstacles;
      this.aimOriginState = null;
      this.aimTargetState = null;

      // コース障害物・ポケモンをエンジンにセット
      this.engine.setupCourse(
        course.obstacles.map((obs, i) => ({ id: `obs_${i}`, ...obs })),
        course.pokemons.map((p) => ({ id: String(p.pokeData.pokeId), x: p.x, y: p.y, radius: POKE_R })),
      );

      // ポケモン命中ハンドラを登録
      this.unsubscribePokemonHit = this.engine.onPokemonHit((id) => this.handlePokemonHit(id));

      storeWriter.setPokemons(course.pokemons);
      storeWriter.setBallsRemaining(BALL_COUNT);
      storeWriter.setCaughtPokemons([]);

      this.phase = "waiting";
      storeWriter.setPhase("waiting");

      return { success: true };
    } catch (e) {
      this.phase = "waiting";
      storeWriter.setPhase("waiting");
      return { success: false, error: e instanceof Error ? e.message : String(e) };
    } finally {
      storeWriter.setIsLoading(false);
    }
  }

  /** キャンバス描画に必要な全状態を返す（毎フレーム呼ばれる） */
  getState(): BilliardCanvasState {
    const ballState = this.engine.getBallState();
    return {
      phase: this.phase,
      ballPosition: ballState.position,
      ballAngle: ballState.angle,
      ballSpriteUrl: GAME_CONFIG.ballSpriteUrl,
      pokemons: this.currentPokemons.map(
        (p): BilliardCanvasPokemon => ({
          imageUrl: p.pokeData.imageUrls.artwork.front ?? p.pokeData.imageUrls.pixel.front ?? "",
          x: p.x,
          y: p.y,
          radius: POKE_R,
          caught: p.caught,
        }),
      ),
      obstacles: this.currentObstacles,
      aimOrigin: this.aimOriginState,
      aimTarget: this.aimTargetState,
    };
  }

  /** 物理状態を1フレーム分ポーリングする（requestAnimationFrame から毎フレーム呼ぶ） */
  tick(): void {
    if (this.phase !== "flying") return;

    const state = this.engine.getBallState();

    if (state.speed < MIN_SPEED_THRESHOLD) {
      this.slowTickCount++;
      if (this.slowTickCount >= SLOW_TICK_THRESHOLD) {
        this.ballsRemaining--;
        storeWriter.setBallsRemaining(this.ballsRemaining);
        this.phase = "missed";
        storeWriter.setPhase("missed");
      }
    } else {
      this.slowTickCount = 0;
    }
  }

  /**
   * エイムを開始する
   *
   * ボールの近くをタップした場合のみ有効。
   */
  startAim(point: Point2d): void {
    if (this.phase !== "waiting") return;
    const ballState = this.engine.getBallState();
    const dx = point.x - ballState.position.x;
    const dy = point.y - ballState.position.y;
    if (Math.sqrt(dx * dx + dy * dy) > AIM_START_RADIUS) return;

    this.phase = "aiming";
    storeWriter.setPhase("aiming");
    this.aimOriginState = ballState.position;
    this.aimTargetState = point;
  }

  /** エイム方向を更新する */
  updateAim(point: Point2d): void {
    if (this.phase !== "aiming") return;
    this.aimTargetState = point;
  }

  /**
   * ボールを発射する
   *
   * ドラッグ方向の逆向きにボールを飛ばす（スリングショット方式）。
   */
  launch(point: Point2d): void {
    if (this.phase !== "aiming") return;

    this.aimOriginState = null;
    this.aimTargetState = null;

    const ballState = this.engine.getBallState();
    const dx = ballState.position.x - point.x;
    const dy = ballState.position.y - point.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < MIN_LAUNCH_DIST) {
      this.phase = "waiting";
      storeWriter.setPhase("waiting");
      return;
    }

    const speed = Math.min(dist * SPEED_MULTIPLIER, MAX_SPEED);
    this.engine.launch({ x: (dx / dist) * speed, y: (dy / dist) * speed });

    this.slowTickCount = 0;
    this.phase = "flying";
    storeWriter.setPhase("flying");
  }

  /** 転がり中に諦めてボールを消費し missed にする */
  giveUp(): void {
    if (this.phase !== "flying") return;
    this.ballsRemaining--;
    storeWriter.setBallsRemaining(this.ballsRemaining);
    this.phase = "missed";
    storeWriter.setPhase("missed");
  }

  /**
   * 次のボールへ進む
   *
   * ボールが尽きた、またはポケモンが全滅した場合は result フェーズへ遷移する。
   */
  nextBall(): void {
    const activeCount = this.currentPokemons.filter((p) => !p.caught).length;
    if (this.ballsRemaining === 0 || activeCount === 0) {
      this.phase = "result";
      storeWriter.setPhase("result");
      return;
    }
    this.engine.resetBall();
    this.aimOriginState = null;
    this.aimTargetState = null;
    this.slowTickCount = 0;
    this.phase = "waiting";
    storeWriter.setPhase("waiting");
  }

  /** エンジンを停止してリソースを解放する */
  dispose(): void {
    this.unsubscribePokemonHit?.();
    this.engine.dispose();
  }

  // --- private ---

  /** ポケモン命中時の処理（onPokemonHit コールバックから呼ばれる） */
  private handlePokemonHit(id: string): void {
    // matter.js Runner は独立タイマーで動くため、ゲット後もボールが動き続けて別ポケモンに衝突する可能性がある
    if (this.phase !== "flying") return;

    const idx = this.currentPokemons.findIndex((p) => String(p.pokeData.pokeId) === id);
    if (idx === -1) return;

    const pokemon = this.currentPokemons[idx]!;
    const updated = this.currentPokemons.map<BilliardPokemon>((p, j) =>
      j === idx ? { pokeData: p.pokeData, x: p.x, y: p.y, caught: true } : p,
    );
    this.currentPokemons = updated;
    this.caughtPokemonsData = [...this.caughtPokemonsData, pokemon.pokeData];
    this.ballsRemaining--;

    storeWriter.setPokemons(updated);
    storeWriter.setCaughtPokemons(this.caughtPokemonsData);
    storeWriter.setBallsRemaining(this.ballsRemaining);

    this.phase = "caught";
    storeWriter.setPhase("caught");
  }

  private generateCourse(pokemonsData: PokeData[]): {
    pokemons: BilliardPokemon[];
    obstacles: BilliardCanvasObstacle[];
  } {
    const obstacles: BilliardCanvasObstacle[] = [];

    const centerObs = this.tryPlaceObstacle(W / 2 - 60, W / 2 + 60 - OBS_LONG_MIN, 180, 300, [], obstacles);
    if (centerObs) obstacles.push(centerObs);

    for (let i = 0; i < OBSTACLE_COUNT - 1; i++) {
      const obs = this.tryPlaceObstacle(
        OBS_MARGIN,
        W - OBS_MARGIN - OBS_LONG_MIN,
        OBSTACLE_ZONE_TOP,
        OBSTACLE_ZONE_BOTTOM,
        [],
        obstacles,
      );
      if (obs) obstacles.push(obs);
    }

    const sectionW = (W - 2 * OBS_MARGIN) / POKEMON_COUNT;
    const pokemons: BilliardPokemon[] = [];

    for (let i = 0; i < pokemonsData.length; i++) {
      const xMin = OBS_MARGIN + POKE_R + i * sectionW;
      const xMax = OBS_MARGIN + (i + 1) * sectionW - POKE_R;

      const isClear = (x: number, y: number) =>
        !obstacles.some((obs) => this.obsOverlapsPokemon(obs, x, y)) &&
        !pokemons.some((p) => Math.sqrt((p.x - x) ** 2 + (p.y - y) ** 2) < POKE_R * 4);

      let placed = false;
      for (let attempt = 0; attempt < 80; attempt++) {
        const x = xMin + Math.random() * Math.max(0, xMax - xMin);
        const y = POKEMON_ZONE_TOP + POKE_R + Math.random() * (POKEMON_ZONE_BOTTOM - POKEMON_ZONE_TOP - POKE_R * 2);
        if (!isClear(x, y)) continue;
        pokemons.push({ pokeData: pokemonsData[i]!, x, y, caught: false });
        placed = true;
        break;
      }

      if (!placed) {
        outer: for (let gy = POKEMON_ZONE_TOP + POKE_R; gy < POKEMON_ZONE_BOTTOM - POKE_R; gy += 20) {
          for (let gx = xMin; gx < xMax; gx += 20) {
            if (!isClear(gx, gy)) continue;
            pokemons.push({ pokeData: pokemonsData[i]!, x: gx, y: gy, caught: false });
            placed = true;
            break outer;
          }
        }
      }

      if (!placed) {
        pokemons.push({
          pokeData: pokemonsData[i]!,
          x: (xMin + xMax) / 2,
          y: POKEMON_ZONE_TOP + POKE_R,
          caught: false,
        });
      }
    }

    return { pokemons, obstacles };
  }

  private tryPlaceObstacle(
    xMin: number,
    xMax: number,
    yMin: number,
    yMax: number,
    pokemons: BilliardPokemon[],
    existing: BilliardCanvasObstacle[],
  ): BilliardCanvasObstacle | null {
    for (let i = 0; i < 25; i++) {
      const long = OBS_LONG_MIN + Math.random() * (OBS_LONG_MAX - OBS_LONG_MIN);
      const short = OBS_SHORT_MIN + Math.random() * (OBS_SHORT_MAX - OBS_SHORT_MIN);
      const [w, h] = Math.random() < 0.5 ? [long, short] : [short, long];
      const x = xMin + Math.random() * Math.max(0, xMax - xMin);
      const y = yMin + Math.random() * Math.max(0, yMax - yMin);
      const obs: BilliardCanvasObstacle = { x, y, width: w, height: h };

      if (this.obsOverlapsBall(obs)) continue;
      if (pokemons.some((p) => this.obsOverlapsPokemon(obs, p.x, p.y))) continue;
      if (existing.some((e) => this.obsOverlapsObs(e, obs))) continue;

      return obs;
    }
    return null;
  }

  private obsOverlapsBall(obs: BilliardCanvasObstacle): boolean {
    const M = BALL_R + 30;
    return (
      BALL_X0 + M > obs.x && BALL_X0 - M < obs.x + obs.width && BALL_Y0 + M > obs.y && BALL_Y0 - M < obs.y + obs.height
    );
  }

  private obsOverlapsPokemon(obs: BilliardCanvasObstacle, px: number, py: number): boolean {
    const M = POKE_R + 30;
    return px + M > obs.x && px - M < obs.x + obs.width && py + M > obs.y && py - M < obs.y + obs.height;
  }

  private obsOverlapsObs(a: BilliardCanvasObstacle, b: BilliardCanvasObstacle): boolean {
    const GAP = 20;
    return (
      a.x - GAP < b.x + b.width && a.x + a.width + GAP > b.x && a.y - GAP < b.y + b.height && a.y + a.height + GAP > b.y
    );
  }
}
