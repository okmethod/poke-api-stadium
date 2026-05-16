/**
 * ポケモンゲットビリヤードの全操作コマンドの唯一の入り口
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Facade)
 * - ROLE: ゲーム進行制御、プレゼン層へのゲーム操作手段の提供
 * - ALLOWED: ドメイン層への依存、アプリ層ストアへの依存、アプリ層 Port への依存
 * - FORBIDDEN: インフラ層への直接依存、プレゼン層への依存
 */

import type { IPokeRepository } from "$lib/application/ports/IPokeRepository";
import type { FacadeResult } from "$lib/application/usecases/facadeTypes";
import type { PokeData } from "$lib/domain/models/PokeData";
import type { Point2d } from "$lib/domain/models/2dPhysics";
import { selectRandomPokemon } from "$lib/application/utils/pokeSelectionUtils";
import { storeWriter, type BilliardObstacle, type BilliardPhase, type BilliardPokemon } from "./store";

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

// --- 物理パラメーター ---
const FRICTION = 0.998;
const RESTITUTION = 0.92;
const SPEED_MULTIPLIER = 0.4;
const MAX_SPEED = 20;
const MIN_LAUNCH_DIST = 15;
const AIM_START_RADIUS = 50;
// 速度が低すぎる状態が SLOW_TICK_THRESHOLD フレーム続いたら missed にする
const SLOW_TICK_THRESHOLD = 120;
const MIN_SPEED_THRESHOLD = 0.3;

// --- コース生成パラメーター ---
const OBSTACLE_COUNT = 8;
const OBS_MARGIN = 40;
// 長辺・短辺（縦長/横長をランダムに決定）
const OBS_LONG_MIN = 40;
const OBS_LONG_MAX = 80;
const OBS_SHORT_MIN = 12;
const OBS_SHORT_MAX = 24;
// 障害物は全域に分布
const OBSTACLE_ZONE_TOP = 40;
const OBSTACLE_ZONE_BOTTOM = 450;
// ポケモンは奥（上部）の障害物の間に分散
const POKEMON_ZONE_TOP = 50;
const POKEMON_ZONE_BOTTOM = 280;

/** ポケモンゲットビリヤードのゲーム操作を提供する Facade */
export class CaptureBilliardFacade {
  private phase: BilliardPhase = "waiting";
  private ballX: number = BALL_X0;
  private ballY: number = BALL_Y0;
  private ballVX: number = 0;
  private ballVY: number = 0;
  private slowTickCount = 0;
  private currentPokemons: BilliardPokemon[] = [];
  private currentObstacles: BilliardObstacle[] = [];
  private ballsRemaining = 0;
  private caughtPokemonsData: PokeData[] = [];

  constructor(private readonly repository: IPokeRepository) {}

