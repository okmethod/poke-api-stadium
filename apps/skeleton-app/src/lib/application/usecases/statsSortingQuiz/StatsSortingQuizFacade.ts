/**
 * StatsSortingQuizFacade - ステータス並べ替えクイズの全操作コマンドの唯一の入り口
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Facade)
 * - ROLE: ゲーム進行制御、プレゼン層へのゲーム操作手段の提供
 * - ALLOWED: ドメイン層への依存、アプリ層ストアへの依存
 * - FORBIDDEN: インフラ層への直接依存、プレゼン層への依存（Svelte/DOM/UIライブラリ）
 */

import type { PokeData } from "$lib/domain/models/PokeData";
import type { IPokeRepository } from "$lib/application/ports/IPokeRepository";
import type { FacadeResult } from "$lib/application/usecases/facadeTypes";
import { getSelectedPokeIds } from "$lib/application/stores/generationStore";
import { pickRandomNumbers } from "$lib/shared/utils/randomUtils";
import { statsSortingQuizStoreWriter } from "./statsSortingQuizStore";

/** 比較モードの定義 */
export interface CompareMode {
  readonly name: string;
  readonly getValue: (data: PokeData) => number;
  readonly formatValue: (data: PokeData) => string;
}

export type CompareModeName = "height" | "weight" | "hp" | "attack" | "defense" | "spAtk" | "spDef" | "speed";

/** 利用可能な比較モード一覧 */
export const COMPARE_MODES: Record<CompareModeName, CompareMode> = {
  height: {
    name: "たかさ",
    getValue: (d) => d.height,
    formatValue: (d) => `${d.height.toFixed(1)}m`,
  },
  weight: {
    name: "おもさ",
    getValue: (d) => d.weight,
    formatValue: (d) => `${d.weight.toFixed(1)}kg`,
  },
  hp: {
    name: "HP",
    getValue: (d) => d.stats.hp,
    formatValue: (d) => d.stats.hp.toString(),
  },
  attack: {
    name: "こうげき",
    getValue: (d) => d.stats.attack,
    formatValue: (d) => d.stats.attack.toString(),
  },
  defense: {
    name: "ぼうぎょ",
    getValue: (d) => d.stats.defense,
    formatValue: (d) => d.stats.defense.toString(),
  },
  spAtk: {
    name: "とくこう",
    getValue: (d) => d.stats.spAtk,
    formatValue: (d) => d.stats.spAtk.toString(),
  },
  spDef: {
    name: "とくぼう",
    getValue: (d) => d.stats.spDef,
    formatValue: (d) => d.stats.spDef.toString(),
  },
  speed: {
    name: "すばやさ",
    getValue: (d) => d.stats.speed,
    formatValue: (d) => d.stats.speed.toString(),
  },
};

/** ポケモン数の選択肢（最小・最大） */
export const POKE_COUNT_MIN = 3;
export const POKE_COUNT_MAX = 6;

/**
 * ステータス並べ替えクイズのゲーム操作を提供する Facade
 *
 * IPokeRepository を constructor injection で受け取ることで、
 * テスト時にモックを注入可能にする。
 */
export class StatsSortingQuizFacade {
  constructor(private readonly repository: IPokeRepository) {}

  /** ランダムにポケモンを選出してストアを更新する */
  async pickPokemons(fetchFn: typeof fetch, count: number): Promise<FacadeResult> {
    statsSortingQuizStoreWriter.setIsOpen(false);
    statsSortingQuizStoreWriter.setResult(null);
    statsSortingQuizStoreWriter.setIsLoading(true);
    try {
      const allIds = getSelectedPokeIds();
      const ids = pickRandomNumbers(allIds, count);
      const pokeDataMap = await this.repository.getPokemons(fetchFn, ids);
      // IDの選出順序を保持してPokeData[]に変換
      const list = ids.map((id) => pokeDataMap[id.toString()]).filter((d): d is PokeData => d !== undefined);
      statsSortingQuizStoreWriter.setPokeDataList(list);
      return { success: true };
    } catch {
      statsSortingQuizStoreWriter.setPokeDataList([]);
      return { success: false, error: "ポケモンをよびだせなかった" };
    } finally {
      statsSortingQuizStoreWriter.setIsLoading(false);
    }
  }

  /**
   * 並べ替え結果を検証してストアを更新する
   *
   * orderedPokeData は左→右（または上→下）の順で「大きい順」に並んでいることを期待する。
   */
  revealResult(orderedPokeData: PokeData[], compareMode: CompareModeName): void {
    const mode = COMPARE_MODES[compareMode];
    const values = orderedPokeData.map((d) => mode.getValue(d));
    const isCorrect = values.every((v, i) => i === 0 || values[i - 1]! >= v);

    const successMessages: Record<number, string> = {
      3: "せいかい！",
      4: "すごい！",
      5: "すごすぎる！！",
      6: "ポケモンマスター！！！！",
    };
    const message = isCorrect ? (successMessages[orderedPokeData.length] ?? "せいかい！") : "ざんねん...";
    statsSortingQuizStoreWriter.setResult(message);
    statsSortingQuizStoreWriter.setIsOpen(true);
  }

  /** ゲーム状態をリセットする */
  reset(): void {
    statsSortingQuizStoreWriter.setIsOpen(false);
    statsSortingQuizStoreWriter.setResult(null);
  }
}
