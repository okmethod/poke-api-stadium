/**
 * KanjiFillQuiz の全操作コマンドの唯一の入り口
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Facade)
 * - ROLE: ゲーム進行制御、プレゼン層へのゲーム操作手段の提供
 * - ALLOWED: ドメイン層への依存、アプリ層ストアへの依存、アプリ層 Port への依存
 * - FORBIDDEN: インフラ層への直接依存、プレゼン層への依存
 */

import type { PokeData, FlavorTextPair } from "$lib/domain/models/PokeData";

// --- KanjiQuizItem モデル ---

/**
 * 漢字クイズの1問単位。
 *
 * 複数の KanjiQuizItem を並べると、元のフレーバーテキストが再現される構造。
 * - 読み問題: prefix + [targetKanji] + suffix を表示し、reading を答える
 * - 書き問題: kanaPrefix + [reading] + kanaSuffix を表示し、targetKanji を答える
 */
export interface KanjiQuizItem {
  readonly prefix: string;
  readonly targetKanji: string;
  readonly suffix: string;
  readonly kanaPrefix: string;
  readonly reading: string;
  readonly kanaSuffix: string;
}

// CJK 統合漢字・拡張A・互換漢字の範囲
function isKanjiChar(ch: string): boolean {
  const c = ch.charCodeAt(0);
  return (c >= 0x4e00 && c <= 0x9fff) || (c >= 0x3400 && c <= 0x4dbf) || (c >= 0xf900 && c <= 0xfaff);
}

function hasKanji(s: string): boolean {
  for (let i = 0; i < s.length; i++) {
    if (isKanjiChar(s.charAt(i))) return true;
  }
  return false;
}

/**
 * FlavorTextPair をスペース・改行区切りのトークン単位で KanjiQuizItem 配列に分解する。
 *
 * 漢字を含むトークンを1問とし、直後の非漢字トークンは suffix / kanaSuffix に格納する。
 * 先頭の非漢字トークンのみ次の漢字ブロックの prefix になる。
 */
export function parseFlavorTextPair(pair: FlavorTextPair): KanjiQuizItem[] {
  const kanjiTokens = pair.kanji.split(/[ \n]+/).filter((t) => t.length > 0);
  const kanaTokens = pair.kana.split(/[ \n]+/).filter((t) => t.length > 0);
  // トークン数が異なる場合、形態素解析なしに正しく対応付けできないため空配列を返す
  if (kanjiTokens.length !== kanaTokens.length) return [];
  const count = kanjiTokens.length;

  const items: KanjiQuizItem[] = [];
  let pendingKanjiParts: string[] = [];
  let pendingKanaParts: string[] = [];

  for (let i = 0; i < count; i++) {
    const kt = kanjiTokens[i]!;
    const kn = kanaTokens[i]!;

    if (hasKanji(kt)) {
      const prefix = pendingKanjiParts.join("");
      const kanaPrefix = pendingKanaParts.join("");
      items.push({ prefix, targetKanji: kt, suffix: "", kanaPrefix, reading: kn, kanaSuffix: "" });
      pendingKanjiParts = [];
      pendingKanaParts = [];
    } else {
      if (items.length > 0) {
        const last = items[items.length - 1]!;
        const lastText = last.suffix.length > 0 ? last.suffix : last.targetKanji;
        const lastChar = lastText.slice(-1);
        if (lastChar !== "。" && lastChar !== "、") {
          // 直前ブロックの末尾が句読点でなければ suffix に結合する
          items[items.length - 1] = {
            ...last,
            suffix: last.suffix + kt,
            kanaSuffix: last.kanaSuffix + kn,
          };
        } else {
          // 句読点で終わるブロックの後の非漢字は次の漢字ブロックの prefix になる
          pendingKanjiParts.push(kt);
          pendingKanaParts.push(kn);
        }
      } else {
        // 文頭の非漢字トークンは次の漢字ブロックの prefix になる
        pendingKanjiParts.push(kt);
        pendingKanaParts.push(kn);
      }
    }
  }

  return items;
}

// --- Facade ---

import type { IPokeRepository } from "$lib/application/ports/IPokeRepository";
import type { FacadeResult } from "$lib/application/usecases/facadeTypes";
import { withLoadingGuard } from "$lib/application/usecases/usecaseUtils";
import { selectRandomPokemon } from "$lib/application/utils/pokeSelectionUtils";
import { getRandomNumber } from "$lib/shared/utils/randomUtils";
import { storeWriter } from "./store";

// ja テキストが存在しないポケモン（初期世代等）をスキップするための試行上限
const MAX_RETRY = 5;

/**
 * 漢字ドリルのゲーム操作を提供する Facade
 *
 * 図鑑テキストの漢字・かなペアを取得できないポケモンは自動スキップして再試行する。
 */
export class KanjiFillQuizFacade {
  constructor(private readonly repository: IPokeRepository) {}

  /** ランダムにポケモンを選出してテキストペアをストアに設定する */
  async start(fetchFn: typeof fetch): Promise<FacadeResult> {
    storeWriter.reset();
    return withLoadingGuard(
      () => this.fetchWithTextPair(fetchFn),
      (v) => storeWriter.setIsLoading(v),
      ({ pokeData, textPair }) => {
        storeWriter.setPokeData(pokeData);
        storeWriter.setTextPair(textPair);
      },
      () => storeWriter.setPokeData(null),
      "テキストが見つかりませんでした",
    );
  }

  /** よみかたを表示する */
  reveal(): void {
    storeWriter.setIsRevealed(true);
  }

  // --- private ---

  private async fetchWithTextPair(fetchFn: typeof fetch): Promise<{ pokeData: PokeData; textPair: FlavorTextPair }> {
    for (let i = 0; i < MAX_RETRY; i++) {
      const pokeData = await selectRandomPokemon(this.repository, fetchFn);
      const textPairs = await this.repository.getSpeciesFlavorTextPairs(fetchFn, pokeData.speciesId);
      if (textPairs.length > 0) {
        const textPair = textPairs[getRandomNumber(textPairs.length)]!;
        return { pokeData, textPair };
      }
    }
    throw new Error("No valid kanji-kana text pair found after retries");
  }
}
