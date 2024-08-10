import type { StaticPokeData } from "$lib/types/poke";

export const LATEST_POKEMON_ID = 1025;
// https://pokeapi.co/api/v2/pokemon の count の値
// と思いきや、図鑑番号がついていないポケモンがいるため count より小さい値になるので注意

export const STATIC_POKE_DICT: Record<string, StaticPokeData> = {
  "1": {
    jaName: "フシギダネ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  },
  "2": {
    jaName: "フシギソウ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
  },
  "3": {
    jaName: "フシギバナ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
  },
  "4": {
    jaName: "ヒトカゲ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
  },
  "5": {
    jaName: "リザード",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
  },
  "6": {
    jaName: "リザードン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
  },
  "7": {
    jaName: "ゼニガメ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
  },
  "8": {
    jaName: "カメール",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
  },
  "9": {
    jaName: "カメックス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
  },
  "10": {
    jaName: "キャタピー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png",
  },
  "11": {
    jaName: "トランセル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png",
  },
  "12": {
    jaName: "バタフリー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
  },
  "13": {
    jaName: "ビードル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png",
  },
  "14": {
    jaName: "コクーン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png",
  },
  "15": {
    jaName: "スピアー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png",
  },
  "16": {
    jaName: "ポッポ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png",
  },
  "17": {
    jaName: "ピジョン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png",
  },
  "18": {
    jaName: "ピジョット",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png",
  },
  "19": {
    jaName: "コラッタ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png",
  },
  "20": {
    jaName: "ラッタ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png",
  },
  "21": {
    jaName: "オニスズメ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png",
  },
  "22": {
    jaName: "オニドリル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/22.png",
  },
  "23": {
    jaName: "アーボ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/23.png",
  },
  "24": {
    jaName: "アーボック",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/24.png",
  },
  "25": {
    jaName: "ピカチュウ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  },
  "26": {
    jaName: "ライチュウ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png",
  },
  "27": {
    jaName: "サンド",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/27.png",
  },
  "28": {
    jaName: "サンドパン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/28.png",
  },
  "29": {
    jaName: "ニドラン♀",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/29.png",
  },
  "30": {
    jaName: "ニドリーナ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/30.png",
  },
  "31": {
    jaName: "ニドクイン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/31.png",
  },
  "32": {
    jaName: "ニドラン♂",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/32.png",
  },
  "33": {
    jaName: "ニドリーノ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/33.png",
  },
  "34": {
    jaName: "ニドキング",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/34.png",
  },
  "35": {
    jaName: "ピッピ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png",
  },
  "36": {
    jaName: "ピクシー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/36.png",
  },
  "37": {
    jaName: "ロコン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/37.png",
  },
  "38": {
    jaName: "キュウコン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/38.png",
  },
  "39": {
    jaName: "プリン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png",
  },
  "40": {
    jaName: "プクリン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/40.png",
  },
  "41": {
    jaName: "ズバット",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/41.png",
  },
  "42": {
    jaName: "ゴルバット",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/42.png",
  },
  "43": {
    jaName: "ナゾノクサ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/43.png",
  },
  "44": {
    jaName: "クサイハナ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/44.png",
  },
  "45": {
    jaName: "ラフレシア",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/45.png",
  },
  "46": {
    jaName: "パラス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/46.png",
  },
  "47": {
    jaName: "パラセクト",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/47.png",
  },
  "48": {
    jaName: "コンパン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/48.png",
  },
  "49": {
    jaName: "モルフォン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/49.png",
  },
  "50": {
    jaName: "ディグダ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/50.png",
  },
  "51": {
    jaName: "ダグトリオ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/51.png",
  },
  "52": {
    jaName: "ニャース",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png",
  },
  "53": {
    jaName: "ペルシアン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/53.png",
  },
  "54": {
    jaName: "コダック",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png",
  },
  "55": {
    jaName: "ゴルダック",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/55.png",
  },
  "56": {
    jaName: "マンキー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/56.png",
  },
  "57": {
    jaName: "オコリザル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/57.png",
  },
  "58": {
    jaName: "ガーディ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/58.png",
  },
  "59": {
    jaName: "ウインディ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png",
  },
  "60": {
    jaName: "ニョロモ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/60.png",
  },
  "61": {
    jaName: "ニョロゾ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/61.png",
  },
  "62": {
    jaName: "ニョロボン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/62.png",
  },
  "63": {
    jaName: "ケーシィ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/63.png",
  },
  "64": {
    jaName: "ユンゲラー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/64.png",
  },
  "65": {
    jaName: "フーディン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png",
  },
  "66": {
    jaName: "ワンリキー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/66.png",
  },
  "67": {
    jaName: "ゴーリキー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/67.png",
  },
  "68": {
    jaName: "カイリキー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png",
  },
  "69": {
    jaName: "マダツボミ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/69.png",
  },
  "70": {
    jaName: "ウツドン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/70.png",
  },
  "71": {
    jaName: "ウツボット",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/71.png",
  },
  "72": {
    jaName: "メノクラゲ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/72.png",
  },
  "73": {
    jaName: "ドククラゲ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/73.png",
  },
  "74": {
    jaName: "イシツブテ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/74.png",
  },
  "75": {
    jaName: "ゴローン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/75.png",
  },
  "76": {
    jaName: "ゴローニャ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/76.png",
  },
  "77": {
    jaName: "ポニータ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/77.png",
  },
  "78": {
    jaName: "ギャロップ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/78.png",
  },
  "79": {
    jaName: "ヤドン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/79.png",
  },
  "80": {
    jaName: "ヤドラン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/80.png",
  },
  "81": {
    jaName: "コイル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/81.png",
  },
  "82": {
    jaName: "レアコイル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/82.png",
  },
  "83": {
    jaName: "カモネギ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/83.png",
  },
  "84": {
    jaName: "ドードー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/84.png",
  },
  "85": {
    jaName: "ドードリオ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/85.png",
  },
  "86": {
    jaName: "パウワウ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/86.png",
  },
  "87": {
    jaName: "ジュゴン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/87.png",
  },
  "88": {
    jaName: "ベトベター",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/88.png",
  },
  "89": {
    jaName: "ベトベトン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/89.png",
  },
  "90": {
    jaName: "シェルダー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/90.png",
  },
  "91": {
    jaName: "パルシェン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/91.png",
  },
  "92": {
    jaName: "ゴース",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png",
  },
  "93": {
    jaName: "ゴースト",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/93.png",
  },
  "94": {
    jaName: "ゲンガー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png",
  },
  "95": {
    jaName: "イワーク",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png",
  },
  "96": {
    jaName: "スリープ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/96.png",
  },
  "97": {
    jaName: "スリーパー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/97.png",
  },
  "98": {
    jaName: "クラブ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/98.png",
  },
  "99": {
    jaName: "キングラー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/99.png",
  },
  "100": {
    jaName: "ビリリダマ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/100.png",
  },
  "101": {
    jaName: "マルマイン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/101.png",
  },
  "102": {
    jaName: "タマタマ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/102.png",
  },
  "103": {
    jaName: "ナッシー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/103.png",
  },
  "104": {
    jaName: "カラカラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/104.png",
  },
  "105": {
    jaName: "ガラガラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/105.png",
  },
  "106": {
    jaName: "サワムラー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/106.png",
  },
  "107": {
    jaName: "エビワラー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/107.png",
  },
  "108": {
    jaName: "ベロリンガ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/108.png",
  },
  "109": {
    jaName: "ドガース",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/109.png",
  },
  "110": {
    jaName: "マタドガス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/110.png",
  },
  "111": {
    jaName: "サイホーン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/111.png",
  },
  "112": {
    jaName: "サイドン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/112.png",
  },
  "113": {
    jaName: "ラッキー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/113.png",
  },
  "114": {
    jaName: "モンジャラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/114.png",
  },
  "115": {
    jaName: "ガルーラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/115.png",
  },
  "116": {
    jaName: "タッツー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/116.png",
  },
  "117": {
    jaName: "シードラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/117.png",
  },
  "118": {
    jaName: "トサキント",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/118.png",
  },
  "119": {
    jaName: "アズマオウ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/119.png",
  },
  "120": {
    jaName: "ヒトデマン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/120.png",
  },
  "121": {
    jaName: "スターミー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/121.png",
  },
  "122": {
    jaName: "バリヤード",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/122.png",
  },
  "123": {
    jaName: "ストライク",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/123.png",
  },
  "124": {
    jaName: "ルージュラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/124.png",
  },
  "125": {
    jaName: "エレブー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/125.png",
  },
  "126": {
    jaName: "ブーバー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/126.png",
  },
  "127": {
    jaName: "カイロス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/127.png",
  },
  "128": {
    jaName: "ケンタロス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/128.png",
  },
  "129": {
    jaName: "コイキング",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/129.png",
  },
  "130": {
    jaName: "ギャラドス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png",
  },
  "131": {
    jaName: "ラプラス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png",
  },
  "132": {
    jaName: "メタモン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
  },
  "133": {
    jaName: "イーブイ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png",
  },
  "134": {
    jaName: "シャワーズ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/134.png",
  },
  "135": {
    jaName: "サンダース",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/135.png",
  },
  "136": {
    jaName: "ブースター",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/136.png",
  },
  "137": {
    jaName: "ポリゴン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/137.png",
  },
  "138": {
    jaName: "オムナイト",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/138.png",
  },
  "139": {
    jaName: "オムスター",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
  },
  "140": {
    jaName: "カブト",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/140.png",
  },
  "141": {
    jaName: "カブトプス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/141.png",
  },
  "142": {
    jaName: "プテラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/142.png",
  },
  "143": {
    jaName: "カビゴン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png",
  },
  "144": {
    jaName: "フリーザー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/144.png",
  },
  "145": {
    jaName: "サンダー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/145.png",
  },
  "146": {
    jaName: "ファイヤー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/146.png",
  },
  "147": {
    jaName: "ミニリュウ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png",
  },
  "148": {
    jaName: "ハクリュー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/148.png",
  },
  "149": {
    jaName: "カイリュー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png",
  },
  "150": {
    jaName: "ミュウツー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png",
  },
  "151": {
    jaName: "ミュウ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png",
  },
  "152": {
    jaName: "チコリータ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/152.png",
  },
  "153": {
    jaName: "ベイリーフ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/153.png",
  },
  "154": {
    jaName: "メガニウム",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/154.png",
  },
  "155": {
    jaName: "ヒノアラシ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/155.png",
  },
  "156": {
    jaName: "マグマラシ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/156.png",
  },
  "157": {
    jaName: "バクフーン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/157.png",
  },
  "158": {
    jaName: "ワニノコ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/158.png",
  },
  "159": {
    jaName: "アリゲイツ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/159.png",
  },
  "160": {
    jaName: "オーダイル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/160.png",
  },
  "161": {
    jaName: "オタチ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/161.png",
  },
  "162": {
    jaName: "オオタチ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/162.png",
  },
  "163": {
    jaName: "ホーホー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/163.png",
  },
  "164": {
    jaName: "ヨルノズク",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/164.png",
  },
  "165": {
    jaName: "レディバ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/165.png",
  },
  "166": {
    jaName: "レディアン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/166.png",
  },
  "167": {
    jaName: "イトマル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/167.png",
  },
  "168": {
    jaName: "アリアドス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/168.png",
  },
  "169": {
    jaName: "クロバット",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/169.png",
  },
  "170": {
    jaName: "チョンチー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/170.png",
  },
  "171": {
    jaName: "ランターン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/171.png",
  },
  "172": {
    jaName: "ピチュー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/172.png",
  },
  "173": {
    jaName: "ピィ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/173.png",
  },
  "174": {
    jaName: "ププリン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/174.png",
  },
  "175": {
    jaName: "トゲピー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/175.png",
  },
  "176": {
    jaName: "トゲチック",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/176.png",
  },
  "177": {
    jaName: "ネイティ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/177.png",
  },
  "178": {
    jaName: "ネイティオ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/178.png",
  },
  "179": {
    jaName: "メリープ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/179.png",
  },
  "180": {
    jaName: "モココ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/180.png",
  },
  "181": {
    jaName: "デンリュウ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/181.png",
  },
  "182": {
    jaName: "キレイハナ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/182.png",
  },
  "183": {
    jaName: "マリル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/183.png",
  },
  "184": {
    jaName: "マリルリ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/184.png",
  },
  "185": {
    jaName: "ウソッキー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/185.png",
  },
  "186": {
    jaName: "ニョロトノ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/186.png",
  },
  "187": {
    jaName: "ハネッコ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/187.png",
  },
  "188": {
    jaName: "ポポッコ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/188.png",
  },
  "189": {
    jaName: "ワタッコ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/189.png",
  },
  "190": {
    jaName: "エイパム",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/190.png",
  },
  "191": {
    jaName: "ヒマナッツ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/191.png",
  },
  "192": {
    jaName: "キマワリ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/192.png",
  },
  "193": {
    jaName: "ヤンヤンマ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/193.png",
  },
  "194": {
    jaName: "ウパー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/194.png",
  },
  "195": {
    jaName: "ヌオー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/195.png",
  },
  "196": {
    jaName: "エーフィ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/196.png",
  },
  "197": {
    jaName: "ブラッキー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/197.png",
  },
  "198": {
    jaName: "ヤミカラス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/198.png",
  },
  "199": {
    jaName: "ヤドキング",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/199.png",
  },
  "200": {
    jaName: "ムウマ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/200.png",
  },
  "201": {
    jaName: "アンノーン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201.png",
  },
  "202": {
    jaName: "ソーナンス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/202.png",
  },
  "203": {
    jaName: "キリンリキ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/203.png",
  },
  "204": {
    jaName: "クヌギダマ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/204.png",
  },
  "205": {
    jaName: "フォレトス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/205.png",
  },
  "206": {
    jaName: "ノコッチ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/206.png",
  },
  "207": {
    jaName: "グライガー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/207.png",
  },
  "208": {
    jaName: "ハガネール",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/208.png",
  },
  "209": {
    jaName: "ブルー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/209.png",
  },
  "210": {
    jaName: "グランブル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/210.png",
  },
  "211": {
    jaName: "ハリーセン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/211.png",
  },
  "212": {
    jaName: "ハッサム",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/212.png",
  },
  "213": {
    jaName: "ツボツボ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/213.png",
  },
  "214": {
    jaName: "ヘラクロス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/214.png",
  },
  "215": {
    jaName: "ニューラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/215.png",
  },
  "216": {
    jaName: "ヒメグマ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/216.png",
  },
  "217": {
    jaName: "リングマ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/217.png",
  },
  "218": {
    jaName: "マグマッグ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/218.png",
  },
  "219": {
    jaName: "マグカルゴ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/219.png",
  },
  "220": {
    jaName: "ウリムー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/220.png",
  },
  "221": {
    jaName: "イノムー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/221.png",
  },
  "222": {
    jaName: "サニーゴ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/222.png",
  },
  "223": {
    jaName: "テッポウオ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/223.png",
  },
  "224": {
    jaName: "オクタン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/224.png",
  },
  "225": {
    jaName: "デリバード",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/225.png",
  },
  "226": {
    jaName: "マンタイン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/226.png",
  },
  "227": {
    jaName: "エアームド",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/227.png",
  },
  "228": {
    jaName: "デルビル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/228.png",
  },
  "229": {
    jaName: "ヘルガー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/229.png",
  },
  "230": {
    jaName: "キングドラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/230.png",
  },
  "231": {
    jaName: "ゴマゾウ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/231.png",
  },
  "232": {
    jaName: "ドンファン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/232.png",
  },
  "233": {
    jaName: "ポリゴン２",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/233.png",
  },
  "234": {
    jaName: "オドシシ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/234.png",
  },
  "235": {
    jaName: "ドーブル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/235.png",
  },
  "236": {
    jaName: "バルキー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/236.png",
  },
  "237": {
    jaName: "カポエラー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/237.png",
  },
  "238": {
    jaName: "ムチュール",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/238.png",
  },
  "239": {
    jaName: "エレキッド",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/239.png",
  },
  "240": {
    jaName: "ブビィ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/240.png",
  },
  "241": {
    jaName: "ミルタンク",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/241.png",
  },
  "242": {
    jaName: "ハピナス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/242.png",
  },
  "243": {
    jaName: "ライコウ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/243.png",
  },
  "244": {
    jaName: "エンテイ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/244.png",
  },
  "245": {
    jaName: "スイクン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/245.png",
  },
  "246": {
    jaName: "ヨーギラス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/246.png",
  },
  "247": {
    jaName: "サナギラス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/247.png",
  },
  "248": {
    jaName: "バンギラス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/248.png",
  },
  "249": {
    jaName: "ルギア",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/249.png",
  },
  "250": {
    jaName: "ホウオウ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/250.png",
  },
  "251": {
    jaName: "セレビィ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/251.png",
  },
  "252": {
    jaName: "キモリ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/252.png",
  },
  "253": {
    jaName: "ジュプトル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/253.png",
  },
  "254": {
    jaName: "ジュカイン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/254.png",
  },
  "255": {
    jaName: "アチャモ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/255.png",
  },
  "256": {
    jaName: "ワカシャモ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/256.png",
  },
  "257": {
    jaName: "バシャーモ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/257.png",
  },
  "258": {
    jaName: "ミズゴロウ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/258.png",
  },
  "259": {
    jaName: "ヌマクロー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/259.png",
  },
  "260": {
    jaName: "ラグラージ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/260.png",
  },
  "261": {
    jaName: "ポチエナ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/261.png",
  },
  "262": {
    jaName: "グラエナ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/262.png",
  },
  "263": {
    jaName: "ジグザグマ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/263.png",
  },
  "264": {
    jaName: "マッスグマ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/264.png",
  },
  "265": {
    jaName: "ケムッソ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/265.png",
  },
  "266": {
    jaName: "カラサリス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/266.png",
  },
  "267": {
    jaName: "アゲハント",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/267.png",
  },
  "268": {
    jaName: "マユルド",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/268.png",
  },
  "269": {
    jaName: "ドクケイル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/269.png",
  },
  "270": {
    jaName: "ハスボー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/270.png",
  },
  "271": {
    jaName: "ハスブレロ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/271.png",
  },
  "272": {
    jaName: "ルンパッパ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/272.png",
  },
  "273": {
    jaName: "タネボー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/273.png",
  },
  "274": {
    jaName: "コノハナ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/274.png",
  },
  "275": {
    jaName: "ダーテング",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/275.png",
  },
  "276": {
    jaName: "スバメ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/276.png",
  },
  "277": {
    jaName: "オオスバメ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/277.png",
  },
  "278": {
    jaName: "キャモメ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/278.png",
  },
  "279": {
    jaName: "ペリッパー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/279.png",
  },
  "280": {
    jaName: "ラルトス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/280.png",
  },
  "281": {
    jaName: "キルリア",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/281.png",
  },
  "282": {
    jaName: "サーナイト",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/282.png",
  },
  "283": {
    jaName: "アメタマ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/283.png",
  },
  "284": {
    jaName: "アメモース",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/284.png",
  },
  "285": {
    jaName: "キノココ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/285.png",
  },
  "286": {
    jaName: "キノガッサ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/286.png",
  },
  "287": {
    jaName: "ナマケロ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/287.png",
  },
  "288": {
    jaName: "ヤルキモノ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/288.png",
  },
  "289": {
    jaName: "ケッキング",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/289.png",
  },
  "290": {
    jaName: "ツチニン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/290.png",
  },
  "291": {
    jaName: "テッカニン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/291.png",
  },
  "292": {
    jaName: "ヌケニン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/292.png",
  },
  "293": {
    jaName: "ゴニョニョ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/293.png",
  },
  "294": {
    jaName: "ドゴーム",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/294.png",
  },
  "295": {
    jaName: "バクオング",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/295.png",
  },
  "296": {
    jaName: "マクノシタ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/296.png",
  },
  "297": {
    jaName: "ハリテヤマ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/297.png",
  },
  "298": {
    jaName: "ルリリ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/298.png",
  },
  "299": {
    jaName: "ノズパス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/299.png",
  },
  "300": {
    jaName: "エネコ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/300.png",
  },
  "301": {
    jaName: "エネコロロ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/301.png",
  },
  "302": {
    jaName: "ヤミラミ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/302.png",
  },
  "303": {
    jaName: "クチート",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/303.png",
  },
  "304": {
    jaName: "ココドラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/304.png",
  },
  "305": {
    jaName: "コドラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/305.png",
  },
  "306": {
    jaName: "ボスゴドラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/306.png",
  },
  "307": {
    jaName: "アサナン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/307.png",
  },
  "308": {
    jaName: "チャーレム",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/308.png",
  },
  "309": {
    jaName: "ラクライ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/309.png",
  },
  "310": {
    jaName: "ライボルト",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/310.png",
  },
  "311": {
    jaName: "プラスル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/311.png",
  },
  "312": {
    jaName: "マイナン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/312.png",
  },
  "313": {
    jaName: "バルビート",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/313.png",
  },
  "314": {
    jaName: "イルミーゼ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/314.png",
  },
  "315": {
    jaName: "ロゼリア",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/315.png",
  },
  "316": {
    jaName: "ゴクリン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/316.png",
  },
  "317": {
    jaName: "マルノーム",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/317.png",
  },
  "318": {
    jaName: "キバニア",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/318.png",
  },
  "319": {
    jaName: "サメハダー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/319.png",
  },
  "320": {
    jaName: "ホエルコ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/320.png",
  },
  "321": {
    jaName: "ホエルオー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/321.png",
  },
  "322": {
    jaName: "ドンメル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/322.png",
  },
  "323": {
    jaName: "バクーダ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/323.png",
  },
  "324": {
    jaName: "コータス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/324.png",
  },
  "325": {
    jaName: "バネブー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/325.png",
  },
  "326": {
    jaName: "ブーピッグ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/326.png",
  },
  "327": {
    jaName: "パッチール",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/327.png",
  },
  "328": {
    jaName: "ナックラー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/328.png",
  },
  "329": {
    jaName: "ビブラーバ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/329.png",
  },
  "330": {
    jaName: "フライゴン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/330.png",
  },
  "331": {
    jaName: "サボネア",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/331.png",
  },
  "332": {
    jaName: "ノクタス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/332.png",
  },
  "333": {
    jaName: "チルット",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/333.png",
  },
  "334": {
    jaName: "チルタリス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/334.png",
  },
  "335": {
    jaName: "ザングース",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/335.png",
  },
  "336": {
    jaName: "ハブネーク",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/336.png",
  },
  "337": {
    jaName: "ルナトーン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/337.png",
  },
  "338": {
    jaName: "ソルロック",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/338.png",
  },
  "339": {
    jaName: "ドジョッチ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/339.png",
  },
  "340": {
    jaName: "ナマズン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/340.png",
  },
  "341": {
    jaName: "ヘイガニ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/341.png",
  },
  "342": {
    jaName: "シザリガー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/342.png",
  },
  "343": {
    jaName: "ヤジロン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/343.png",
  },
  "344": {
    jaName: "ネンドール",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/344.png",
  },
  "345": {
    jaName: "リリーラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/345.png",
  },
  "346": {
    jaName: "ユレイドル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/346.png",
  },
  "347": {
    jaName: "アノプス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/347.png",
  },
  "348": {
    jaName: "アーマルド",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/348.png",
  },
  "349": {
    jaName: "ヒンバス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/349.png",
  },
  "350": {
    jaName: "ミロカロス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/350.png",
  },
  "351": {
    jaName: "ポワルン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/351.png",
  },
  "352": {
    jaName: "カクレオン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/352.png",
  },
  "353": {
    jaName: "カゲボウズ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/353.png",
  },
  "354": {
    jaName: "ジュペッタ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/354.png",
  },
  "355": {
    jaName: "ヨマワル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/355.png",
  },
  "356": {
    jaName: "サマヨール",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/356.png",
  },
  "357": {
    jaName: "トロピウス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/357.png",
  },
  "358": {
    jaName: "チリーン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/358.png",
  },
  "359": {
    jaName: "アブソル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/359.png",
  },
  "360": {
    jaName: "ソーナノ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/360.png",
  },
  "361": {
    jaName: "ユキワラシ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/361.png",
  },
  "362": {
    jaName: "オニゴーリ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/362.png",
  },
  "363": {
    jaName: "タマザラシ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/363.png",
  },
  "364": {
    jaName: "トドグラー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/364.png",
  },
  "365": {
    jaName: "トドゼルガ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/365.png",
  },
  "366": {
    jaName: "パールル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/366.png",
  },
  "367": {
    jaName: "ハンテール",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/367.png",
  },
  "368": {
    jaName: "サクラビス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/368.png",
  },
  "369": {
    jaName: "ジーランス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/369.png",
  },
  "370": {
    jaName: "ラブカス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/370.png",
  },
  "371": {
    jaName: "タツベイ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/371.png",
  },
  "372": {
    jaName: "コモルー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/372.png",
  },
  "373": {
    jaName: "ボーマンダ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/373.png",
  },
  "374": {
    jaName: "ダンバル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/374.png",
  },
  "375": {
    jaName: "メタング",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/375.png",
  },
  "376": {
    jaName: "メタグロス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/376.png",
  },
  "377": {
    jaName: "レジロック",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/377.png",
  },
  "378": {
    jaName: "レジアイス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/378.png",
  },
  "379": {
    jaName: "レジスチル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/379.png",
  },
  "380": {
    jaName: "ラティアス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/380.png",
  },
  "381": {
    jaName: "ラティオス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/381.png",
  },
  "382": {
    jaName: "カイオーガ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/382.png",
  },
  "383": {
    jaName: "グラードン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/383.png",
  },
  "384": {
    jaName: "レックウザ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/384.png",
  },
  "385": {
    jaName: "ジラーチ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/385.png",
  },
  "386": {
    jaName: "デオキシス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/386.png",
  },
  "387": {
    jaName: "ナエトル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/387.png",
  },
  "388": {
    jaName: "ハヤシガメ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/388.png",
  },
  "389": {
    jaName: "ドダイトス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/389.png",
  },
  "390": {
    jaName: "ヒコザル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/390.png",
  },
  "391": {
    jaName: "モウカザル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/391.png",
  },
  "392": {
    jaName: "ゴウカザル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/392.png",
  },
  "393": {
    jaName: "ポッチャマ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/393.png",
  },
  "394": {
    jaName: "ポッタイシ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/394.png",
  },
  "395": {
    jaName: "エンペルト",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/395.png",
  },
  "396": {
    jaName: "ムックル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/396.png",
  },
  "397": {
    jaName: "ムクバード",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/397.png",
  },
  "398": {
    jaName: "ムクホーク",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/398.png",
  },
  "399": {
    jaName: "ビッパ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/399.png",
  },
  "400": {
    jaName: "ビーダル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/400.png",
  },
  "401": {
    jaName: "コロボーシ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/401.png",
  },
  "402": {
    jaName: "コロトック",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/402.png",
  },
  "403": {
    jaName: "コリンク",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/403.png",
  },
  "404": {
    jaName: "ルクシオ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/404.png",
  },
  "405": {
    jaName: "レントラー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/405.png",
  },
  "406": {
    jaName: "スボミー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/406.png",
  },
  "407": {
    jaName: "ロズレイド",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/407.png",
  },
  "408": {
    jaName: "ズガイドス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/408.png",
  },
  "409": {
    jaName: "ラムパルド",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/409.png",
  },
  "410": {
    jaName: "タテトプス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/410.png",
  },
  "411": {
    jaName: "トリデプス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/411.png",
  },
  "412": {
    jaName: "ミノムッチ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/412.png",
  },
  "413": {
    jaName: "ミノマダム",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/413.png",
  },
  "414": {
    jaName: "ガーメイル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/414.png",
  },
  "415": {
    jaName: "ミツハニー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/415.png",
  },
  "416": {
    jaName: "ビークイン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/416.png",
  },
  "417": {
    jaName: "パチリス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/417.png",
  },
  "418": {
    jaName: "ブイゼル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/418.png",
  },
  "419": {
    jaName: "フローゼル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/419.png",
  },
  "420": {
    jaName: "チェリンボ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/420.png",
  },
  "421": {
    jaName: "チェリム",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/421.png",
  },
  "422": {
    jaName: "カラナクシ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/422.png",
  },
  "423": {
    jaName: "トリトドン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/423.png",
  },
  "424": {
    jaName: "エテボース",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/424.png",
  },
  "425": {
    jaName: "フワンテ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/425.png",
  },
  "426": {
    jaName: "フワライド",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/426.png",
  },
  "427": {
    jaName: "ミミロル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/427.png",
  },
  "428": {
    jaName: "ミミロップ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/428.png",
  },
  "429": {
    jaName: "ムウマージ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/429.png",
  },
  "430": {
    jaName: "ドンカラス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/430.png",
  },
  "431": {
    jaName: "ニャルマー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/431.png",
  },
  "432": {
    jaName: "ブニャット",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/432.png",
  },
  "433": {
    jaName: "リーシャン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/433.png",
  },
  "434": {
    jaName: "スカンプー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/434.png",
  },
  "435": {
    jaName: "スカタンク",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/435.png",
  },
  "436": {
    jaName: "ドーミラー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/436.png",
  },
  "437": {
    jaName: "ドータクン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/437.png",
  },
  "438": {
    jaName: "ウソハチ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/438.png",
  },
  "439": {
    jaName: "マネネ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/439.png",
  },
  "440": {
    jaName: "ピンプク",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/440.png",
  },
  "441": {
    jaName: "ペラップ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/441.png",
  },
  "442": {
    jaName: "ミカルゲ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/442.png",
  },
  "443": {
    jaName: "フカマル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/443.png",
  },
  "444": {
    jaName: "ガバイト",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/444.png",
  },
  "445": {
    jaName: "ガブリアス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/445.png",
  },
  "446": {
    jaName: "ゴンベ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/446.png",
  },
  "447": {
    jaName: "リオル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/447.png",
  },
  "448": {
    jaName: "ルカリオ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/448.png",
  },
  "449": {
    jaName: "ヒポポタス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/449.png",
  },
  "450": {
    jaName: "カバルドン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/450.png",
  },
  "451": {
    jaName: "スコルピ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/451.png",
  },
  "452": {
    jaName: "ドラピオン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/452.png",
  },
  "453": {
    jaName: "グレッグル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/453.png",
  },
  "454": {
    jaName: "ドクロッグ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/454.png",
  },
  "455": {
    jaName: "マスキッパ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/455.png",
  },
  "456": {
    jaName: "ケイコウオ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/456.png",
  },
  "457": {
    jaName: "ネオラント",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/457.png",
  },
  "458": {
    jaName: "タマンタ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/458.png",
  },
  "459": {
    jaName: "ユキカブリ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/459.png",
  },
  "460": {
    jaName: "ユキノオー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/460.png",
  },
  "461": {
    jaName: "マニューラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/461.png",
  },
  "462": {
    jaName: "ジバコイル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/462.png",
  },
  "463": {
    jaName: "ベロベルト",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/463.png",
  },
  "464": {
    jaName: "ドサイドン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/464.png",
  },
  "465": {
    jaName: "モジャンボ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/465.png",
  },
  "466": {
    jaName: "エレキブル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/466.png",
  },
  "467": {
    jaName: "ブーバーン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/467.png",
  },
  "468": {
    jaName: "トゲキッス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/468.png",
  },
  "469": {
    jaName: "メガヤンマ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/469.png",
  },
  "470": {
    jaName: "リーフィア",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/470.png",
  },
  "471": {
    jaName: "グレイシア",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/471.png",
  },
  "472": {
    jaName: "グライオン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/472.png",
  },
  "473": {
    jaName: "マンムー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/473.png",
  },
  "474": {
    jaName: "ポリゴンＺ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/474.png",
  },
  "475": {
    jaName: "エルレイド",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/475.png",
  },
  "476": {
    jaName: "ダイノーズ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/476.png",
  },
  "477": {
    jaName: "ヨノワール",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/477.png",
  },
  "478": {
    jaName: "ユキメノコ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/478.png",
  },
  "479": {
    jaName: "ロトム",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/479.png",
  },
  "480": {
    jaName: "ユクシー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/480.png",
  },
  "481": {
    jaName: "エムリット",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/481.png",
  },
  "482": {
    jaName: "アグノム",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/482.png",
  },
  "483": {
    jaName: "ディアルガ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/483.png",
  },
  "484": {
    jaName: "パルキア",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/484.png",
  },
  "485": {
    jaName: "ヒードラン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/485.png",
  },
  "486": {
    jaName: "レジギガス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/486.png",
  },
  "487": {
    jaName: "ギラティナ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/487.png",
  },
  "488": {
    jaName: "クレセリア",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/488.png",
  },
  "489": {
    jaName: "フィオネ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/489.png",
  },
  "490": {
    jaName: "マナフィ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/490.png",
  },
  "491": {
    jaName: "ダークライ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/491.png",
  },
  "492": {
    jaName: "シェイミ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/492.png",
  },
  "493": {
    jaName: "アルセウス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/493.png",
  },
  "494": {
    jaName: "ビクティニ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/494.png",
  },
  "495": {
    jaName: "ツタージャ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/495.png",
  },
  "496": {
    jaName: "ジャノビー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/496.png",
  },
  "497": {
    jaName: "ジャローダ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/497.png",
  },
  "498": {
    jaName: "ポカブ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/498.png",
  },
  "499": {
    jaName: "チャオブー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/499.png",
  },
  "500": {
    jaName: "エンブオー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/500.png",
  },
  "501": {
    jaName: "ミジュマル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/501.png",
  },
  "502": {
    jaName: "フタチマル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/502.png",
  },
  "503": {
    jaName: "ダイケンキ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/503.png",
  },
  "504": {
    jaName: "ミネズミ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/504.png",
  },
  "505": {
    jaName: "ミルホッグ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/505.png",
  },
  "506": {
    jaName: "ヨーテリー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/506.png",
  },
  "507": {
    jaName: "ハーデリア",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/507.png",
  },
  "508": {
    jaName: "ムーランド",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/508.png",
  },
  "509": {
    jaName: "チョロネコ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/509.png",
  },
  "510": {
    jaName: "レパルダス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/510.png",
  },
  "511": {
    jaName: "ヤナップ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/511.png",
  },
  "512": {
    jaName: "ヤナッキー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/512.png",
  },
  "513": {
    jaName: "バオップ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/513.png",
  },
  "514": {
    jaName: "バオッキー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/514.png",
  },
  "515": {
    jaName: "ヒヤップ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/515.png",
  },
  "516": {
    jaName: "ヒヤッキー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/516.png",
  },
  "517": {
    jaName: "ムンナ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/517.png",
  },
  "518": {
    jaName: "ムシャーナ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/518.png",
  },
  "519": {
    jaName: "マメパト",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/519.png",
  },
  "520": {
    jaName: "ハトーボー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/520.png",
  },
  "521": {
    jaName: "ケンホロウ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/521.png",
  },
  "522": {
    jaName: "シママ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/522.png",
  },
  "523": {
    jaName: "ゼブライカ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/523.png",
  },
  "524": {
    jaName: "ダンゴロ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/524.png",
  },
  "525": {
    jaName: "ガントル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/525.png",
  },
  "526": {
    jaName: "ギガイアス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/526.png",
  },
  "527": {
    jaName: "コロモリ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/527.png",
  },
  "528": {
    jaName: "ココロモリ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/528.png",
  },
  "529": {
    jaName: "モグリュー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/529.png",
  },
  "530": {
    jaName: "ドリュウズ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/530.png",
  },
  "531": {
    jaName: "タブンネ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/531.png",
  },
  "532": {
    jaName: "ドッコラー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/532.png",
  },
  "533": {
    jaName: "ドテッコツ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/533.png",
  },
  "534": {
    jaName: "ローブシン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/534.png",
  },
  "535": {
    jaName: "オタマロ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/535.png",
  },
  "536": {
    jaName: "ガマガル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/536.png",
  },
  "537": {
    jaName: "ガマゲロゲ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/537.png",
  },
  "538": {
    jaName: "ナゲキ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/538.png",
  },
  "539": {
    jaName: "ダゲキ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/539.png",
  },
  "540": {
    jaName: "クルミル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/540.png",
  },
  "541": {
    jaName: "クルマユ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/541.png",
  },
  "542": {
    jaName: "ハハコモリ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/542.png",
  },
  "543": {
    jaName: "フシデ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/543.png",
  },
  "544": {
    jaName: "ホイーガ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/544.png",
  },
  "545": {
    jaName: "ペンドラー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/545.png",
  },
  "546": {
    jaName: "モンメン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/546.png",
  },
  "547": {
    jaName: "エルフーン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/547.png",
  },
  "548": {
    jaName: "チュリネ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/548.png",
  },
  "549": {
    jaName: "ドレディア",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/549.png",
  },
  "550": {
    jaName: "バスラオ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/550.png",
  },
  "551": {
    jaName: "メグロコ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/551.png",
  },
  "552": {
    jaName: "ワルビル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/552.png",
  },
  "553": {
    jaName: "ワルビアル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/553.png",
  },
  "554": {
    jaName: "ダルマッカ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/554.png",
  },
  "555": {
    jaName: "ヒヒダルマ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/555.png",
  },
  "556": {
    jaName: "マラカッチ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/556.png",
  },
  "557": {
    jaName: "イシズマイ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/557.png",
  },
  "558": {
    jaName: "イワパレス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/558.png",
  },
  "559": {
    jaName: "ズルッグ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/559.png",
  },
  "560": {
    jaName: "ズルズキン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/560.png",
  },
  "561": {
    jaName: "シンボラー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/561.png",
  },
  "562": {
    jaName: "デスマス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/562.png",
  },
  "563": {
    jaName: "デスカーン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/563.png",
  },
  "564": {
    jaName: "プロトーガ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/564.png",
  },
  "565": {
    jaName: "アバゴーラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/565.png",
  },
  "566": {
    jaName: "アーケン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/566.png",
  },
  "567": {
    jaName: "アーケオス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/567.png",
  },
  "568": {
    jaName: "ヤブクロン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/568.png",
  },
  "569": {
    jaName: "ダストダス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/569.png",
  },
  "570": {
    jaName: "ゾロア",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/570.png",
  },
  "571": {
    jaName: "ゾロアーク",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/571.png",
  },
  "572": {
    jaName: "チラーミィ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/572.png",
  },
  "573": {
    jaName: "チラチーノ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/573.png",
  },
  "574": {
    jaName: "ゴチム",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/574.png",
  },
  "575": {
    jaName: "ゴチミル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/575.png",
  },
  "576": {
    jaName: "ゴチルゼル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/576.png",
  },
  "577": {
    jaName: "ユニラン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/577.png",
  },
  "578": {
    jaName: "ダブラン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/578.png",
  },
  "579": {
    jaName: "ランクルス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/579.png",
  },
  "580": {
    jaName: "コアルヒー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/580.png",
  },
  "581": {
    jaName: "スワンナ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/581.png",
  },
  "582": {
    jaName: "バニプッチ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/582.png",
  },
  "583": {
    jaName: "バニリッチ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/583.png",
  },
  "584": {
    jaName: "バイバニラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/584.png",
  },
  "585": {
    jaName: "シキジカ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/585.png",
  },
  "586": {
    jaName: "メブキジカ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/586.png",
  },
  "587": {
    jaName: "エモンガ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/587.png",
  },
  "588": {
    jaName: "カブルモ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/588.png",
  },
  "589": {
    jaName: "シュバルゴ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/589.png",
  },
  "590": {
    jaName: "タマゲタケ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/590.png",
  },
  "591": {
    jaName: "モロバレル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/591.png",
  },
  "592": {
    jaName: "プルリル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/592.png",
  },
  "593": {
    jaName: "ブルンゲル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/593.png",
  },
  "594": {
    jaName: "ママンボウ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/594.png",
  },
  "595": {
    jaName: "バチュル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/595.png",
  },
  "596": {
    jaName: "デンチュラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/596.png",
  },
  "597": {
    jaName: "テッシード",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/597.png",
  },
  "598": {
    jaName: "ナットレイ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/598.png",
  },
  "599": {
    jaName: "ギアル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/599.png",
  },
  "600": {
    jaName: "ギギアル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/600.png",
  },
  "601": {
    jaName: "ギギギアル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/601.png",
  },
  "602": {
    jaName: "シビシラス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/602.png",
  },
  "603": {
    jaName: "シビビール",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/603.png",
  },
  "604": {
    jaName: "シビルドン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/604.png",
  },
  "605": {
    jaName: "リグレー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/605.png",
  },
  "606": {
    jaName: "オーベム",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/606.png",
  },
  "607": {
    jaName: "ヒトモシ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/607.png",
  },
  "608": {
    jaName: "ランプラー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/608.png",
  },
  "609": {
    jaName: "シャンデラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/609.png",
  },
  "610": {
    jaName: "キバゴ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/610.png",
  },
  "611": {
    jaName: "オノンド",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/611.png",
  },
  "612": {
    jaName: "オノノクス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/612.png",
  },
  "613": {
    jaName: "クマシュン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/613.png",
  },
  "614": {
    jaName: "ツンベアー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/614.png",
  },
  "615": {
    jaName: "フリージオ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/615.png",
  },
  "616": {
    jaName: "チョボマキ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/616.png",
  },
  "617": {
    jaName: "アギルダー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/617.png",
  },
  "618": {
    jaName: "マッギョ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/618.png",
  },
  "619": {
    jaName: "コジョフー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/619.png",
  },
  "620": {
    jaName: "コジョンド",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/620.png",
  },
  "621": {
    jaName: "クリムガン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/621.png",
  },
  "622": {
    jaName: "ゴビット",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/622.png",
  },
  "623": {
    jaName: "ゴルーグ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/623.png",
  },
  "624": {
    jaName: "コマタナ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/624.png",
  },
  "625": {
    jaName: "キリキザン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/625.png",
  },
  "626": {
    jaName: "バッフロン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/626.png",
  },
  "627": {
    jaName: "ワシボン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/627.png",
  },
  "628": {
    jaName: "ウォーグル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/628.png",
  },
  "629": {
    jaName: "バルチャイ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/629.png",
  },
  "630": {
    jaName: "バルジーナ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/630.png",
  },
  "631": {
    jaName: "クイタラン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/631.png",
  },
  "632": {
    jaName: "アイアント",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/632.png",
  },
  "633": {
    jaName: "モノズ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/633.png",
  },
  "634": {
    jaName: "ジヘッド",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/634.png",
  },
  "635": {
    jaName: "サザンドラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/635.png",
  },
  "636": {
    jaName: "メラルバ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/636.png",
  },
  "637": {
    jaName: "ウルガモス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/637.png",
  },
  "638": {
    jaName: "コバルオン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/638.png",
  },
  "639": {
    jaName: "テラキオン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/639.png",
  },
  "640": {
    jaName: "ビリジオン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/640.png",
  },
  "641": {
    jaName: "トルネロス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/641.png",
  },
  "642": {
    jaName: "ボルトロス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/642.png",
  },
  "643": {
    jaName: "レシラム",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/643.png",
  },
  "644": {
    jaName: "ゼクロム",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/644.png",
  },
  "645": {
    jaName: "ランドロス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/645.png",
  },
  "646": {
    jaName: "キュレム",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/646.png",
  },
  "647": {
    jaName: "ケルディオ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/647.png",
  },
  "648": {
    jaName: "メロエッタ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/648.png",
  },
  "649": {
    jaName: "ゲノセクト",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/649.png",
  },
  "650": {
    jaName: "ハリマロン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/650.png",
  },
  "651": {
    jaName: "ハリボーグ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/651.png",
  },
  "652": {
    jaName: "ブリガロン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/652.png",
  },
  "653": {
    jaName: "フォッコ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/653.png",
  },
  "654": {
    jaName: "テールナー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/654.png",
  },
  "655": {
    jaName: "マフォクシー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/655.png",
  },
  "656": {
    jaName: "ケロマツ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/656.png",
  },
  "657": {
    jaName: "ゲコガシラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/657.png",
  },
  "658": {
    jaName: "ゲッコウガ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/658.png",
  },
  "659": {
    jaName: "ホルビー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/659.png",
  },
  "660": {
    jaName: "ホルード",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/660.png",
  },
  "661": {
    jaName: "ヤヤコマ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/661.png",
  },
  "662": {
    jaName: "ヒノヤコマ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/662.png",
  },
  "663": {
    jaName: "ファイアロー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/663.png",
  },
  "664": {
    jaName: "コフキムシ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/664.png",
  },
  "665": {
    jaName: "コフーライ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/665.png",
  },
  "666": {
    jaName: "ビビヨン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/666.png",
  },
  "667": {
    jaName: "シシコ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/667.png",
  },
  "668": {
    jaName: "カエンジシ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/668.png",
  },
  "669": {
    jaName: "フラベベ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/669.png",
  },
  "670": {
    jaName: "フラエッテ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/670.png",
  },
  "671": {
    jaName: "フラージェス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/671.png",
  },
  "672": {
    jaName: "メェークル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/672.png",
  },
  "673": {
    jaName: "ゴーゴート",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/673.png",
  },
  "674": {
    jaName: "ヤンチャム",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/674.png",
  },
  "675": {
    jaName: "ゴロンダ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/675.png",
  },
  "676": {
    jaName: "トリミアン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/676.png",
  },
  "677": {
    jaName: "ニャスパー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/677.png",
  },
  "678": {
    jaName: "ニャオニクス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/678.png",
  },
  "679": {
    jaName: "ヒトツキ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/679.png",
  },
  "680": {
    jaName: "ニダンギル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/680.png",
  },
  "681": {
    jaName: "ギルガルド",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/681.png",
  },
  "682": {
    jaName: "シュシュプ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/682.png",
  },
  "683": {
    jaName: "フレフワン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/683.png",
  },
  "684": {
    jaName: "ペロッパフ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/684.png",
  },
  "685": {
    jaName: "ペロリーム",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/685.png",
  },
  "686": {
    jaName: "マーイーカ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/686.png",
  },
  "687": {
    jaName: "カラマネロ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/687.png",
  },
  "688": {
    jaName: "カメテテ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/688.png",
  },
  "689": {
    jaName: "ガメノデス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/689.png",
  },
  "690": {
    jaName: "クズモー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/690.png",
  },
  "691": {
    jaName: "ドラミドロ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/691.png",
  },
  "692": {
    jaName: "ウデッポウ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/692.png",
  },
  "693": {
    jaName: "ブロスター",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/693.png",
  },
  "694": {
    jaName: "エリキテル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/694.png",
  },
  "695": {
    jaName: "エレザード",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/695.png",
  },
  "696": {
    jaName: "チゴラス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/696.png",
  },
  "697": {
    jaName: "ガチゴラス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/697.png",
  },
  "698": {
    jaName: "アマルス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/698.png",
  },
  "699": {
    jaName: "アマルルガ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/699.png",
  },
  "700": {
    jaName: "ニンフィア",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/700.png",
  },
  "701": {
    jaName: "ルチャブル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/701.png",
  },
  "702": {
    jaName: "デデンネ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/702.png",
  },
  "703": {
    jaName: "メレシー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/703.png",
  },
  "704": {
    jaName: "ヌメラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/704.png",
  },
  "705": {
    jaName: "ヌメイル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/705.png",
  },
  "706": {
    jaName: "ヌメルゴン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/706.png",
  },
  "707": {
    jaName: "クレッフィ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/707.png",
  },
  "708": {
    jaName: "ボクレー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/708.png",
  },
  "709": {
    jaName: "オーロット",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/709.png",
  },
  "710": {
    jaName: "バケッチャ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/710.png",
  },
  "711": {
    jaName: "パンプジン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/711.png",
  },
  "712": {
    jaName: "カチコール",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/712.png",
  },
  "713": {
    jaName: "クレベース",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/713.png",
  },
  "714": {
    jaName: "オンバット",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/714.png",
  },
  "715": {
    jaName: "オンバーン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/715.png",
  },
  "716": {
    jaName: "ゼルネアス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/716.png",
  },
  "717": {
    jaName: "イベルタル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/717.png",
  },
  "718": {
    jaName: "ジガルデ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/718.png",
  },
  "719": {
    jaName: "ディアンシー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/719.png",
  },
  "720": {
    jaName: "フーパ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/720.png",
  },
  "721": {
    jaName: "ボルケニオン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/721.png",
  },
  "722": {
    jaName: "モクロー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/722.png",
  },
  "723": {
    jaName: "フクスロー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/723.png",
  },
  "724": {
    jaName: "ジュナイパー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/724.png",
  },
  "725": {
    jaName: "ニャビー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/725.png",
  },
  "726": {
    jaName: "ニャヒート",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/726.png",
  },
  "727": {
    jaName: "ガオガエン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/727.png",
  },
  "728": {
    jaName: "アシマリ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/728.png",
  },
  "729": {
    jaName: "オシャマリ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/729.png",
  },
  "730": {
    jaName: "アシレーヌ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/730.png",
  },
  "731": {
    jaName: "ツツケラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/731.png",
  },
  "732": {
    jaName: "ケララッパ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/732.png",
  },
  "733": {
    jaName: "ドデカバシ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/733.png",
  },
  "734": {
    jaName: "ヤングース",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/734.png",
  },
  "735": {
    jaName: "デカグース",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/735.png",
  },
  "736": {
    jaName: "アゴジムシ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/736.png",
  },
  "737": {
    jaName: "デンヂムシ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/737.png",
  },
  "738": {
    jaName: "クワガノン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/738.png",
  },
  "739": {
    jaName: "マケンカニ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/739.png",
  },
  "740": {
    jaName: "ケケンカニ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/740.png",
  },
  "741": {
    jaName: "オドリドリ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/741.png",
  },
  "742": {
    jaName: "アブリー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/742.png",
  },
  "743": {
    jaName: "アブリボン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/743.png",
  },
  "744": {
    jaName: "イワンコ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/744.png",
  },
  "745": {
    jaName: "ルガルガン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/745.png",
  },
  "746": {
    jaName: "ヨワシ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/746.png",
  },
  "747": {
    jaName: "ヒドイデ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/747.png",
  },
  "748": {
    jaName: "ドヒドイデ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/748.png",
  },
  "749": {
    jaName: "ドロバンコ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/749.png",
  },
  "750": {
    jaName: "バンバドロ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/750.png",
  },
  "751": {
    jaName: "シズクモ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/751.png",
  },
  "752": {
    jaName: "オニシズクモ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/752.png",
  },
  "753": {
    jaName: "カリキリ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/753.png",
  },
  "754": {
    jaName: "ラランテス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/754.png",
  },
  "755": {
    jaName: "ネマシュ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/755.png",
  },
  "756": {
    jaName: "マシェード",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/756.png",
  },
  "757": {
    jaName: "ヤトウモリ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/757.png",
  },
  "758": {
    jaName: "エンニュート",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/758.png",
  },
  "759": {
    jaName: "ヌイコグマ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/759.png",
  },
  "760": {
    jaName: "キテルグマ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/760.png",
  },
  "761": {
    jaName: "アマカジ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/761.png",
  },
  "762": {
    jaName: "アママイコ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/762.png",
  },
  "763": {
    jaName: "アマージョ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/763.png",
  },
  "764": {
    jaName: "キュワワー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/764.png",
  },
  "765": {
    jaName: "ヤレユータン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/765.png",
  },
  "766": {
    jaName: "ナゲツケサル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/766.png",
  },
  "767": {
    jaName: "コソクムシ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/767.png",
  },
  "768": {
    jaName: "グソクムシャ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/768.png",
  },
  "769": {
    jaName: "スナバァ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/769.png",
  },
  "770": {
    jaName: "シロデスナ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/770.png",
  },
  "771": {
    jaName: "ナマコブシ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/771.png",
  },
  "772": {
    jaName: "タイプ：ヌル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/772.png",
  },
  "773": {
    jaName: "シルヴァディ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/773.png",
  },
  "774": {
    jaName: "メテノ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/774.png",
  },
  "775": {
    jaName: "ネッコアラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/775.png",
  },
  "776": {
    jaName: "バクガメス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/776.png",
  },
  "777": {
    jaName: "トゲデマル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/777.png",
  },
  "778": {
    jaName: "ミミッキュ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/778.png",
  },
  "779": {
    jaName: "ハギギシリ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/779.png",
  },
  "780": {
    jaName: "ジジーロン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/780.png",
  },
  "781": {
    jaName: "ダダリン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/781.png",
  },
  "782": {
    jaName: "ジャラコ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/782.png",
  },
  "783": {
    jaName: "ジャランゴ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/783.png",
  },
  "784": {
    jaName: "ジャラランガ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/784.png",
  },
  "785": {
    jaName: "カプ・コケコ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/785.png",
  },
  "786": {
    jaName: "カプ・テテフ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/786.png",
  },
  "787": {
    jaName: "カプ・ブルル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/787.png",
  },
  "788": {
    jaName: "カプ・レヒレ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/788.png",
  },
  "789": {
    jaName: "コスモッグ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/789.png",
  },
  "790": {
    jaName: "コスモウム",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/790.png",
  },
  "791": {
    jaName: "ソルガレオ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/791.png",
  },
  "792": {
    jaName: "ルナアーラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/792.png",
  },
  "793": {
    jaName: "ウツロイド",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/793.png",
  },
  "794": {
    jaName: "マッシブーン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/794.png",
  },
  "795": {
    jaName: "フェローチェ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/795.png",
  },
  "796": {
    jaName: "デンジュモク",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/796.png",
  },
  "797": {
    jaName: "テッカグヤ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/797.png",
  },
  "798": {
    jaName: "カミツルギ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/798.png",
  },
  "799": {
    jaName: "アクジキング",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/799.png",
  },
  "800": {
    jaName: "ネクロズマ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/800.png",
  },
  "801": {
    jaName: "マギアナ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/801.png",
  },
  "802": {
    jaName: "マーシャドー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/802.png",
  },
  "803": {
    jaName: "ベベノム",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/803.png",
  },
  "804": {
    jaName: "アーゴヨン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/804.png",
  },
  "805": {
    jaName: "ツンデツンデ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/805.png",
  },
  "806": {
    jaName: "ズガドーン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/806.png",
  },
  "807": {
    jaName: "ゼラオラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/807.png",
  },
  "808": {
    jaName: "メルタン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/808.png",
  },
  "809": {
    jaName: "メルメタル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/809.png",
  },
  "810": {
    jaName: "サルノリ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/810.png",
  },
  "811": {
    jaName: "バチンキー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/811.png",
  },
  "812": {
    jaName: "ゴリランダー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/812.png",
  },
  "813": {
    jaName: "ヒバニー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/813.png",
  },
  "814": {
    jaName: "ラビフット",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/814.png",
  },
  "815": {
    jaName: "エースバーン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/815.png",
  },
  "816": {
    jaName: "メッソン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/816.png",
  },
  "817": {
    jaName: "ジメレオン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/817.png",
  },
  "818": {
    jaName: "インテレオン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/818.png",
  },
  "819": {
    jaName: "ホシガリス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/819.png",
  },
  "820": {
    jaName: "ヨクバリス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/820.png",
  },
  "821": {
    jaName: "ココガラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/821.png",
  },
  "822": {
    jaName: "アオガラス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/822.png",
  },
  "823": {
    jaName: "アーマーガア",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/823.png",
  },
  "824": {
    jaName: "サッチムシ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/824.png",
  },
  "825": {
    jaName: "レドームシ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/825.png",
  },
  "826": {
    jaName: "イオルブ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/826.png",
  },
  "827": {
    jaName: "クスネ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/827.png",
  },
  "828": {
    jaName: "フォクスライ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/828.png",
  },
  "829": {
    jaName: "ヒメンカ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/829.png",
  },
  "830": {
    jaName: "ワタシラガ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/830.png",
  },
  "831": {
    jaName: "ウールー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/831.png",
  },
  "832": {
    jaName: "バイウールー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/832.png",
  },
  "833": {
    jaName: "カムカメ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/833.png",
  },
  "834": {
    jaName: "カジリガメ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/834.png",
  },
  "835": {
    jaName: "ワンパチ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/835.png",
  },
  "836": {
    jaName: "パルスワン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/836.png",
  },
  "837": {
    jaName: "タンドン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/837.png",
  },
  "838": {
    jaName: "トロッゴン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/838.png",
  },
  "839": {
    jaName: "セキタンザン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/839.png",
  },
  "840": {
    jaName: "カジッチュ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/840.png",
  },
  "841": {
    jaName: "アップリュー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/841.png",
  },
  "842": {
    jaName: "タルップル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/842.png",
  },
  "843": {
    jaName: "スナヘビ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/843.png",
  },
  "844": {
    jaName: "サダイジャ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/844.png",
  },
  "845": {
    jaName: "ウッウ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/845.png",
  },
  "846": {
    jaName: "サシカマス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/846.png",
  },
  "847": {
    jaName: "カマスジョー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/847.png",
  },
  "848": {
    jaName: "エレズン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/848.png",
  },
  "849": {
    jaName: "ストリンダー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/849.png",
  },
  "850": {
    jaName: "ヤクデ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/850.png",
  },
  "851": {
    jaName: "マルヤクデ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/851.png",
  },
  "852": {
    jaName: "タタッコ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/852.png",
  },
  "853": {
    jaName: "オトスパス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/853.png",
  },
  "854": {
    jaName: "ヤバチャ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/854.png",
  },
  "855": {
    jaName: "ポットデス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/855.png",
  },
  "856": {
    jaName: "ミブリム",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/856.png",
  },
  "857": {
    jaName: "テブリム",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/857.png",
  },
  "858": {
    jaName: "ブリムオン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/858.png",
  },
  "859": {
    jaName: "ベロバー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/859.png",
  },
  "860": {
    jaName: "ギモー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/860.png",
  },
  "861": {
    jaName: "オーロンゲ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/861.png",
  },
  "862": {
    jaName: "タチフサグマ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/862.png",
  },
  "863": {
    jaName: "ニャイキング",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/863.png",
  },
  "864": {
    jaName: "サニゴーン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/864.png",
  },
  "865": {
    jaName: "ネギガナイト",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/865.png",
  },
  "866": {
    jaName: "バリコオル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/866.png",
  },
  "867": {
    jaName: "デスバーン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/867.png",
  },
  "868": {
    jaName: "マホミル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/868.png",
  },
  "869": {
    jaName: "マホイップ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/869.png",
  },
  "870": {
    jaName: "タイレーツ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/870.png",
  },
  "871": {
    jaName: "バチンウニ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/871.png",
  },
  "872": {
    jaName: "ユキハミ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/872.png",
  },
  "873": {
    jaName: "モスノウ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/873.png",
  },
  "874": {
    jaName: "イシヘンジン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/874.png",
  },
  "875": {
    jaName: "コオリッポ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/875.png",
  },
  "876": {
    jaName: "イエッサン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/876.png",
  },
  "877": {
    jaName: "モルペコ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/877.png",
  },
  "878": {
    jaName: "ゾウドウ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/878.png",
  },
  "879": {
    jaName: "ダイオウドウ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/879.png",
  },
  "880": {
    jaName: "パッチラゴン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/880.png",
  },
  "881": {
    jaName: "パッチルドン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/881.png",
  },
  "882": {
    jaName: "ウオノラゴン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/882.png",
  },
  "883": {
    jaName: "ウオチルドン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/883.png",
  },
  "884": {
    jaName: "ジュラルドン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/884.png",
  },
  "885": {
    jaName: "ドラメシヤ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/885.png",
  },
  "886": {
    jaName: "ドロンチ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/886.png",
  },
  "887": {
    jaName: "ドラパルト",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/887.png",
  },
  "888": {
    jaName: "ザシアン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/888.png",
  },
  "889": {
    jaName: "ザマゼンタ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/889.png",
  },
  "890": {
    jaName: "ムゲンダイナ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/890.png",
  },
  "891": {
    jaName: "ダクマ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/891.png",
  },
  "892": {
    jaName: "ウーラオス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/892.png",
  },
  "893": {
    jaName: "ザルード",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/893.png",
  },
  "894": {
    jaName: "レジエレキ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/894.png",
  },
  "895": {
    jaName: "レジドラゴ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/895.png",
  },
  "896": {
    jaName: "ブリザポス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/896.png",
  },
  "897": {
    jaName: "レイスポス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/897.png",
  },
  "898": {
    jaName: "バドレックス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/898.png",
  },
  "899": {
    jaName: "アヤシシ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/899.png",
  },
  "900": {
    jaName: "バサギリ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/900.png",
  },
  "901": {
    jaName: "ガチグマ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/901.png",
  },
  "902": {
    jaName: "イダイトウ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/902.png",
  },
  "903": {
    jaName: "オオニューラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/903.png",
  },
  "904": {
    jaName: "ハリーマン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/904.png",
  },
  "905": {
    jaName: "ラブトロス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/905.png",
  },
  "906": {
    jaName: "ニャオハ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/906.png",
  },
  "907": {
    jaName: "ニャローテ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/907.png",
  },
  "908": {
    jaName: "マスカーニャ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/908.png",
  },
  "909": {
    jaName: "ホゲータ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/909.png",
  },
  "910": {
    jaName: "アチゲータ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/910.png",
  },
  "911": {
    jaName: "ラウドボーン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/911.png",
  },
  "912": {
    jaName: "クワッス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/912.png",
  },
  "913": {
    jaName: "ウェルカモ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/913.png",
  },
  "914": {
    jaName: "ウェーニバル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/914.png",
  },
  "915": {
    jaName: "グルトン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/915.png",
  },
  "916": {
    jaName: "パフュートン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/916.png",
  },
  "917": {
    jaName: "タマンチュラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/917.png",
  },
  "918": {
    jaName: "ワナイダー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/918.png",
  },
  "919": {
    jaName: "マメバッタ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/919.png",
  },
  "920": {
    jaName: "エクスレッグ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/920.png",
  },
  "921": {
    jaName: "パモ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/921.png",
  },
  "922": {
    jaName: "パモット",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/922.png",
  },
  "923": {
    jaName: "パーモット",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/923.png",
  },
  "924": {
    jaName: "ワッカネズミ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/924.png",
  },
  "925": {
    jaName: "イッカネズミ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/925.png",
  },
  "926": {
    jaName: "パピモッチ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/926.png",
  },
  "927": {
    jaName: "バウッツェル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/927.png",
  },
  "928": {
    jaName: "ミニーブ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/928.png",
  },
  "929": {
    jaName: "オリーニョ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/929.png",
  },
  "930": {
    jaName: "オリーヴァ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/930.png",
  },
  "931": {
    jaName: "イキリンコ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/931.png",
  },
  "932": {
    jaName: "コジオ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/932.png",
  },
  "933": {
    jaName: "ジオヅム",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/933.png",
  },
  "934": {
    jaName: "キョジオーン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/934.png",
  },
  "935": {
    jaName: "カルボウ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/935.png",
  },
  "936": {
    jaName: "グレンアルマ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/936.png",
  },
  "937": {
    jaName: "ソウブレイズ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/937.png",
  },
  "938": {
    jaName: "ズピカ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/938.png",
  },
  "939": {
    jaName: "ハラバリー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/939.png",
  },
  "940": {
    jaName: "カイデン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/940.png",
  },
  "941": {
    jaName: "タイカイデン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/941.png",
  },
  "942": {
    jaName: "オラチフ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/942.png",
  },
  "943": {
    jaName: "マフィティフ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/943.png",
  },
  "944": {
    jaName: "シルシュルー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/944.png",
  },
  "945": {
    jaName: "タギングル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/945.png",
  },
  "946": {
    jaName: "アノクサ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/946.png",
  },
  "947": {
    jaName: "アノホラグサ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/947.png",
  },
  "948": {
    jaName: "ノノクラゲ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/948.png",
  },
  "949": {
    jaName: "リククラゲ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/949.png",
  },
  "950": {
    jaName: "ガケガニ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/950.png",
  },
  "951": {
    jaName: "カプサイジ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/951.png",
  },
  "952": {
    jaName: "スコヴィラン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/952.png",
  },
  "953": {
    jaName: "シガロコ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/953.png",
  },
  "954": {
    jaName: "ベラカス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/954.png",
  },
  "955": {
    jaName: "ヒラヒナ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/955.png",
  },
  "956": {
    jaName: "クエスパトラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/956.png",
  },
  "957": {
    jaName: "カヌチャン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/957.png",
  },
  "958": {
    jaName: "ナカヌチャン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/958.png",
  },
  "959": {
    jaName: "デカヌチャン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/959.png",
  },
  "960": {
    jaName: "ウミディグダ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/960.png",
  },
  "961": {
    jaName: "ウミトリオ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/961.png",
  },
  "962": {
    jaName: "オトシドリ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/962.png",
  },
  "963": {
    jaName: "ナミイルカ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/963.png",
  },
  "964": {
    jaName: "イルカマン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/964.png",
  },
  "965": {
    jaName: "ブロロン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/965.png",
  },
  "966": {
    jaName: "ブロロローム",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/966.png",
  },
  "967": {
    jaName: "モトトカゲ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/967.png",
  },
  "968": {
    jaName: "ミミズズ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/968.png",
  },
  "969": {
    jaName: "キラーメ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/969.png",
  },
  "970": {
    jaName: "キラフロル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/970.png",
  },
  "971": {
    jaName: "ボチ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/971.png",
  },
  "972": {
    jaName: "ハカドッグ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/972.png",
  },
  "973": {
    jaName: "カラミンゴ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/973.png",
  },
  "974": {
    jaName: "アルクジラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/974.png",
  },
  "975": {
    jaName: "ハルクジラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/975.png",
  },
  "976": {
    jaName: "ミガルーサ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/976.png",
  },
  "977": {
    jaName: "ヘイラッシャ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/977.png",
  },
  "978": {
    jaName: "シャリタツ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/978.png",
  },
  "979": {
    jaName: "コノヨザル",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/979.png",
  },
  "980": {
    jaName: "ドオー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/980.png",
  },
  "981": {
    jaName: "リキキリン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/981.png",
  },
  "982": {
    jaName: "ノココッチ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/982.png",
  },
  "983": {
    jaName: "ドドゲザン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/983.png",
  },
  "984": {
    jaName: "イダイナキバ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/984.png",
  },
  "985": {
    jaName: "サケブシッポ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/985.png",
  },
  "986": {
    jaName: "アラブルタケ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/986.png",
  },
  "987": {
    jaName: "ハバタクカミ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/987.png",
  },
  "988": {
    jaName: "チヲハウハネ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/988.png",
  },
  "989": {
    jaName: "スナノケガワ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/989.png",
  },
  "990": {
    jaName: "テツノワダチ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/990.png",
  },
  "991": {
    jaName: "テツノツツミ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/991.png",
  },
  "992": {
    jaName: "テツノカイナ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/992.png",
  },
  "993": {
    jaName: "テツノコウベ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/993.png",
  },
  "994": {
    jaName: "テツノドクガ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/994.png",
  },
  "995": {
    jaName: "テツノイバラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/995.png",
  },
  "996": {
    jaName: "セビエ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/996.png",
  },
  "997": {
    jaName: "セゴール",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/997.png",
  },
  "998": {
    jaName: "セグレイブ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/998.png",
  },
  "999": {
    jaName: "コレクレー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/999.png",
  },
  "1000": {
    jaName: "サーフゴー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1000.png",
  },
  "1001": {
    jaName: "チオンジェン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1001.png",
  },
  "1002": {
    jaName: "パオジアン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1002.png",
  },
  "1003": {
    jaName: "ディンルー",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1003.png",
  },
  "1004": {
    jaName: "イーユイ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1004.png",
  },
  "1005": {
    jaName: "トドロクツキ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1005.png",
  },
  "1006": {
    jaName: "テツノブジン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1006.png",
  },
  "1007": {
    jaName: "コライドン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1007.png",
  },
  "1008": {
    jaName: "ミライドン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1008.png",
  },
  "1009": {
    jaName: "ウネルミナモ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1009.png",
  },
  "1010": {
    jaName: "テツノイサハ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1010.png",
  },
  "1011": {
    jaName: "カミッチュ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1011.png",
  },
  "1012": {
    jaName: "チャデス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1012.png",
  },
  "1013": {
    jaName: "ヤバソチャ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1013.png",
  },
  "1014": {
    jaName: "イイネイヌ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1014.png",
  },
  "1015": {
    jaName: "マシマシラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1015.png",
  },
  "1016": {
    jaName: "キチキギス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1016.png",
  },
  "1017": {
    jaName: "オーガポン",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1017.png",
  },
  "1018": {
    jaName: "ブリジュラス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1018.png",
  },
  "1019": {
    jaName: "カミツオロチ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1019.png",
  },
  "1020": {
    jaName: "ウガツホムラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1020.png",
  },
  "1021": {
    jaName: "タケルライコ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1021.png",
  },
  "1022": {
    jaName: "テツノイワオ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1022.png",
  },
  "1023": {
    jaName: "テツノカシラ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1023.png",
  },
  "1024": {
    jaName: "テラパゴス",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1024.png",
  },
  "1025": {
    jaName: "モモワロウ",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1025.png",
  },
};
