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

export const TYPE_DICT: { [name: string]: TypeData } = {
  normal: { color: "#FDF6CB", url: "https://pokeapi.co/api/v2/type/1/" },
  fighting: { color: "#EE8130", url: "https://pokeapi.co/api/v2/type/2/" },
  flying: { color: "#A2C3E8", url: "https://pokeapi.co/api/v2/type/3/" },
  poison: { color: "#A33EA1", url: "https://pokeapi.co/api/v2/type/4/" },
  ground: { color: "#9C7743", url: "https://pokeapi.co/api/v2/type/5/" },
  rock: { color: "#C0B88A", url: "https://pokeapi.co/api/v2/type/6/" },
  bug: { color: "#A6B91A", url: "https://pokeapi.co/api/v2/type/7/" },
  ghost: { color: "#735797", url: "https://pokeapi.co/api/v2/type/8/" },
  steel: { color: "#B7B7CE", url: "https://pokeapi.co/api/v2/type/9/" },
  fire: { color: "#D22E28", url: "https://pokeapi.co/api/v2/type/10/" },
  water: { color: "#5285C6", url: "https://pokeapi.co/api/v2/type/11/" },
  grass: { color: "#7AC74C", url: "https://pokeapi.co/api/v2/type/12/" },
  electric: { color: "#F7D02C", url: "https://pokeapi.co/api/v2/type/13/" },
  psychic: { color: "#F95587", url: "https://pokeapi.co/api/v2/type/14/" },
  ice: { color: "#6DC8EB", url: "https://pokeapi.co/api/v2/type/15/" },
  dragon: { color: "#545BA8", url: "https://pokeapi.co/api/v2/type/16/" },
  dark: { color: "#222222", url: "https://pokeapi.co/api/v2/type/17/" },
  fairy: { color: "#FCAFF9", url: "https://pokeapi.co/api/v2/type/18/" },
};

export const nullColor = "#888888";
