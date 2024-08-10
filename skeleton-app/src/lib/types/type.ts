export interface ResponseTypeJson {
  id: number;
  names: Array<{
    language: {
      name: string;
    };
    name: string;
  }>;
  damage_relations: {
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
  };
}

export type TypeName =
  | "normal"
  | "fighting"
  | "flying"
  | "poison"
  | "ground"
  | "rock"
  | "bug"
  | "ghost"
  | "steel"
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "psychic"
  | "ice"
  | "dragon"
  | "dark"
  | "fairy"
  | "null";

export interface TypeData {
  id: number;
  enName: TypeName;
  jaName: string;
}

export interface StaticTypeData {
  color: string;
  url: string;
}

export type DamageRatio = "double" | "half" | "no" | "default";
