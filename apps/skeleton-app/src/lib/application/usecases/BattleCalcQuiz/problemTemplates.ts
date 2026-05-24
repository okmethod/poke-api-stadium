/**
 * バトル計算ドリルの問題テンプレート集
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Utility)
 * - ROLE: 問題テンプレートの定義。PokeData から CalcProblem を生成するファクトリ関数群
 * - ALLOWED: ドメイン層への依存、アプリ層の型への依存
 * - FORBIDDEN: インフラ層への直接依存、プレゼン層への依存
 *
 * ## 実際のポケモンダメージ計算式（第5世代以降）
 *
 * ```
 * ダメージ = floor( floor( floor( (2×L÷5+2) × P × A ÷ D ) ÷ 50 ) + 2 ) × 各種補正
 * ```
 *
 * |変数|意味|
 * |---|---|
 * | L | 攻撃側のレベル |
 * | P | わざのいりょく |
 * | A | こうげき（物理）または とくこう（特殊）|
 * | D | ぼうぎょ（物理）または とくぼう（特殊）|
 *
 * 補正の種類（後付けの掛け算）:
 * - タイプ一致 STAB: ×3÷2
 * - タイプ相性（こうかばつぐん / いまひとつ）: ×2 / ×4 / ÷2 / ÷4
 * - 急所: ×1.5（第6世代以降）
 * - やけど: ÷2
 * - スリップダメージ（どく・すなあらし等）: 最大HP ÷ 8 または ÷ 16
 *
 * ## 本ドリルでの簡略化方針
 *
 * 子ども向けの算数ドリルとして、以下の方針で実際の計算式を簡略化する:
 * - `(2×L÷5+2) ÷ 50` の部分（レベル係数）は省略し、`A × P ÷ D` を基本形とする
 * - 各補正係数（STAB・タイプ相性・スリップ等）はそのままテンプレートのテーマとして採用する
 * - 答えが必ず正の整数になるよう、ポケモンペアや係数を選定する
 *
 * ## 難易度の構造
 *
 * 全体の計算式は `のこりHP = B.hp − ( A × P ÷ D ) × タイプ倍率` と捉えられる。
 * 難易度ごとに「式の一部を計算済みの値に置き換えて」出題する:
 * - EASY:   `B.hp − ダメージ`           ← ダメージは所与
 * - NORMAL: `ベースダメージ × 倍率`       ← ベースダメージは所与
 * - HARD:   `A × P ÷ D` (± 追加補正)    ← 何も固定しない
 *
 * ## テンプレートの追加方法
 * 1. PROBLEM_TEMPLATES 配列に新しいオブジェクトを追加する
 * 2. generate(pair) が CalcProblem を返せない場合は null を返す（Facade が別テンプレートにフォールバック）
 */

import type { PokeData, PokeStats } from "$lib/domain/models/PokeData";
import { pokeStatJaName } from "$lib/domain/models/PokeData";
import { num, opNode, evalNode, type ExprNode } from "$lib/domain/models/Arithmetic";
import { pickRandomElementsFromArray } from "$lib/shared/utils/randomUtils";
import type { CalcProblem } from "./store";

export type Difficulty = "easy" | "normal" | "hard";

/** 問題テンプレートの定義型 */
export type ProblemTemplate = {
  readonly id: string;
  readonly difficulty: Difficulty;
  /** PokeData ペアから CalcProblem を生成する。生成できない場合は null を返す */
  readonly generate: (pair: readonly [PokeData, PokeData]) => CalcProblem | null;
};

// --- ヘルパー ---

function makeProblem(situation: string, expr: ExprNode, answerLabel: string): CalcProblem {
  return { situation, expr, answer: evalNode(expr), answerLabel };
}

/** "ポケモン名のステータス名(値)" 形式のラベルを生成 */
function statLabel(poke: PokeData, key: keyof PokeStats): string {
  return `${poke.jaName}の${pokeStatJaName(key)}(${poke.stats[key]})`;
}

/**
 * atkKey > defKey になる攻守の向きを選ぶ
 * pair[0]→pair[1]を試み、無理なら pair[1]→pair[0] を試みる
 */
