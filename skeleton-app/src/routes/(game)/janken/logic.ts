import type { TypeName, TypeData, TypeColors, DamageRatio } from "$lib/types/type";
import type { PokeItem } from "./+page";

export type Result = "win" | "lose" | "draw";

export function judgeAttackSide(
  ownPokeItem: PokeItem,
  opoPokeItem: PokeItem,
  ownPokeType: TypeData & TypeColors,
  opoPokeType: TypeData & TypeColors,
): {
  isOwnAttack: boolean;
  attackPokeName: string;
  attackType: TypeData & TypeColors;
  defenseType: TypeData & TypeColors;
} {
  const isOwnAttack = ownPokeItem.speed >= opoPokeItem.speed;
  return {
    isOwnAttack,
    attackPokeName: isOwnAttack ? ownPokeItem.jaName : opoPokeItem.jaName,
    attackType: isOwnAttack ? ownPokeType : opoPokeType,
    defenseType: isOwnAttack ? opoPokeType : ownPokeType,
  };
}

export function judgeJankenResult(
  isOwnAttack: boolean,
  attackType: TypeData & TypeColors,
  defenseType: TypeData & TypeColors,
): {
  damageRatio: DamageRatio;
  result: Result;
} {
  const damageRatio = getDamageRatio(attackType, defenseType.enName);
  const resultMap: Record<DamageRatio, Result> = {
    double: isOwnAttack ? "win" : "lose",
    half: isOwnAttack ? "lose" : "win",
    no: isOwnAttack ? "lose" : "win",
    default: "draw",
  };
  return {
    damageRatio,
    result: resultMap[damageRatio],
  };
}

function getDamageRatio(attackType: TypeData, defenseTypeName: TypeName): DamageRatio {
  const { doubleDamageTo, halfDamageTo, noDamageTo } = attackType.damageRelations;
  const damageRelations = {
    double: doubleDamageTo,
    half: halfDamageTo,
    no: noDamageTo,
  };
  for (const [ratio, types] of Object.entries(damageRelations)) {
    if (types.includes(defenseTypeName)) {
      return ratio as DamageRatio;
    }
  }
  return "default";
}
