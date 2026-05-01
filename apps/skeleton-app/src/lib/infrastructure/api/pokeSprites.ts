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
