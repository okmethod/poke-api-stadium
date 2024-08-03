export interface Type {
  name: string;
  color: string;
  url: string;
}

export const TYPES: Type[] = [
  { name: "normal", color: "#A8A77A", url: "https://pokeapi.co/api/v2/type/1/" },
  { name: "fighting", color: "#EE8130", url: "https://pokeapi.co/api/v2/type/2/" },
  { name: "flying", color: "#6390F0", url: "https://pokeapi.co/api/v2/type/3/" },
  { name: "poison", color: "#A33EA1", url: "https://pokeapi.co/api/v2/type/4/" },
  { name: "ground", color: "#E2BF65", url: "https://pokeapi.co/api/v2/type/5/" },
  { name: "rock", color: "#B6A136", url: "https://pokeapi.co/api/v2/type/6/" },
  { name: "bug", color: "#A6B91A", url: "https://pokeapi.co/api/v2/type/7/" },
  { name: "ghost", color: "#735797", url: "https://pokeapi.co/api/v2/type/8/" },
  { name: "steel", color: "#B7B7CE", url: "https://pokeapi.co/api/v2/type/9/" },
  { name: "fire", color: "#D22E28", url: "https://pokeapi.co/api/v2/type/10/" },
  { name: "water", color: "#3366FF", url: "https://pokeapi.co/api/v2/type/11/" },
  { name: "grass", color: "#7AC74C", url: "https://pokeapi.co/api/v2/type/12/" },
  { name: "electric", color: "#F7D02C", url: "https://pokeapi.co/api/v2/type/13/" },
  { name: "psychic", color: "#F95587", url: "https://pokeapi.co/api/v2/type/14/" },
  { name: "ice", color: "#96D9D6", url: "https://pokeapi.co/api/v2/type/15/" },
  { name: "dragon", color: "#6F35FC", url: "https://pokeapi.co/api/v2/type/16/" },
  { name: "dark", color: "#222222", url: "https://pokeapi.co/api/v2/type/17/" },
  { name: "fairy", color: "#FCAFF9", url: "https://pokeapi.co/api/v2/type/18/" },
  { name: "shadow", color: "#493963", url: "https://pokeapi.co/api/v2/type/10002/" },
];
