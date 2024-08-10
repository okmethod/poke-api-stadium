import type { TypeData, DamageRatio } from "$lib/types/type";
import { STATIC_TYPE_DICT } from "$lib/constants/staticTypeData";

export function getDamageRatio(attackSideType: TypeData, diffenceSideType: TypeData): DamageRatio {
  const typeData = STATIC_TYPE_DICT[attackSideType.enName] as TypeData;
  if (!typeData) {
    return "default";
  }
  const { doubleDamageTo, halfDamageTo, noDamageTo } = typeData.damageRelations;
  const damageRelations = {
    double: doubleDamageTo,
    half: halfDamageTo,
    no: noDamageTo,
  };
  for (const [ratio, types] of Object.entries(damageRelations)) {
    if (types.includes(diffenceSideType.enName)) {
      return ratio as DamageRatio;
    }
  }
  return "default";
}

export default getDamageRatio;
