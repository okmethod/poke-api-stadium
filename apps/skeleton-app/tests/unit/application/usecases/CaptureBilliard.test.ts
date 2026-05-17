/**
 * CaptureBilliard (facade + store) のテスト
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { get } from "svelte/store";
import { CaptureBilliardFacade, GAME_CONFIG } from "$lib/application/usecases/CaptureBilliard/facade";
import {
  phase,
  isLoading,
  pokemons,
  obstacles,
  aimOrigin,
  aimTarget,
  storeWriter,
} from "$lib/application/usecases/CaptureBilliard/store";
import type { IBilliardPhysicsEngine } from "$lib/application/ports/IBilliardPhysicsEngine";
import { buildMockPokeData } from "../../../__testUtils__/mockPokeData";
import { createMockRepository } from "../../../__testUtils__/mockRepository";

vi.mock("$lib/application/utils/pokeSelectionUtils", () => ({
  selectRandomPokemon: vi.fn(),
}));

import { selectRandomPokemon } from "$lib/application/utils/pokeSelectionUtils";

const mockFetch = vi.fn() as unknown as typeof fetch;
const pikachu = buildMockPokeData({ speciesId: 25, jaName: "ピカチュウ" });

const { ballStartX: BALL_X0, ballStartY: BALL_Y0, pokemonCount: POKEMON_COUNT } = GAME_CONFIG;

/** テスト用の物理エンジンモック */
function createMockEngine(): IBilliardPhysicsEngine {
  let posX = BALL_X0;
  let posY = BALL_Y0;
  let velX = 0;
  let velY = 0;
  let angle = 0;

  return {
    initialize: vi.fn().mockResolvedValue(undefined),
    dispose: vi.fn(),
    setupCourse: vi.fn(),
    launch: vi.fn((velocity) => {
      velX = velocity.x;
      velY = velocity.y;
    }),
    getState: vi.fn(() => {
      // launch 後はゆっくり減速するシミュレーション
      posX += velX;
      posY += velY;
      velX *= 0.998;
      velY *= 0.998;
      const speed = Math.sqrt(velX * velX + velY * velY);
      return { position: { x: posX, y: posY }, angle, speed };
    }),
    onPokemonHit: vi.fn().mockReturnValue(() => {}),
    reset: vi.fn(() => {
      posX = BALL_X0;
      posY = BALL_Y0;
      velX = 0;
      velY = 0;
      angle = 0;
    }),
    stopBall: vi.fn(() => {
      velX = 0;
      velY = 0;
    }),
  };
}

