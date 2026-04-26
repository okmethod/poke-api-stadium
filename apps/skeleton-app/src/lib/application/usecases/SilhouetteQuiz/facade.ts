/**
 * シルエットクイズの全操作コマンドの唯一の入り口
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Facade)
 * - ROLE: ゲーム進行制御、プレゼン層へのゲーム操作手段の提供
 * - ALLOWED: ドメイン層への依存、アプリ層ストアへの依存、アプリ層 Port への依存
 * - FORBIDDEN: インフラ層への直接依存、プレゼン層への依存
 */

import { get } from "svelte/store";
import type { PokeData } from "$lib/domain/models/PokeData";
import { pokeTypeJaName } from "$lib/domain/models/PokeData";
import type { IPokeRepository } from "$lib/application/ports/IPokeRepository";
import type { FacadeResult } from "$lib/application/usecases/facadeTypes";
import { getRandomNumber } from "$lib/shared/utils/randomUtils";
import { resolvedCryUrl } from "$lib/domain/models/PokeData";
import { selectRandomPokemon } from "$lib/application/utils/pokeSelectionUtils";
import { withLoadingGuard } from "$lib/application/usecases/usecaseUtils";
import { storeWriter, pokeData, isOpen } from "./store";

/** toggleAnswer の戻り値（鳴き声URLの再生判断はプレゼン層で行う） */
export type ToggleAnswerResult = { readonly cryUrl: string | null };

/** getHint の戻り値（トースト表示はプレゼン層で行う） */
export type GetHintResult = FacadeResult;

/**
 * シルエットクイズのゲーム操作を提供する Facade
 *
 * IPokeRepository を constructor injection で受け取ることで、
 * テスト時にモックを注入可能にする。
 */
export class SilhouetteQuizFacade {
  constructor(private readonly repository: IPokeRepository) {}

  /** ランダムにポケモンを選出してストアを更新する（選択世代でフィルター） */
  async pickPokemon(fetchFn: typeof fetch): Promise<FacadeResult> {
    // 旧ポケモン画像をトランジション前に即時非表示にしてネタバレを防ぐ
    storeWriter.reset();
    return withLoadingGuard(
      () => selectRandomPokemon(this.repository, fetchFn),
      (v) => storeWriter.setIsLoading(v),
      (pokeData) => storeWriter.setPokeData(pokeData),
      () => storeWriter.setPokeData(null),
    );
  }

  /**
   * こたえ表示/非表示を切り替える
   *
   * 鳴き声の再生判断（音声ON/OFF）はプレゼン層で行うため、URLのみを返す。
   */
  toggleAnswer(): ToggleAnswerResult {
    const current = get(pokeData);
    if (current === null) return { cryUrl: null };

    const nextIsOpen = !get(isOpen);
    storeWriter.setIsOpen(nextIsOpen);
    // こたえを開く時だけ鳴き声URLを返す（閉じる時は null）
    return { cryUrl: nextIsOpen ? resolvedCryUrl(current.cryUrls) : null };
  }

  /** ランダムなヒントを生成してストアに書き込む */
  getHint(): GetHintResult {
    const current = get(pokeData);
    if (current === null) {
      return { success: false };
    }

    const hint = this.buildRandomHint(current);
    storeWriter.setHintText(hint);
    return { success: true };
  }

  // --- private helpers ---

  private buildRandomHint(data: PokeData): string {
    const statsEntries: [string, number][] = [
      ["HP", data.stats.hp],
      ["こうげき", data.stats.attack],
      ["ぼうぎょ", data.stats.defense],
      ["とくこう", data.stats.spAtk],
      ["とくぼう", data.stats.spDef],
      ["すばやさ", data.stats.speed],
    ];
    const sorted = [...statsEntries].sort(([, a], [, b]) => b - a);
    const topStat = sorted[0]![1] > sorted[1]![1] ? sorted[0]![0] : null;
    const bottomStat = sorted[5]![1] < sorted[4]![1] ? sorted[5]![0] : null;

    const name = data.jaName;
    const candidates: (string | null)[] = [
      name[0] + "○".repeat(name.length - 1),
      `${pokeTypeJaName(data.type1)}タイプ`,
      data.type2 ? `${pokeTypeJaName(data.type2)}タイプ` : "タイプは1つだけ",
      `たかさ ${data.height.toFixed(1)}m`,
      `おもさ ${data.weight.toFixed(1)}kg`,
      topStat ? `${topStat}が たかい` : null,
      bottomStat ? `${bottomStat}は ひくい` : null,
    ];
    const hints = candidates.filter((h): h is string => h !== null);
    return hints[getRandomNumber(hints.length)]!;
  }
}
