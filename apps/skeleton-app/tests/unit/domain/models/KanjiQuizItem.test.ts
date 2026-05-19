/**
 * parseFlavorTextPair のテスト
 */

import { describe, it, expect } from "vitest";
import { parseFlavorTextPair } from "$lib/domain/models/KanjiQuizItem";

describe("parseFlavorTextPair", () => {
  it("後続の非漢字トークンを suffix/kanaSuffix に格納し、下線とこたえを漢字トークンに対応させる", () => {
    const pair = {
      kanji: "船底や 川の岩に 頭を\nぶつけまくっても 気にせず 気ままに\n泳いでいる のんきな ポケモン",
      kana: "ふなぞこや かわのいわに あたまを\nぶつけまくっても きにせず きままに\nおよいでいる のんきな ポケモン",
    };

    const result = parseFlavorTextPair(pair);

    // 下線部（targetKanji）は漢字トークンのみ
    expect(result.map((r) => r.targetKanji)).toEqual([
      "船底や",
      "川の岩に",
      "頭を",
      "気にせず",
      "気ままに",
      "泳いでいる",
    ]);
    // こたえ（reading）も漢字トークンのみ
    expect(result.map((r) => r.reading)).toEqual([
      "ふなぞこや",
      "かわのいわに",
      "あたまを",
      "きにせず",
      "きままに",
      "およいでいる",
    ]);
    // 後続の非漢字は suffix/kanaSuffix に格納される
    expect(result.map((r) => r.suffix)).toEqual(["", "", "ぶつけまくっても", "", "", "のんきなポケモン"]);
    expect(result.map((r) => r.kanaSuffix)).toEqual(["", "", "ぶつけまくっても", "", "", "のんきなポケモン"]);
    expect(result.every((r) => r.prefix === "" && r.kanaPrefix === "")).toBe(true);
  });

  it("句読点付きトークンも suffix に格納する", () => {
    const pair = {
      kanji: "汚い 場所が 大嫌い。\n居心地の 良い 場所で\nいつも 毛並みを 手入れしている。",
      kana: "きたない ばしょが だいきらい。\nいごこちの よい ばしょで\nいつも けなみを ていれしている。",
    };

    const result = parseFlavorTextPair(pair);

    expect(result.map((r) => r.targetKanji)).toEqual([
      "汚い",
      "場所が",
      "大嫌い。",
      "居心地の",
      "良い",
      "場所で",
      "毛並みを",
      "手入れしている。",
    ]);
    expect(result.map((r) => r.reading)).toEqual([
      "きたない",
      "ばしょが",
      "だいきらい。",
      "いごこちの",
      "よい",
      "ばしょで",
      "けなみを",
      "ていれしている。",
    ]);
    expect(result.map((r) => r.suffix)).toEqual(["", "", "", "", "", "いつも", "", ""]);
    expect(result.map((r) => r.kanaSuffix)).toEqual(["", "", "", "", "", "いつも", "", ""]);
  });

  it("カタカナ語も suffix に格納し、複数の後続トークンは連結される", () => {
    const pair = {
      kanji: "最高の 科学力を 使い\n世界で はじめて プログラムにより\n作られた 人工の ポケモン。",
      kana: "さいこうの かがくりょくを つかい\nせかいで はじめて プログラムにより\nつくられた じんこうの ポケモン。",
    };

    const result = parseFlavorTextPair(pair);

    expect(result.map((r) => r.targetKanji)).toEqual(["最高の", "科学力を", "使い", "世界で", "作られた", "人工の"]);
    expect(result.map((r) => r.reading)).toEqual([
      "さいこうの",
      "かがくりょくを",
      "つかい",
      "せかいで",
      "つくられた",
      "じんこうの",
    ]);
    // 複数の後続トークンはスペースなしで連結
    expect(result.map((r) => r.suffix)).toEqual(["", "", "", "はじめてプログラムにより", "", "ポケモン。"]);
    expect(result.map((r) => r.kanaSuffix)).toEqual(["", "", "", "はじめてプログラムにより", "", "ポケモン。"]);
  });

  it("「。」で終わるブロックの後の非漢字は suffix に追加せず、次の漢字ブロックの prefix になる", () => {
    // スクリーンショットで確認された問題：「発達している。」の suffix に「エサの…」が付いてしまう
    const pair = {
      kanji: "足の ツメが 発達している。\nエサの タマタマを つかんで 運ぶ。",
      kana: "あしの ツメが はったつしている。\nエサの タマタマを つかんで はこぶ。",
    };

    const result = parseFlavorTextPair(pair);

    expect(result.map((r) => r.targetKanji)).toEqual(["足の", "発達している。", "運ぶ。"]);
    expect(result.map((r) => r.reading)).toEqual(["あしの", "はったつしている。", "はこぶ。"]);
    // 「。」で終わらないブロックは suffix を持つ
    expect(result[0]!.suffix).toBe("ツメが");
    expect(result[0]!.kanaSuffix).toBe("ツメが");
    // 「。」で終わるブロックは suffix を持たない
    expect(result[1]!.suffix).toBe("");
    expect(result[1]!.kanaSuffix).toBe("");
    // 「。」後の非漢字は次の漢字ブロックの prefix になる
    expect(result[2]!.prefix).toBe("エサのタマタマをつかんで");
    expect(result[2]!.kanaPrefix).toBe("エサのタマタマをつかんで");
  });

  it("「、」で終わるブロックの後の非漢字も次の漢字ブロックの prefix になる", () => {
    const pair = {
      kanji: "大きな 体で、\nゆっくりと 歩く。",
      kana: "おおきな からだで、\nゆっくりと あるく。",
    };

    const result = parseFlavorTextPair(pair);

    expect(result.map((r) => r.targetKanji)).toEqual(["大きな", "体で、", "歩く。"]);
    expect(result[1]!.suffix).toBe("");
    expect(result[2]!.prefix).toBe("ゆっくりと");
    expect(result[2]!.kanaPrefix).toBe("ゆっくりと");
  });

  it("文頭の非漢字トークンは次の漢字ブロックの prefix になる", () => {
    const pair = {
      kanji: "ぜんこくに 知られた ポケモン",
      kana: "ぜんこくに しられた ポケモン",
    };

    const result = parseFlavorTextPair(pair);

    expect(result).toHaveLength(1);
    expect(result[0]!.prefix).toBe("ぜんこくに");
    expect(result[0]!.kanaPrefix).toBe("ぜんこくに");
    expect(result[0]!.targetKanji).toBe("知られた");
    expect(result[0]!.reading).toBe("しられた");
    expect(result[0]!.suffix).toBe("ポケモン");
    expect(result[0]!.kanaSuffix).toBe("ポケモン");
  });
});
