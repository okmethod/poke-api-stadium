import type { TypeName, TypeData, DamageRatio } from "$lib/types/type";
import { STATIC_TYPE_DICT } from "$lib/constants/staticTypeData";

export function getDamageRatio(attackTypeName: TypeName, diffenceTypeName: TypeName): DamageRatio {
  const typeData = STATIC_TYPE_DICT[attackTypeName] as TypeData;
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
    if (types.includes(diffenceTypeName)) {
      return ratio as DamageRatio;
    }
  }
  return "default";
}

export default getDamageRatio;
