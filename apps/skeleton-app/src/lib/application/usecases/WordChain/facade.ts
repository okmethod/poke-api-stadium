/**
 * ポケモンしりとりのゲームロジック Facade
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Facade)
 * - ROLE: データ初期化・ゲームセッション管理・しりとりルール判定を担当する
 * - ALLOWED: ドメイン層への依存、アプリ層ストアへの依存、アプリ層 Port への依存、共有層への依存
 * - FORBIDDEN: インフラ層への直接依存、プレゼン層への依存
 */

import { get } from "svelte/store";
import { resolvedCryUrl } from "$lib/domain/models/PokeData";
import type { FacadeResult } from "$lib/application/usecases/facadeTypes";
import type { IPokeRepository } from "$lib/application/ports/IPokeRepository";
import { getSelectedPokeIds } from "$lib/application/stores/generationStore";
import { getRandomNumber, pickRandomElementsFromArray } from "$lib/shared/utils/randomUtils";
import { shuffleArray } from "$lib/shared/utils/arrayUtils";
import { storeWriter, pokeDict, groupByHeadCharDict, pushedPokeItems, usedids, type ShiritoriPokeItem } from "./store";

const POKE_COUNT = 12;
const POSSIBLE_POKE_COUNT = 4;

/** ポケモンしりとりのゲームロジックを担当する Facade */
export class WordChainFacade {
  constructor(private readonly repository: IPokeRepository) {}

  /** 選択世代のポケモンを全件ロードし、しりとり用辞書を構築する */
  async initialize(fetchFn: typeof fetch): Promise<FacadeResult> {
    storeWriter.reset();
    storeWriter.setIsLoading(true);
    try {
      const ids = getSelectedPokeIds();
      const rawDict = await this.repository.getPokemons(fetchFn, ids);

      const dict: Record<number, ShiritoriPokeItem> = {};
      for (const poke of Object.values(rawDict)) {
        dict[poke.speciesId] = {
          id: poke.speciesId,
          jaName: poke.jaName,
          imageUrl: poke.imageUrls.pixel.front ?? poke.imageUrls.artwork.front,
          cryUrl: resolvedCryUrl(poke.cryUrls),
          type1: poke.type1,
          type2: poke.type2,
        };
      }

      const groupByHeadChar: Record<string, number[]> = {};
      for (const item of Object.values(dict)) {
        const head = WordChainFacade.getHeadChar(item.jaName);
        (groupByHeadChar[head] ??= []).push(item.id);
      }

      storeWriter.setPokeDict(dict);
      storeWriter.setGroupByHeadCharDict(groupByHeadChar);
      return { success: true };
    } catch {
      return { success: false, error: "ポケモンデータをよみこめなかった" };
    } finally {
      storeWriter.setIsLoading(false);
    }
  }

  /**
   * ゲームを新規開始する
   * @returns 最初のポケモンの鳴き声URL（プレゼン層での音声再生に使用）
   */
  startNewGame(): string | null {
    const dict = get(pokeDict);
    const allItems = Object.values(dict);
    if (allItems.length === 0) return null;

    storeWriter.resetSession();

    const firstItem = allItems[getRandomNumber(allItems.length)]!;
    storeWriter.setUsedids(new Set([firstItem.id]));
    storeWriter.setPushedPokeItems([firstItem]);
    this.updateMessage([firstItem]);
    this.refreshCandidates();

    return firstItem.cryUrl;
  }

  /** 候補ポケモンを再抽選する */
  refreshCandidates(): void {
    const pushed = get(pushedPokeItems);
    if (pushed.length === 0) return;

    const dict = get(pokeDict);
    const gbc = get(groupByHeadCharDict);
    const used = get(usedids);
    const lastItem = pushed[pushed.length - 1]!;
    const tailChar = this.getTailChar(lastItem.jaName);

    const allUnused = Object.values(dict).filter((item) => !used.has(item.id));
    const possibleUnused = (gbc[tailChar] ?? [])
      .map((id) => dict[id])
      .filter((item): item is ShiritoriPokeItem => item !== undefined && !used.has(item.id));

    const guaranteed =
      possibleUnused.length <= POSSIBLE_POKE_COUNT
        ? possibleUnused
        : pickRandomElementsFromArray(possibleUnused, POSSIBLE_POKE_COUNT);

    const guaranteedIds = new Set(guaranteed.map((i) => i.id));
    const otherUnused = allUnused.filter((i) => !guaranteedIds.has(i.id));
    const fillCount = Math.max(0, POKE_COUNT - guaranteed.length);
    const others = otherUnused.length <= fillCount ? otherUnused : pickRandomElementsFromArray(otherUnused, fillCount);

    storeWriter.setPickedPokeItems(shuffleArray([...guaranteed, ...others]));
  }