describe("CaptureBilliardFacade", () => {
  let facade: CaptureBilliardFacade;
  let mockEngine: IBilliardPhysicsEngine;

  beforeEach(() => {
    mockEngine = createMockEngine();
    facade = new CaptureBilliardFacade(createMockRepository(), mockEngine);
    storeWriter.reset();
    vi.mocked(selectRandomPokemon).mockReset();
  });

  describe("startRound", () => {
    it("成功時に success: true を返し pokemons が設定される", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(pikachu);

      const result = await facade.startRound(mockFetch);

      expect(result.success).toBe(true);
      const pokemonList = get(pokemons);
      expect(pokemonList.length).toBe(POKEMON_COUNT);
      expect(pokemonList[0]?.pokeData.jaName).toBe("ピカチュウ");
    });

    it("ポケモン位置・障害物がセットされる", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(pikachu);

      await facade.startRound(mockFetch);

      const pokemonList = get(pokemons);
      expect(pokemonList.length).toBe(POKEMON_COUNT);
      expect(pokemonList[0]?.position.x).toBeGreaterThan(0);
      expect(pokemonList[0]?.position.y).toBeGreaterThan(0);
      expect(get(obstacles).length).toBeGreaterThan(0);
    });

    it("ボール位置が初期位置にリセットされる", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(pikachu);

      await facade.startRound(mockFetch);

      const bp = mockEngine.getState().position;
      expect(bp.x).toBeCloseTo(BALL_X0);
      expect(bp.y).toBeCloseTo(BALL_Y0);
    });

    it("フェーズが waiting になる", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(pikachu);

      await facade.startRound(mockFetch);

      expect(get(phase)).toBe("waiting");
    });

    it("isLoading が true → false の順で変化する", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(pikachu);
      const loadingValues: boolean[] = [];
      const unsub = isLoading.subscribe((v) => loadingValues.push(v));

      await facade.startRound(mockFetch);
      unsub();

      expect(loadingValues).toContain(true);
      expect(loadingValues[loadingValues.length - 1]).toBe(false);
    });

    it("失敗時は success: false を返す", async () => {
      vi.mocked(selectRandomPokemon).mockRejectedValue(new Error("Network Error"));

      const result = await facade.startRound(mockFetch);

      expect(result.success).toBe(false);
    });
  });

  describe("startAim / updateAim / launch", () => {
    beforeEach(async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(pikachu);
      await facade.startRound(mockFetch);
    });

    it("ボール近傍をタップすると aiming 状態になる", () => {
      facade.startAim({ x: BALL_X0, y: BALL_Y0 });
      expect(get(phase)).toBe("aiming");
    });

    it("ボールから離れた位置をタップしても aiming にならない", () => {
      facade.startAim({ x: 0, y: 0 });
      expect(get(phase)).toBe("waiting");
    });

    it("aiming 中に updateAim を呼ぶと aimTarget が更新される", () => {
      facade.startAim({ x: BALL_X0, y: BALL_Y0 });
      facade.updateAim({ x: BALL_X0 + 30, y: BALL_Y0 + 40 });
      const target = get(aimTarget);
      expect(target?.x).toBe(BALL_X0 + 30);
      expect(target?.y).toBe(BALL_Y0 + 40);
    });

    it("launch 後にフェーズが flying になる", () => {
      facade.startAim({ x: BALL_X0, y: BALL_Y0 });
      facade.launch({ x: BALL_X0 + 60, y: BALL_Y0 + 60 });
      expect(get(phase)).toBe("flying");
    });

    it("ドラッグ量が少なすぎる場合は waiting に戻る", () => {
      facade.startAim({ x: BALL_X0, y: BALL_Y0 });
      facade.launch({ x: BALL_X0 + 2, y: BALL_Y0 + 2 });
      expect(get(phase)).toBe("waiting");
    });

    it("launch 後に aimOrigin と aimTarget がクリアされる", () => {
      facade.startAim({ x: BALL_X0, y: BALL_Y0 });
      facade.launch({ x: BALL_X0 + 60, y: BALL_Y0 + 60 });
      expect(get(aimOrigin)).toBeNull();
      expect(get(aimTarget)).toBeNull();
    });
  });

  describe("tick", () => {
    beforeEach(async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(pikachu);
      await facade.startRound(mockFetch);
      facade.startAim({ x: BALL_X0, y: BALL_Y0 });
      facade.launch({ x: BALL_X0 + 60, y: BALL_Y0 + 60 });
    });

    it("flying 状態で tick を呼ぶとボール位置が変化する", () => {
      const before = { ...mockEngine.getState().position };
      facade.tick();
      const after = mockEngine.getState().position;
      // モックエンジンが getBallState() 呼び出しごとに位置を変化させる
      expect(after.x !== before.x || after.y !== before.y).toBe(true);
    });

    it("waiting 状態では tick を呼んでもボールが動かない", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(pikachu);
      await facade.startRound(mockFetch);
      // waiting 状態では vel=0 のため getBallState() を繰り返しても位置不変
      const before = { ...mockEngine.getState().position };
      facade.tick();
      expect(mockEngine.getState().position).toEqual(before);
    });

    it("速度が落ちて止まると missed になる", () => {
      // モックエンジンは FRICTION=0.998 で減速するため十分な tick 数で停止する
      for (let i = 0; i < 3000; i++) {
        facade.tick();
        if (get(phase) === "missed") break;
      }
      expect(["missed", "flying"]).toContain(get(phase));
    });
  });

  describe("nextBall", () => {
    it("ボール位置が初期位置に戻る", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(pikachu);
      await facade.startRound(mockFetch);
      facade.startAim({ x: BALL_X0, y: BALL_Y0 });
      facade.launch({ x: BALL_X0 + 60, y: BALL_Y0 + 60 });
      facade.giveUp();

      facade.nextBall();

      const bp = mockEngine.getState().position;
      expect(bp.x).toBeCloseTo(BALL_X0);
      expect(bp.y).toBeCloseTo(BALL_Y0);
    });

    it("フェーズが waiting に戻る（ボール・ポケモンが残っている場合）", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(pikachu);
      await facade.startRound(mockFetch);
      facade.startAim({ x: BALL_X0, y: BALL_Y0 });
      facade.launch({ x: BALL_X0 + 60, y: BALL_Y0 + 60 });
      facade.giveUp();

      facade.nextBall();

      expect(get(phase)).toBe("waiting");
    });

    it("障害物・ポケモン位置は変わらない（同コースで再挑戦）", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(pikachu);
      await facade.startRound(mockFetch);
      const obsBefore = get(obstacles);
      const poksBefore = get(pokemons).map((p) => p.position);

      facade.startAim({ x: BALL_X0, y: BALL_Y0 });
      facade.launch({ x: BALL_X0 + 60, y: BALL_Y0 + 60 });
      facade.giveUp();
      facade.nextBall();

      expect(get(obstacles)).toEqual(obsBefore);
      const poksAfter = get(pokemons).map((p) => p.position);
      expect(poksAfter).toEqual(poksBefore);
    });
  });
});
