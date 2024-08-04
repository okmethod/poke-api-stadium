import { getType } from "$lib/api/getType.client";
import type { Type, DamageRatio } from "$lib/types/type";

export async function getDamageRatio(
  fetchFunction: typeof window.fetch,
  attackSideType: Type,
  diffenceSideType: Type,
): Promise<DamageRatio> {
  const typeData = await getType(fetchFunction, attackSideType.id.toString());
  if (!typeData) {
    return "other";
  }
  const { double_damage_to, half_damage_to, no_damage_to } = typeData.damage_relations;
  const damageRelations = {
    double: double_damage_to.map((type) => type.name),
    half: half_damage_to.map((type) => type.name),
    no: no_damage_to.map((type) => type.name),
  };
  for (const [ratio, types] of Object.entries(damageRelations)) {
    if (types.includes(diffenceSideType.enName)) {
      return ratio as DamageRatio;
    }
  }
  return "other";
}

export default getDamageRatio;
