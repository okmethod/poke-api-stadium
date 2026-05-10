/**
 * TypingGame の全操作コマンドの唯一の入り口
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Facade)
 * - ROLE: ゲーム進行制御、プレゼン層へのゲーム操作手段の提供
 * - ALLOWED: ドメイン層への依存、アプリ層ストアへの依存、アプリ層 Port への依存
 * - FORBIDDEN: インフラ層への直接依存、プレゼン層への依存
 */

import { get } from "svelte/store";
import type { IPokeRepository } from "$lib/application/ports/IPokeRepository";
import type { FacadeResult } from "$lib/application/usecases/facadeTypes";
import { selectRandomPokemons } from "$lib/application/utils/pokeSelectionUtils";
import { withLoadingGuard } from "$lib/application/usecases/usecaseUtils";
import { storeWriter, phase, pokeList, currentIndex, gameStartMs, TOTAL_ROUNDS } from "./store";

interface KanaSegment {
  readonly kana: string;
  /** 先頭が表示用デフォルト、以降は代替入力 */
  readonly candidates: readonly string[];
}

// prettier-ignore
const KANA_MAP: Record<string, readonly string[]> = {
  // 清音
  ア: ["a"],  イ: ["i"],  ウ: ["u"],  エ: ["e"],  オ: ["o"],
  カ: ["ka"], キ: ["ki"], ク: ["ku"], ケ: ["ke"], コ: ["ko"],
  サ: ["sa"], シ: ["shi", "si"], ス: ["su"], セ: ["se"], ソ: ["so"],
  タ: ["ta"], チ: ["chi", "ti"], ツ: ["tsu", "tu"], テ: ["te"], ト: ["to"],
  ナ: ["na"], ニ: ["ni"], ヌ: ["nu"], ネ: ["ne"], ノ: ["no"],
  ハ: ["ha"], ヒ: ["hi"], フ: ["fu", "hu"], ヘ: ["he"], ホ: ["ho"],
  マ: ["ma"], ミ: ["mi"], ム: ["mu"], メ: ["me"], モ: ["mo"],
  ヤ: ["ya"], ユ: ["yu"], ヨ: ["yo"],
  ラ: ["ra"], リ: ["ri"], ル: ["ru"], レ: ["re"], ロ: ["ro"],
  ワ: ["wa"], ヲ: ["wo"],
  // セグメントベースなので "n" 1文字で確定（IME での nn と異なり曖昧さなし）
  ン: ["n"],
  // 濁音
  ガ: ["ga"], ギ: ["gi"], グ: ["gu"], ゲ: ["ge"], ゴ: ["go"],
  ザ: ["za"], ジ: ["ji", "zi"], ズ: ["zu"], ゼ: ["ze"], ゾ: ["zo"],
  ダ: ["da"], ヂ: ["di"], ヅ: ["du"], デ: ["de"], ド: ["do"],
  バ: ["ba"], ビ: ["bi"], ブ: ["bu"], ベ: ["be"], ボ: ["bo"],
  パ: ["pa"], ピ: ["pi"], プ: ["pu"], ペ: ["pe"], ポ: ["po"],
  ヴ: ["vu"],
  // 小文字単独（x-prefix が実際の入力に合致、l-prefix も許容）
  ァ: ["xa", "la"], ィ: ["xi", "li"], ゥ: ["xu", "lu"], ェ: ["xe", "le"], ォ: ["xo", "lo"],
  ャ: ["xya", "lya"], ュ: ["xyu", "lyu"], ョ: ["xyo", "lyo"],
  // 拗音（2文字複合）
  キャ: ["kya"], キュ: ["kyu"], キョ: ["kyo"],
  シャ: ["sha", "sya"], シュ: ["shu", "syu"], ショ: ["sho", "syo"], シェ: ["she", "sye"],
  チャ: ["cha", "tya"], チュ: ["chu", "tyu"], チョ: ["cho", "tyo"], チェ: ["che", "tye"],
  ニャ: ["nya"], ニュ: ["nyu"], ニョ: ["nyo"],
  ヒャ: ["hya"], ヒュ: ["hyu"], ヒョ: ["hyo"],
  ミャ: ["mya"], ミュ: ["myu"], ミョ: ["myo"],
  リャ: ["rya"], リュ: ["ryu"], リョ: ["ryo"],
  ギャ: ["gya"], ギュ: ["gyu"], ギョ: ["gyo"],
  ジャ: ["ja", "zya", "jya"], ジュ: ["ju", "zyu", "jyu"], ジョ: ["jo", "zyo", "jyo"], ジェ: ["je", "zye", "jye"],
  ビャ: ["bya"], ビュ: ["byu"], ビョ: ["byo"],
  ピャ: ["pya"], ピュ: ["pyu"], ピョ: ["pyo"],
  ファ: ["fa"], フィ: ["fi"], フェ: ["fe"], フォ: ["fo"],
  ヴァ: ["va"], ヴィ: ["vi"], ヴェ: ["ve"], ヴォ: ["vo"],
  // テ/デ + 小ィ の分解入力（dexi/deli）も許容
  ティ: ["thi", "texi", "teli"], ディ: ["dhi", "dexi", "deli"],
  ウィ: ["wi"], ウェ: ["we"],
};

