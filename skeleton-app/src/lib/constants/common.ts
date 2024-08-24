// 外部サイトURL
export const GITHUB_REPO_URL = "https://github.com/okmethod/poke-api-stadium";
export const MATTER_PROTOTYPE_URL = "https://okmethod.github.io/thin-2d-physics-sim/";
export const POKENATOR_URL = "https://okmethod-gemini-trial.web.app/";

// 通常フォルムのポケモンの図鑑番号の最小値〜最大値
export const FIRST_POKE_ID = 1;
export const LATEST_POKE_ID = 1025;
export const POKE_COUNT = LATEST_POKE_ID - FIRST_POKE_ID + 1;
// https://pokeapi.co/api/v2/pokemon の count の値と思いきや、
// 図鑑番号がついていないポケモンがいるため count より小さい値になるので注意

// 別フォルムのポケモンの図鑑番号の最小値〜最大値
export const FIRST_ADDITIONAL_POKE_ID = 10001;
export const LATEST_ADDITIONAL_POKE_ID = 10277;
export const ADDITIONAL_POKE_COUNT = LATEST_ADDITIONAL_POKE_ID - FIRST_ADDITIONAL_POKE_ID + 1;
