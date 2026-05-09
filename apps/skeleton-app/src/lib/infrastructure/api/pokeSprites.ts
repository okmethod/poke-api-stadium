/**
 * pokeSprites - PokeAPI スプライト画像URLの構築
 *
 * @architecture レイヤー間依存ルール - インフラ層
 * - ROLE: PokeAPI のスプライトホスティングURL構築（純粋関数）
 * - ALLOWED: 同インフラ層への依存
 * - FORBIDDEN: アプリ層・プレゼン層への依存
 */

const SPRITES_BASE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites";

/** ポケモンのピクセルスプライトURLを生成する */
export function pokeSpriteUrl(id: number): string {
  return `${SPRITES_BASE}/pokemon/${id}.png`;
}

/** ポケモンの公式アートワークURLを生成する */
export function pokeArtworkUrl(id: number): string {
  return `${SPRITES_BASE}/pokemon/other/official-artwork/${id}.png`;
}

/** アイテムのアイコン画像URLを生成する */
export function itemSpriteUrl(key: string): string {
  return `${SPRITES_BASE}/items/${key}.png`;
}

// symbol_icon を提供するゲーム名 → generation/game フルパスのマッピング
const POKE_TYPE_SYMBOL_GAME_PATHS = {
  "scarlet-violet": "generation-ix/scarlet-violet",
  "sword-shield": "generation-viii/sword-shield",
  "brilliant-diamond-shining-pearl": "generation-viii/brilliant-diamond-shining-pearl",
  "legends-arceus": "generation-viii/legends-arceus",
  "lets-go-pikachu-lets-go-eevee": "generation-vii/lets-go-pikachu-lets-go-eevee",
} as const;

/** symbol_icon を提供するゲーム名（`/` 以降のみ） */
export type PokeTypeSpriteGame = keyof typeof POKE_TYPE_SYMBOL_GAME_PATHS;

/** タイプのシンボルアイコン（小）URLを生成する */
export function pokeTypeSymbolUrl(typeId: number, game: PokeTypeSpriteGame = "scarlet-violet"): string {
  return `${SPRITES_BASE}/types/${POKE_TYPE_SYMBOL_GAME_PATHS[game]}/small/${typeId}.png`;
}
