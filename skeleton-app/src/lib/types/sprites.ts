export interface Sprites {
  front_default: string;
  other: {
    showdown: {
      front_default: string | null;
    };
  };
  // 他にもたくさんあるが、collectStringsRecursively を使えば定義しなくても取得できる
}

function collectStringsRecursively(obj: unknown): string[] {
  let strings: string[] = [];
  if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      const value = (obj as Record<string, unknown>)[key];
      if (typeof value === "string") {
        strings.push(value);
      } else if (typeof value === "object" && value !== null) {
        strings = strings.concat(collectStringsRecursively(value));
      }
    }
  }
  return strings;
}

export function makeSpritesArray(sprites: Sprites): string[] {
  let spritesArray = collectStringsRecursively(sprites);
  // 先頭を Sprite.front_default に差し替える
  if (sprites.front_default) {
    spritesArray = [sprites.front_default, ...spritesArray.filter((sprite) => sprite !== sprites.front_default)];
  }
  return spritesArray;
}