function pickAtkDef(
  pair: readonly [PokeData, PokeData],
  atkKey: keyof PokeStats,
  defKey: keyof PokeStats,
): readonly [PokeData, PokeData] | null {
  if (pair[0].stats[atkKey] > pair[1].stats[defKey]) return [pair[0], pair[1]];
  if (pair[1].stats[atkKey] > pair[0].stats[defKey]) return [pair[1], pair[0]];
  return null;
}

/** わざのいりょく候補（一般的なわざの基本威力値） */
const MOVE_POWERS = [40, 50, 60, 70, 80, 90, 100] as const;

/** atk × P が def で割り切れる P をランダム順で探す */
function findDivisiblePower(atk: number, def: number): number | null {
  const shuffled = pickRandomElementsFromArray([...MOVE_POWERS], MOVE_POWERS.length);
  return shuffled.find((p) => (atk * p) % def === 0) ?? null;
}

// --- テンプレート定義 ---

export const PROBLEM_TEMPLATES: readonly ProblemTemplate[] = [
  // ===== EASY（ステータスの比較・HP操作） =====
  // ダメージの計算式には踏み込まず、ステータスをそのまま足したり引いたりする。

  {
    id: "speed_diff",
    difficulty: "easy",
    generate(pair) {
      const [faster, slower] =
        pair[0].stats.speed > pair[1].stats.speed
          ? [pair[0], pair[1]]
          : pair[1].stats.speed > pair[0].stats.speed
            ? [pair[1], pair[0]]
            : [null, null];
      if (!faster || !slower) return null;
      return makeProblem(
        `${faster.jaName}の方が速い！すばやさの差は？`,
        opNode(
          "sub",
          num(statLabel(faster, "speed"), faster.stats.speed),
          num(statLabel(slower, "speed"), slower.stats.speed),
        ),
        "すばやさの差",
      );
    },
  },

  {
    id: "total_hp",
    difficulty: "easy",
    generate(pair) {
      return makeProblem(
        `${pair[0].jaName}と${pair[1].jaName}がなかまになった！`,
        opNode("add", num(statLabel(pair[0], "hp"), pair[0].stats.hp), num(statLabel(pair[1], "hp"), pair[1].stats.hp)),
        "ふたりのHP合計",
      );
    },
  },

  {
    id: "hp_remaining",
    difficulty: "easy",
    generate(pair) {
      // attack < hp になる向きを選ぶ（ダメージ < HP を保証）
      const [atker, defender] =
        pair[0].stats.attack < pair[1].stats.hp
          ? [pair[0], pair[1]]
          : pair[1].stats.attack < pair[0].stats.hp
            ? [pair[1], pair[0]]
            : [null, null];
      if (!atker || !defender) return null;
      const damage = atker.stats.attack;
      const hp = defender.stats.hp;
      return makeProblem(
        `${atker.jaName}の攻撃で${defender.jaName}が${damage}のダメージをうけた！`,
        opNode("sub", num(`${defender.jaName}のHP(${hp})`, hp), num(`ダメージ(${damage})`, damage)),
        "のこりHP",
      );
    },
  },

  // ===== NORMAL（所与のベースダメージに補正を適用） =====
  // 「ベースダメージ」は計算済みの所与の値として与え、タイプ倍率を掛け算・割り算する。

  {
    id: "type_x2",
    difficulty: "normal",
    generate(pair) {
      const base = pair[0].stats.attack;
      return makeProblem(
        `こうかばつぐん！`,
        opNode("mul", num(`ベースダメージ(${base})`, base), num("2", 2)),
        "実際のダメージ",
      );
    },
  },

  {
    id: "type_x4",
    difficulty: "normal",
    generate(pair) {
      const base = pair[0].stats.attack;
      return makeProblem(
        `ダブルこうかばつぐん！`,
        opNode("mul", num(`ベースダメージ(${base})`, base), num("4", 4)),
        "実際のダメージ",
      );
    },
  },

  {
    id: "type_div2",
    difficulty: "normal",
    generate(pair) {
      const raw = pair[0].stats.attack;
      // 偶数に切り上げて割り切れることを保証
      const base = raw % 2 === 0 ? raw : raw + 1;
      return makeProblem(
        `いまひとつ...`,
        opNode("div", num(`ベースダメージ(${base})`, base), num("2", 2)),
        "実際のダメージ",
      );
    },
  },

  {
    id: "type_div4",
    difficulty: "normal",
    generate(pair) {
      const raw = pair[0].stats.attack;
      // 4の倍数に切り上げて割り切れることを保証
      const base = Math.ceil(raw / 4) * 4;
      return makeProblem(
        `ダブルいまひとつ...`,
        opNode("div", num(`ベースダメージ(${base})`, base), num("4", 4)),
        "実際のダメージ",
      );
    },
  },

  // ===== HARD（A × P ÷ D を基本形とした本式に近い計算） =====
  // 簡略化した基本ダメージ式 A × P ÷ D を用いる。
  // 割り切れる P が見つからない場合は null を返す。

  {
    id: "formula_phys",
    difficulty: "hard",
    generate(pair) {
      const combo = pickAtkDef(pair, "attack", "defense");
      if (!combo) return null;
      const [atker, defender] = combo;
      const atk = atker.stats.attack;
      const def = defender.stats.defense;
      const p = findDivisiblePower(atk, def);
      if (!p) return null;
      return makeProblem(
        `${atker.jaName}がいりょく${p}のわざで${defender.jaName}にこうげき！`,
        opNode(
          "div",
          opNode("mul", num(statLabel(atker, "attack"), atk), num(`わざのいりょく(${p})`, p)),
          num(statLabel(defender, "defense"), def),
        ),
        "ダメージ",
      );
    },
  },

  {
    id: "formula_sp",
    difficulty: "hard",
    generate(pair) {
      const combo = pickAtkDef(pair, "spAtk", "spDef");
      if (!combo) return null;
      const [atker, defender] = combo;
      const atk = atker.stats.spAtk;
      const def = defender.stats.spDef;
      const p = findDivisiblePower(atk, def);
      if (!p) return null;
      return makeProblem(
        `${atker.jaName}がいりょく${p}のとくしゅわざで${defender.jaName}にこうげき！`,
        opNode(
          "div",
          opNode("mul", num(statLabel(atker, "spAtk"), atk), num(`わざのいりょく(${p})`, p)),
          num(statLabel(defender, "spDef"), def),
        ),
        "ダメージ",
      );
    },
  },

  {
    id: "formula_x2",
    difficulty: "hard",
    generate(pair) {
      const combo = pickAtkDef(pair, "attack", "defense");
      if (!combo) return null;
      const [atker, defender] = combo;
      const atk = atker.stats.attack;
      const def = defender.stats.defense;
      const p = findDivisiblePower(atk, def);
      if (!p) return null;
      return makeProblem(
        `こうかばつぐんのこうげき！`,
        opNode(
          "mul",
          opNode(
            "div",
            opNode("mul", num(statLabel(atker, "attack"), atk), num(`わざのいりょく(${p})`, p)),
            num(statLabel(defender, "defense"), def),
          ),
          num("2", 2),
        ),
        "実際のダメージ",
      );
    },
  },

  {
    id: "hp_after",
    difficulty: "hard",
    generate(pair) {
      const combo = pickAtkDef(pair, "attack", "defense");
      if (!combo) return null;
      const [atker, defender] = combo;
      const atk = atker.stats.attack;
      const def = defender.stats.defense;
      const p = findDivisiblePower(atk, def);
      if (!p) return null;
      const damage = (atk * p) / def;
      const hp = defender.stats.hp;
      if (hp <= damage) return null;
      return makeProblem(
        `${defender.jaName}がダメージをうけた！のこりHPは？`,
        opNode(
          "sub",
          num(`${defender.jaName}のHP(${hp})`, hp),
          opNode(
            "div",
            opNode("mul", num(statLabel(atker, "attack"), atk), num(`わざのいりょく(${p})`, p)),
            num(statLabel(defender, "defense"), def),
          ),
        ),
        "のこりHP",
      );
    },
  },
];
