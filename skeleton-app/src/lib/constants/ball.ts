import type { BallInfo } from "$lib/types/ball";

export const BALL_DICT: { [name: string]: BallInfo } = {
  "poke-ball": {
    id: 4,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
  },
  "great-ball": {
    id: 3,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png",
  },
  "ultra-ball": {
    id: 2,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png",
  },
  "master-ball": {
    id: 1,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png",
  },
  "safari-ball": {
    id: 5,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/safari-ball.png",
  },
  "premier-ball": {
    id: 12,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/premier-ball.png",
  },
};
