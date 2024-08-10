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

export interface Type {
  id: number;
  enName: string;
  jaName: string;
}

export type DamageRatio = "double" | "half" | "no" | "default";

export interface TypeData {
  color: string;
  url: string;
}
