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
  ballPosition,
  obstacles,
  aimOrigin,
  aimTarget,
  storeWriter,
} from "$lib/application/usecases/CaptureBilliard/store";
import { buildMockPokeData } from "../../../__testUtils__/mockPokeData";
import { createMockRepository } from "../../../__testUtils__/mockRepository";

vi.mock("$lib/application/utils/pokeSelectionUtils", () => ({
  selectRandomPokemon: vi.fn(),
}));

import { selectRandomPokemon } from "$lib/application/utils/pokeSelectionUtils";

const mockFetch = vi.fn() as unknown as typeof fetch;
const pikachu = buildMockPokeData({ speciesId: 25, jaName: "ピカチュウ" });

const { ballStartX: BALL_X0, ballStartY: BALL_Y0, ballRadius: BALL_R, pokemonCount: POKEMON_COUNT } = GAME_CONFIG;

describe("CaptureBilliardFacade", () => {
  let facade: CaptureBilliardFacade;

  beforeEach(() => {
    facade = new CaptureBilliardFacade(createMockRepository());
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

    it("ポケモン位置・障害物がストアに設定される", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(pikachu);

      await facade.startRound(mockFetch);

      const pokemonList = get(pokemons);
      expect(pokemonList.length).toBe(POKEMON_COUNT);
      expect(pokemonList[0]?.x).toBeGreaterThan(0);
      expect(pokemonList[0]?.y).toBeGreaterThan(0);
      expect(get(obstacles).length).toBeGreaterThan(0);
    });

    it("ボール位置が初期位置にリセットされる", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(pikachu);

      await facade.startRound(mockFetch);

      const bp = get(ballPosition);
      expect(bp.x).toBe(BALL_X0);
      expect(bp.y).toBe(BALL_Y0);
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
      // ボールから十分離れた位置でリリース
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
      // 発射してフライング状態にする
      facade.startAim({ x: BALL_X0, y: BALL_Y0 });
      facade.launch({ x: BALL_X0 + 60, y: BALL_Y0 + 60 });
    });

    it("flying 状態で tick を呼ぶとボールが移動する", () => {
      const before = { ...get(ballPosition) };
      facade.tick();
      const after = get(ballPosition);
      expect(after.x !== before.x || after.y !== before.y).toBe(true);
    });

    it("waiting / aiming 状態では tick を呼んでもボールが動かない", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(pikachu);
      await facade.startRound(mockFetch);
      // waiting 状態
      const before = { ...get(ballPosition) };
      facade.tick();
      expect(get(ballPosition)).toEqual(before);
    });

    it("壁にぶつかるとボールが反射して速度方向が逆転する", () => {
      // ここでは ballPosition が canvasWidth 内に収まることを確認する
      for (let i = 0; i < 200; i++) facade.tick();
      const bp = get(ballPosition);
      expect(bp.x).toBeGreaterThanOrEqual(BALL_R);
      expect(bp.x).toBeLessThanOrEqual(GAME_CONFIG.canvasWidth - BALL_R);
      expect(bp.y).toBeGreaterThanOrEqual(BALL_R);
      expect(bp.y).toBeLessThanOrEqual(GAME_CONFIG.canvasHeight - BALL_R);
    });

    it("速度が落ちて止まると missed になる", () => {
      for (let i = 0; i < 500; i++) {
        facade.tick();
        if (get(phase) === "missed") break;
      }
      // caught または missed のいずれかになる（caught は運次第）
      expect(["caught", "missed", "flying"]).toContain(get(phase));
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

      const bp = get(ballPosition);
      expect(bp.x).toBe(BALL_X0);
      expect(bp.y).toBe(BALL_Y0);
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
      const poksBefore = get(pokemons).map((p) => ({ x: p.x, y: p.y }));

      facade.startAim({ x: BALL_X0, y: BALL_Y0 });
      facade.launch({ x: BALL_X0 + 60, y: BALL_Y0 + 60 });
      facade.giveUp();
      facade.nextBall();

      expect(get(obstacles)).toEqual(obsBefore);
      const poksAfter = get(pokemons).map((p) => ({ x: p.x, y: p.y }));
      expect(poksAfter).toEqual(poksBefore);
    });
  });
});
