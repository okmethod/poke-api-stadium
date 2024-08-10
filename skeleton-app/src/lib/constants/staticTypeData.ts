import { TypeName } from "$lib/types/type";
import type { StaticTypeData } from "$lib/types/type";

export const TYPE_COLOR_DICT: Record<TypeName, string> = {
  normal: "#FDF6CB",
  fighting: "#EE8130",
  flying: "#A2C3E8",
  poison: "#A33EA1",
  ground: "#9C7743",
  rock: "#C0B88A",
  bug: "#A6B91A",
  ghost: "#735797",
  steel: "#B7B7CE",
  fire: "#D22E28",
  water: "#5285C6",
  grass: "#7AC74C",
  electric: "#F7D02C",
  psychic: "#F95587",
  ice: "#6DC8EB",
  dragon: "#545BA8",
  dark: "#222222",
  fairy: "#FCAFF9",
  unknown: "#888888",
};

// cheat画面から取得したstaticデータ
export const STATIC_TYPE_DICT: Record<TypeName, StaticTypeData> = {
  normal: {
    id: 1,
    enName: "normal",
    jaName: "ノーマル",
    damageRelations: {
      doubleDamageFrom: ["fighting"],
      doubleDamageTo: [],
      halfDamageFrom: [],
      halfDamageTo: ["rock", "steel"],
      noDamageFrom: ["ghost"],
      noDamageTo: ["ghost"],
    },
  },
  fighting: {
    id: 2,
    enName: "fighting",
    jaName: "かくとう",
    damageRelations: {
      doubleDamageFrom: ["flying", "psychic", "fairy"],
      doubleDamageTo: ["normal", "rock", "steel", "ice", "dark"],
      halfDamageFrom: ["rock", "bug", "dark"],
      halfDamageTo: ["flying", "poison", "bug", "psychic", "fairy"],
      noDamageFrom: [],
      noDamageTo: ["ghost"],
    },
  },
  flying: {
    id: 3,
    enName: "flying",
    jaName: "ひこう",
    damageRelations: {
      doubleDamageFrom: ["rock", "electric", "ice"],
      doubleDamageTo: ["fighting", "bug", "grass"],
      halfDamageFrom: ["fighting", "bug", "grass"],
      halfDamageTo: ["rock", "steel", "electric"],
      noDamageFrom: ["ground"],
      noDamageTo: [],
    },
  },
  poison: {
    id: 4,
    enName: "poison",
    jaName: "どく",
    damageRelations: {
      doubleDamageFrom: ["ground", "psychic"],
      doubleDamageTo: ["grass", "fairy"],
      halfDamageFrom: ["fighting", "poison", "bug", "grass", "fairy"],
      halfDamageTo: ["poison", "ground", "rock", "ghost"],
      noDamageFrom: [],
      noDamageTo: ["steel"],
    },
  },
  ground: {
    id: 5,
    enName: "ground",
    jaName: "じめん",
    damageRelations: {
      doubleDamageFrom: ["water", "grass", "ice"],
      doubleDamageTo: ["poison", "rock", "steel", "fire", "electric"],
      halfDamageFrom: ["poison", "rock"],
      halfDamageTo: ["bug", "grass"],
      noDamageFrom: ["electric"],
      noDamageTo: ["flying"],
    },
  },

  rock: {
    id: 6,
    enName: "rock",
    jaName: "いわ",
    damageRelations: {
      doubleDamageFrom: ["fighting", "ground", "steel", "water", "grass"],
      doubleDamageTo: ["flying", "bug", "fire", "ice"],
      halfDamageFrom: ["normal", "flying", "poison", "fire"],
      halfDamageTo: ["fighting", "ground", "steel"],
      noDamageFrom: [],
      noDamageTo: [],
    },
  },

  bug: {
    id: 7,
    enName: "bug",
    jaName: "むし",
    damageRelations: {
      doubleDamageFrom: ["flying", "rock", "fire"],
      doubleDamageTo: ["grass", "psychic", "dark"],
      halfDamageFrom: ["fighting", "ground", "grass"],
      halfDamageTo: ["fighting", "flying", "poison", "ghost", "steel", "fire", "fairy"],
      noDamageFrom: [],
      noDamageTo: [],
    },
  },
  ghost: {
    id: 8,
    enName: "ghost",
    jaName: "ゴースト",
    damageRelations: {
      doubleDamageFrom: ["ghost", "dark"],
      doubleDamageTo: ["ghost", "psychic"],
      halfDamageFrom: ["poison", "bug"],
      halfDamageTo: ["dark"],
      noDamageFrom: ["normal", "fighting"],
      noDamageTo: ["normal"],
    },
  },
  steel: {
    id: 9,
    enName: "steel",
    jaName: "はがね",
    damageRelations: {
      doubleDamageFrom: ["fighting", "ground", "fire"],
      doubleDamageTo: ["rock", "ice", "fairy"],
      halfDamageFrom: ["normal", "flying", "rock", "bug", "steel", "grass", "psychic", "ice", "dragon", "fairy"],
      halfDamageTo: ["steel", "fire", "water", "electric"],
      noDamageFrom: ["poison"],
      noDamageTo: [],
    },
  },
  fire: {
    id: 10,
    enName: "fire",
    jaName: "ほのお",
    damageRelations: {
      doubleDamageFrom: ["ground", "rock", "water"],
      doubleDamageTo: ["bug", "steel", "grass", "ice"],
      halfDamageFrom: ["bug", "steel", "fire", "grass", "ice", "fairy"],
      halfDamageTo: ["rock", "fire", "water", "dragon"],
      noDamageFrom: [],
      noDamageTo: [],
    },
  },
  water: {
    id: 11,
    enName: "water",
    jaName: "みず",
    damageRelations: {
      doubleDamageFrom: ["grass", "electric"],
      doubleDamageTo: ["ground", "rock", "fire"],
      halfDamageFrom: ["steel", "fire", "water", "ice"],
      halfDamageTo: ["water", "grass", "dragon"],
      noDamageFrom: [],
      noDamageTo: [],
    },
  },
  grass: {
    id: 12,
    enName: "grass",
    jaName: "くさ",
    damageRelations: {
      doubleDamageFrom: ["flying", "poison", "bug", "fire", "ice"],
      doubleDamageTo: ["ground", "rock", "water"],
      halfDamageFrom: ["ground", "water", "grass", "electric"],
      halfDamageTo: ["flying", "poison", "bug", "steel", "fire", "grass", "dragon"],
      noDamageFrom: [],
      noDamageTo: [],
    },
  },
  electric: {
    id: 13,
    enName: "electric",
    jaName: "でんき",
    damageRelations: {
      doubleDamageFrom: ["ground"],
      doubleDamageTo: ["flying", "water"],
      halfDamageFrom: ["flying", "steel", "electric"],
      halfDamageTo: ["grass", "electric", "dragon"],
      noDamageFrom: [],
      noDamageTo: ["ground"],
    },
  },
  psychic: {
    id: 14,
    enName: "psychic",
    jaName: "エスパー",
    damageRelations: {
      doubleDamageFrom: ["bug", "ghost", "dark"],
      doubleDamageTo: ["fighting", "poison"],
      halfDamageFrom: ["fighting", "psychic"],
      halfDamageTo: ["steel", "psychic"],
      noDamageFrom: [],
      noDamageTo: ["dark"],
    },
  },
  ice: {
    id: 15,
    enName: "ice",
    jaName: "こおり",
    damageRelations: {
      doubleDamageFrom: ["fighting", "rock", "steel", "fire"],
      doubleDamageTo: ["flying", "ground", "grass", "dragon"],
      halfDamageFrom: ["ice"],
      halfDamageTo: ["steel", "fire", "water", "ice"],
      noDamageFrom: [],
      noDamageTo: [],
    },
  },
  dragon: {
    id: 16,
    enName: "dragon",
    jaName: "ドラゴン",
    damageRelations: {
      doubleDamageFrom: ["ice", "dragon", "fairy"],
      doubleDamageTo: ["dragon"],
      halfDamageFrom: ["fire", "water", "grass", "electric"],
      halfDamageTo: ["steel"],
      noDamageFrom: [],
      noDamageTo: ["fairy"],
    },
  },
  dark: {
    id: 17,
    enName: "dark",
    jaName: "あく",
    damageRelations: {
      doubleDamageFrom: ["fighting", "bug", "fairy"],
      doubleDamageTo: ["ghost", "psychic"],
      halfDamageFrom: ["ghost", "dark"],
      halfDamageTo: ["fighting", "dark", "fairy"],
      noDamageFrom: ["psychic"],
      noDamageTo: [],
    },
  },
  fairy: {
    id: 18,
    enName: "fairy",
    jaName: "フェアリー",
    damageRelations: {
      doubleDamageFrom: ["poison", "steel"],
      doubleDamageTo: ["fighting", "dragon", "dark"],
      halfDamageFrom: ["fighting", "bug", "dark"],
      halfDamageTo: ["poison", "steel", "fire"],
      noDamageFrom: ["dragon"],
      noDamageTo: [],
    },
  },
  unknown: {
    id: 10001,
    enName: "unknown",
    jaName: "？？？",
    damageRelations: {
      doubleDamageFrom: [],
      doubleDamageTo: [],
      halfDamageFrom: [],
      halfDamageTo: [],
      noDamageFrom: [],
      noDamageTo: [],
    },
  },
};
