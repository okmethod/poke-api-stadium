import type { TypeName, TypeData, DamageRatio } from "$lib/types/type";
import { fetch as fetchTypeData } from "$lib/constants/staticTypeData";

export function getDamageRatio(attackTypeName: TypeName, diffenceTypeName: TypeName): DamageRatio {
  const typeData = fetchTypeData(attackTypeName) as TypeData;
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