  /**
   * ポケモンを選択してしりとりを進める
   * @returns 選択成功時は鳴き声URL、不成立時は null（プレゼン層での音声再生に使用）
   */
  challenge(item: ShiritoriPokeItem): string | null {
    const pushed = get(pushedPokeItems);
    const lastItem = pushed[pushed.length - 1];
    if (!lastItem) return null;

    if (!this.solveShiritoriRule(lastItem.jaName, item.jaName)) {
      this.updateMessage(pushed, this.getTailChar(lastItem.jaName));
      return null;
    }

    const used = get(usedids);
    const newPushed = [...pushed, item];
    storeWriter.setUsedids(new Set([...used, item.id]));
    storeWriter.setPushedPokeItems(newPushed);
    this.updateMessage(newPushed);

    return item.cryUrl;
  }

  /**
   * ポケモン名の末尾文字を正規化して返す
   *
   * 「ー」「♀」「♂」「２」「Ｚ」で終わる場合はその手前の文字を使う。
   */
  private getTailChar(name: string): string {
    let tail = name.slice(-1);
    const ignoreChars = ["ー", "♀", "♂", "２", "Ｚ"];
    if (ignoreChars.includes(tail) && name.length > 1) {
      tail = name.slice(-2, -1);
    }
    return WordChainFacade.normalizeChar(tail);
  }

  /** tailName の末尾文字と nextName の先頭文字が一致するか判定する */
  private solveShiritoriRule(tailName: string, nextName: string): boolean {
    return this.getTailChar(tailName) === WordChainFacade.getHeadChar(nextName);
  }

  // errorTailChar 指定時は「〇から始まるポケモンを選んでね」メッセージを優先し、通常時はチェーン末尾から次の文字を案内する
  private updateMessage(pushed: ShiritoriPokeItem[], errorTailChar?: string): void {
    if (errorTailChar !== undefined) {
      storeWriter.setMessage(`「${errorTailChar}」 から はじまる ポケモン を えらんでね`);
      return;
    }

    const tailItem = pushed[pushed.length - 1];
    if (!tailItem) {
      storeWriter.setMessage("ポケモン を よびだしてね");
      return;
    }

    const tailChar = this.getTailChar(tailItem.jaName);
    if (tailChar === "ン") {
      storeWriter.setMessage("ン で おわっちゃった...");
      return;
    }

    if (pushed.length === 1) {
      storeWriter.setMessage(`はじめは 「${tailChar}」 から！`);
    } else {
      const msgs = ["そのちょうし！", "いいぞ！", "がんばれ！", "すごい！", "いけいけ！"];
      storeWriter.setMessage(`${msgs[getRandomNumber(msgs.length)]} つぎは 「${tailChar}」 から！`);
    }
  }

  /** 濁点・半濁点・小文字をそれぞれの清音・大文字に正規化して返す */
  private static normalizeChar(char: string): string {
    // prettier-ignore
    const map: Record<string, string> = {
      'ガ': 'カ', 'ギ': 'キ', 'グ': 'ク', 'ゲ': 'ケ', 'ゴ': 'コ',
      'ザ': 'サ', 'ジ': 'シ', 'ズ': 'ス', 'ゼ': 'セ', 'ゾ': 'ソ',
      'ダ': 'タ', 'ヂ': 'チ', 'ヅ': 'ツ', 'デ': 'テ', 'ド': 'ト',
      'バ': 'ハ', 'ビ': 'ヒ', 'ブ': 'フ', 'ベ': 'ヘ', 'ボ': 'ホ',
      'パ': 'ハ', 'ピ': 'ヒ', 'プ': 'フ', 'ペ': 'ヘ', 'ポ': 'ホ',
      'ァ': 'ア', 'ィ': 'イ', 'ゥ': 'ウ', 'ェ': 'エ', 'ォ': 'オ',
      'ャ': 'ヤ', 'ュ': 'ユ', 'ョ': 'ヨ', 'ッ': 'ツ',
    };
    return map[char] ?? char;
  }

  /** ポケモン名の先頭文字を正規化して返す */
  private static getHeadChar(name: string): string {
    return WordChainFacade.normalizeChar(name.slice(0, 1));
  }
}
