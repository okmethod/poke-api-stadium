export interface Ball {
  id: number;
  imageUrl: string;
}

export const BALLS: { [name: string]: Ball } = {
  "poke-ball": {
    id: 4,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
  },
  "great-ball": {
    id: 3,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png",
  },
  "premier-ball": {
    id: 12,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/premier-ball.png",
  },
};
