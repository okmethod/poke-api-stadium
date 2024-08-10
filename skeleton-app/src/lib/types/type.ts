export interface ResponseTypeJson {
  id: number;
  name: string;
  names: Array<{
    language: {
      name: string;
    };
    name: string;
  }>;
  damage_relations: DamageRelationsJson;
}

interface DamageRelationsJson {
  double_damage_from: Array<{
    name: string;
  }>;
  double_damage_to: Array<{
    name: string;
  }>;
  half_damage_from: Array<{
    name: string;
  }>;
  half_damage_to: Array<{
    name: string;
  }>;
  no_damage_from: Array<{
    name: string;
  }>;
  no_damage_to: Array<{
    name: string;
  }>;
}

interface DamageRelations {
  doubleDamageFrom: TypeName[];
  doubleDamageTo: TypeName[];
  halfDamageFrom: TypeName[];
  halfDamageTo: TypeName[];
  noDamageFrom: TypeName[];
  noDamageTo: TypeName[];
}

export enum TypeName {
  Normal = "normal",
  Fighting = "fighting",
  Flying = "flying",
  Poison = "poison",
  Ground = "ground",
  Rock = "rock",
  Bug = "bug",
  Ghost = "ghost",
  Steel = "steel",
  Fire = "fire",
  Water = "water",
  Grass = "grass",
  Electric = "electric",
  Psychic = "psychic",
  Ice = "ice",
  Dragon = "dragon",
  Dark = "dark",
  Fairy = "fairy",
  Unknown = "unknown",
}

export interface TypeData {
  id: number;
  enName: TypeName;
  jaName: string;
  damageRelations: DamageRelations;
}

export function convertToTypeData(typeJson: ResponseTypeJson): TypeData {
  return {
    id: typeJson.id,
    enName: typeJson.name as TypeName,
    jaName: typeJson.names.find((type) => type.language.name === "ja")?.name ?? "???",
    damageRelations: {
      doubleDamageFrom: typeJson.damage_relations.double_damage_from.map((type) => type.name as TypeName),
      doubleDamageTo: typeJson.damage_relations.double_damage_to.map((type) => type.name as TypeName),
      halfDamageFrom: typeJson.damage_relations.half_damage_from.map((type) => type.name as TypeName),
      halfDamageTo: typeJson.damage_relations.half_damage_to.map((type) => type.name as TypeName),
      noDamageFrom: typeJson.damage_relations.no_damage_from.map((type) => type.name as TypeName),
      noDamageTo: typeJson.damage_relations.no_damage_to.map((type) => type.name as TypeName),
    },
  };
}

type ReplaceTypeNameWithString<T> = {
  [K in keyof T]: T[K] extends TypeName ? string : T[K] extends TypeName[] ? string[] : ReplaceTypeNameWithString<T[K]>;
};
// 期待する値は TypeName だが、jsonファイルからstaticデータを作るためにstringにしている
export type StaticTypeData = ReplaceTypeNameWithString<TypeData>;

export type DamageRatio = "double" | "half" | "no" | "default";
