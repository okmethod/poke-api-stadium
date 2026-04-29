/**
 * ポケモンのバージョン情報
 */

/** PokeAPI に登録されているゲームバージョン名（英語スラッグ） */
export type VersionName =
  | "red"
  | "blue"
  | "yellow"
  | "gold"
  | "silver"
  | "crystal"
  | "ruby"
  | "sapphire"
  | "emerald"
  | "firered"
  | "leafgreen"
  | "diamond"
  | "pearl"
  | "platinum"
  | "heartgold"
  | "soulsilver"
  | "black"
  | "white"
  | "black-2"
  | "white-2"
  | "colosseum"
  | "xd"
  | "x"
  | "y"
  | "omega-ruby"
  | "alpha-sapphire"
  | "sun"
  | "moon"
  | "ultra-sun"
  | "ultra-moon"
  | "lets-go-pikachu"
  | "lets-go-eevee"
  | "sword"
  | "shield"
  | "the-isle-of-armor"
  | "the-crown-tundra"
  | "brilliant-diamond"
  | "shining-pearl"
  | "legends-arceus"
  | "scarlet"
  | "violet"
  | "the-teal-mask"
  | "the-indigo-disk";

const VERSION_JA: Record<VersionName, string> = {
  red: "赤",
  blue: "青",
  yellow: "黄",
  gold: "金",
  silver: "銀",
  crystal: "クリスタル",
  ruby: "ルビー",
  sapphire: "サファイア",
  emerald: "エメラルド",
  firered: "ファイアレッド",
  leafgreen: "リーフグリーン",
  diamond: "ダイヤモンド",
  pearl: "パール",
  platinum: "プラチナ",
  heartgold: "ハートゴールド",
  soulsilver: "ソウルシルバー",
  black: "ブラック",
  white: "ホワイト",
  "black-2": "ブラック2",
  "white-2": "ホワイト2",
  colosseum: "コロシアム",
  xd: "XD",
  x: "X",
  y: "Y",
  "omega-ruby": "オメガルビー",
  "alpha-sapphire": "アルファサファイア",
  sun: "サン",
  moon: "ムーン",
  "ultra-sun": "ウルトラサン",
  "ultra-moon": "ウルトラムーン",
  "lets-go-pikachu": "Let's Go! ピカチュウ",
  "lets-go-eevee": "Let's Go! イーブイ",
  sword: "ソード",
  shield: "シールド",
  "the-isle-of-armor": "鎧の孤島",
  "the-crown-tundra": "冠の雪原",
  "brilliant-diamond": "ブリリアントダイヤモンド",
  "shining-pearl": "シャイニングパール",
  "legends-arceus": "レジェンズ アルセウス",
  scarlet: "スカーレット",
  violet: "バイオレット",
  "the-teal-mask": "碧の仮面",
  "the-indigo-disk": "藍の円盤",
};

/** バージョン名に対応する日本語ラベルを返す。未登録の場合は null（APIを使わない静的ルックアップ用） */
export function versionJaLabel(name: string): string | null {
  return VERSION_JA[name as VersionName] ?? null;
}