  /**
   * ラウンドを開始する
   *
   * ポケモンを POKEMON_COUNT 体ランダムに選出し、コースを生成してゲームを待機状態にする。
   */
  async startRound(fetchFn: typeof fetch): Promise<FacadeResult> {
    this.resetBallState();
    storeWriter.reset();
    storeWriter.setIsLoading(true);

    try {
      const pokemonsData = await Promise.all(
        Array.from({ length: POKEMON_COUNT }, () => selectRandomPokemon(this.repository, fetchFn)),
      );

      this.ballsRemaining = BALL_COUNT;
      this.caughtPokemonsData = [];

      const course = this.generateCourse(pokemonsData);
      this.currentPokemons = course.pokemons;
      this.currentObstacles = course.obstacles;

      // ボール位置を先にセットしてからポケモンをセット（canvas 表示タイミング制御）
      storeWriter.setBallPosition({ x: BALL_X0, y: BALL_Y0 });
      storeWriter.setPokemons(course.pokemons);
      storeWriter.setObstacles(course.obstacles);
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

  /**
   * エイムを開始する
   *
   * ボールの近くをタップした場合のみ有効。
   */
  startAim(point: Point2d): void {
    if (this.phase !== "waiting") return;
    const dx = point.x - this.ballX;
    const dy = point.y - this.ballY;
    if (Math.sqrt(dx * dx + dy * dy) > AIM_START_RADIUS) return;

    this.phase = "aiming";
    storeWriter.setPhase("aiming");
    storeWriter.setAimOrigin({ x: this.ballX, y: this.ballY });
    storeWriter.setAimTarget(point);
  }

  /** エイム方向を更新する */
  updateAim(point: Point2d): void {
    if (this.phase !== "aiming") return;
    storeWriter.setAimTarget(point);
  }

  /**
   * ボールを発射する
   *
   * ドラッグ方向の逆向きにボールを飛ばす（スリングショット方式）。
   */
  launch(point: Point2d): void {
    if (this.phase !== "aiming") return;

    storeWriter.setAimOrigin(null);
    storeWriter.setAimTarget(null);

    const dx = this.ballX - point.x;
    const dy = this.ballY - point.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < MIN_LAUNCH_DIST) {
      this.phase = "waiting";
      storeWriter.setPhase("waiting");
      return;
    }

    const speed = Math.min(dist * SPEED_MULTIPLIER, MAX_SPEED);
    this.ballVX = (dx / dist) * speed;
    this.ballVY = (dy / dist) * speed;
    this.slowTickCount = 0;
    this.phase = "flying";
    storeWriter.setPhase("flying");
  }

  /** 物理演算を1ステップ進める（requestAnimationFrame から毎フレーム呼ぶ） */
  tick(): void {
    if (this.phase !== "flying") return;

    this.ballX += this.ballVX;
    this.ballY += this.ballVY;
    this.ballVX *= FRICTION;
    this.ballVY *= FRICTION;

    this.resolveWalls();
    this.resolveObstacles();

    if (this.resolvePokemons()) return;

    const speed = Math.sqrt(this.ballVX * this.ballVX + this.ballVY * this.ballVY);
    if (speed < MIN_SPEED_THRESHOLD) {
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

    storeWriter.setBallPosition({ x: this.ballX, y: this.ballY });
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
    this.resetBallState();
    storeWriter.setBallPosition({ x: BALL_X0, y: BALL_Y0 });
    storeWriter.setAimOrigin(null);
    storeWriter.setAimTarget(null);
    this.phase = "waiting";
    storeWriter.setPhase("waiting");
  }

  // --- private ---

  private resetBallState(): void {
    this.ballX = BALL_X0;
    this.ballY = BALL_Y0;
    this.ballVX = 0;
    this.ballVY = 0;
    this.slowTickCount = 0;
  }

  /** ポケモンとの衝突判定。衝突した場合は caught 状態に更新して true を返す */
  private resolvePokemons(): boolean {
    for (let i = 0; i < this.currentPokemons.length; i++) {
      const p = this.currentPokemons[i];
      if (p === undefined || p.caught) continue;
      const dx = this.ballX - p.x;
      const dy = this.ballY - p.y;
      if (Math.sqrt(dx * dx + dy * dy) >= BALL_R + POKE_R) continue;

      const updated = this.currentPokemons.map<BilliardPokemon>((pokemon, j) =>
        j === i ? { pokeData: pokemon.pokeData, x: pokemon.x, y: pokemon.y, caught: true } : pokemon,
      );
      this.currentPokemons = updated;
      this.caughtPokemonsData = [...this.caughtPokemonsData, p.pokeData];
      this.ballsRemaining--;

      storeWriter.setPokemons(updated);
      storeWriter.setCaughtPokemons(this.caughtPokemonsData);
      storeWriter.setBallsRemaining(this.ballsRemaining);
      storeWriter.setBallPosition({ x: this.ballX, y: this.ballY });

      this.phase = "caught";
      storeWriter.setPhase("caught");
      return true;
    }
    return false;
  }

  private resolveWalls(): void {
    if (this.ballX - BALL_R < 0) {
      this.ballX = BALL_R;
      this.ballVX = Math.abs(this.ballVX) * RESTITUTION;
    } else if (this.ballX + BALL_R > W) {
      this.ballX = W - BALL_R;
      this.ballVX = -Math.abs(this.ballVX) * RESTITUTION;
    }
    if (this.ballY - BALL_R < 0) {
      this.ballY = BALL_R;
      this.ballVY = Math.abs(this.ballVY) * RESTITUTION;
    } else if (this.ballY + BALL_R > H) {
      this.ballY = H - BALL_R;
      this.ballVY = -Math.abs(this.ballVY) * RESTITUTION;
    }
  }

  /** 障害物との衝突: AABB vs 円の最近接点から押し出しと反射を計算する */
  private resolveObstacles(): void {
    for (const obs of this.currentObstacles) {
      const closestX = Math.max(obs.x, Math.min(this.ballX, obs.x + obs.width));
      const closestY = Math.max(obs.y, Math.min(this.ballY, obs.y + obs.height));
      const dx = this.ballX - closestX;
      const dy = this.ballY - closestY;
      const distSq = dx * dx + dy * dy;
      if (distSq >= BALL_R * BALL_R) continue;

      const dist = Math.sqrt(distSq) || 1;
      const nx = dx / dist;
      const ny = dy / dist;
      this.ballX += nx * (BALL_R - dist);
      this.ballY += ny * (BALL_R - dist);
      const dot = this.ballVX * nx + this.ballVY * ny;
      this.ballVX = (this.ballVX - 2 * dot * nx) * RESTITUTION;
      this.ballVY = (this.ballVY - 2 * dot * ny) * RESTITUTION;
    }
  }

  private generateCourse(pokemonsData: PokeData[]): { pokemons: BilliardPokemon[]; obstacles: BilliardObstacle[] } {
    // 障害物を先に全域生成し、その後ポケモンを隙間に配置する
    const obstacles: BilliardObstacle[] = [];

    // 中段に中央障害物を1つ置いて直線突破を防ぐ
    const centerObs = this.tryPlaceObstacle(W / 2 - 60, W / 2 + 60 - OBS_LONG_MIN, 180, 300, [], obstacles);
    if (centerObs) obstacles.push(centerObs);

    // ランダム障害物（全域に分散配置）
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

    // ポケモンは横を等分し、全域から障害物の隙間に配置
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
        // グリッド探索（障害物チェックあり）
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
        // 最終フォールバック（重複許容）
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
    existing: BilliardObstacle[],
  ): BilliardObstacle | null {
    for (let i = 0; i < 25; i++) {
      const long = OBS_LONG_MIN + Math.random() * (OBS_LONG_MAX - OBS_LONG_MIN);
      const short = OBS_SHORT_MIN + Math.random() * (OBS_SHORT_MAX - OBS_SHORT_MIN);
      // 50% で横長、50% で縦長
      const [w, h] = Math.random() < 0.5 ? [long, short] : [short, long];
      const x = xMin + Math.random() * Math.max(0, xMax - xMin);
      const y = yMin + Math.random() * Math.max(0, yMax - yMin);
      const obs: BilliardObstacle = { x, y, width: w, height: h };

      if (this.obsOverlapsBall(obs)) continue;
      if (pokemons.some((p) => this.obsOverlapsPokemon(obs, p.x, p.y))) continue;
      if (existing.some((e) => this.obsOverlapsObs(e, obs))) continue;

      return obs;
    }
    return null;
  }

  private obsOverlapsBall(obs: BilliardObstacle): boolean {
    const M = BALL_R + 30;
    return (
      BALL_X0 + M > obs.x && BALL_X0 - M < obs.x + obs.width && BALL_Y0 + M > obs.y && BALL_Y0 - M < obs.y + obs.height
    );
  }

  private obsOverlapsPokemon(obs: BilliardObstacle, px: number, py: number): boolean {
    const M = POKE_R + 30;
    return px + M > obs.x && px - M < obs.x + obs.width && py + M > obs.y && py - M < obs.y + obs.height;
  }

  private obsOverlapsObs(a: BilliardObstacle, b: BilliardObstacle): boolean {
    const GAP = 20;
    return (
      a.x - GAP < b.x + b.width && a.x + a.width + GAP > b.x && a.y - GAP < b.y + b.height && a.y + a.height + GAP > b.y
    );
  }
}