/**
 * カタカナ文字列をカナセグメント列に変換する
 *
 * ♀/♂ などの非カナ文字はスキップ。
 * ッ は後続子音の先頭を候補の先頭とし、xtu/xtsu も許容。
 */
function parseKanaToSegments(katakana: string): KanaSegment[] {
  const segments: KanaSegment[] = [];
  let i = 0;

  while (i < katakana.length) {
    const ch = katakana[i]!;

    if (ch === "ー") {
      segments.push({ kana: "ー", candidates: ["-"] });
      i++;
      continue;
    }

    if (ch === "ッ") {
      let nextConsonant: string | null = null;
      if (i + 1 < katakana.length) {
        const next = katakana[i + 1]!;
        const next2 = katakana[i + 2] ?? "";
        const nr = KANA_MAP[next + next2]?.[0] ?? KANA_MAP[next]?.[0] ?? "";
        const fc = nr[0];
        if (fc && !"aiueo".includes(fc)) nextConsonant = fc;
      }
      segments.push({
        kana: "ッ",
        candidates: nextConsonant ? [nextConsonant, "xtu", "xtsu"] : ["xtu", "xtsu"],
      });
      i++;
      continue;
    }

    // 2文字複合（ャ/ュ/ョ/ェ 等との組み合わせ）
    if (i + 1 < katakana.length) {
      const key = ch + katakana[i + 1]!;
      const compound = KANA_MAP[key];
      if (compound) {
        segments.push({ kana: key, candidates: compound });
        i += 2;
        continue;
      }
    }

    const single = KANA_MAP[ch];
    if (single) {
      segments.push({ kana: ch, candidates: single });
    }
    // 非カナ（♀ ♂ など）はスキップ

    i++;
  }

  return segments;
}

/** キー入力1文字の処理結果 */
export interface CharResult {
  readonly correct: boolean;
  readonly wordComplete: boolean;
  readonly gameComplete: boolean;
}

/**
 * ポケモンタイピングゲームのゲーム操作を提供する Facade
 *
 * セグメントベースの複数候補照合により、IME 入力に近い複数のローマ字経路を許容する。
 * IPokeRepository を constructor injection で受け取ることで、
 * テスト時にモックを注入可能にする。
 */
export class TypingGameFacade {
  constructor(private readonly repository: IPokeRepository) {}

  private segments: KanaSegment[] = [];
  private segIdx: number = 0;
  private charIdx: number = 0;
  private liveCandidates: string[] = [];
  /** 完了済みセグメントで実際に打たれた文字列（表示と typedCount の整合のため保持） */
  private completedTexts: string[] = [];

