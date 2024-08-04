export interface BallInfo {
  id: number;
  imageUrl: string;
}

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
  "premier-ball": {
    id: 12,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/premier-ball.png",
  },
};
