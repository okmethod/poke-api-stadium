import type { TypeName, StaticTypeData } from "$lib/types/type";

export const STATIC_TYPE_DICT: Record<TypeName, StaticTypeData> = {
  normal: { color: "#FDF6CB", id: 1 },
  fighting: { color: "#EE8130", id: 2 },
  flying: { color: "#A2C3E8", id: 3 },
  poison: { color: "#A33EA1", id: 4 },
  ground: { color: "#9C7743", id: 5 },
  rock: { color: "#C0B88A", id: 6 },
  bug: { color: "#A6B91A", id: 7 },
  ghost: { color: "#735797", id: 8 },
  steel: { color: "#B7B7CE", id: 9 },
  fire: { color: "#D22E28", id: 10 },
  water: { color: "#5285C6", id: 11 },
  grass: { color: "#7AC74C", id: 12 },
  electric: { color: "#F7D02C", id: 13 },
  psychic: { color: "#F95587", id: 14 },
  ice: { color: "#6DC8EB", id: 15 },
  dragon: { color: "#545BA8", id: 16 },
  dark: { color: "#222222", id: 17 },
  fairy: { color: "#FCAFF9", id: 18 },
  unknown: { color: "#888888", id: 10001 },
};