  private initWord(kana: string): void {
    this.segments = parseKanaToSegments(kana);
    this.segIdx = 0;
    this.charIdx = 0;
    this.completedTexts = [];
    this.liveCandidates = [...(this.segments[0]?.candidates ?? [])];
  }

  private buildDisplayRomaji(): string {
    return [
      ...this.completedTexts,
      ...(this.segIdx < this.segments.length ? [this.liveCandidates[0] ?? ""] : []),
      ...this.segments.slice(this.segIdx + 1).map((s) => s.candidates[0] ?? ""),
    ].join("");
  }

  private countTyped(): number {
    return this.completedTexts.reduce((sum, t) => sum + t.length, 0) + this.charIdx;
  }

  /**
   * ゲームを開始する: ランダムに TOTAL_ROUNDS 体を一括取得して最初の問題を設定する
   */
  async startGame(fetchFn: typeof fetch): Promise<FacadeResult> {
    storeWriter.reset();
    return withLoadingGuard(
      () => selectRandomPokemons(this.repository, fetchFn, TOTAL_ROUNDS),
      (v) => storeWriter.setIsLoading(v),
      (pokemons) => {
        storeWriter.setPokeList(pokemons);
        this.initWord(pokemons[0]!.jaName);
        storeWriter.setTargetRomaji(this.buildDisplayRomaji());
        storeWriter.setTypedCount(0);
        storeWriter.setGameStartMs(Date.now());
        storeWriter.setPhase("playing");
      },
      () => storeWriter.reset(),
    );
  }

  /**
   * キー入力1文字を処理する
   *
   * セグメントごとに複数候補を保持し、入力に応じて候補を絞り込む。
   * 候補がいずれか完了した時点でセグメントを確定し次へ進む。
   * playing 状態でない場合は何もしない。
   */
  processChar(char: string): CharResult {
    if (get(phase) !== "playing") {
      return { correct: false, wordComplete: false, gameComplete: false };
    }

    const matched = this.liveCandidates.filter((c) => c[this.charIdx] === char);
    if (matched.length === 0) {
      storeWriter.incrementTotalErrors();
      return { correct: false, wordComplete: false, gameComplete: false };
    }

    this.charIdx++;
    this.liveCandidates = matched;
    storeWriter.incrementTotalCorrectChars();

    const completedText = matched.find((c) => c.length === this.charIdx);
    if (!completedText) {
      // セグメント継続中: 候補が絞られた可能性があるので表示更新
      storeWriter.setTargetRomaji(this.buildDisplayRomaji());
      storeWriter.setTypedCount(this.countTyped());
      return { correct: true, wordComplete: false, gameComplete: false };
    }

    // セグメント完了
    this.completedTexts.push(completedText);
    this.segIdx++;

    if (this.segIdx >= this.segments.length) {
      // 単語完了
      storeWriter.setTargetRomaji(this.buildDisplayRomaji());
      storeWriter.setTypedCount(this.countTyped());
      const nextIdx = get(currentIndex) + 1;
      if (nextIdx >= TOTAL_ROUNDS) {
        storeWriter.setElapsedMs(Date.now() - get(gameStartMs)!);
        storeWriter.setPhase("result");
        return { correct: true, wordComplete: true, gameComplete: true };
      }
      const nextPoke = get(pokeList)[nextIdx]!;
      storeWriter.setCurrentIndex(nextIdx);
      this.initWord(nextPoke.jaName);
      storeWriter.setTargetRomaji(this.buildDisplayRomaji());
      storeWriter.setTypedCount(0);
      return { correct: true, wordComplete: true, gameComplete: false };
    }

    // 次のセグメントへ
    this.charIdx = 0;
    this.liveCandidates = [...this.segments[this.segIdx]!.candidates];
    storeWriter.setTargetRomaji(this.buildDisplayRomaji());
    storeWriter.setTypedCount(this.countTyped());
    return { correct: true, wordComplete: false, gameComplete: false };
  }
}
