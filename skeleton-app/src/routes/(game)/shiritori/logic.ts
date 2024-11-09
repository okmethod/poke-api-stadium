function normalizeChar(char: string): string {
  // prettier-ignore
  const normalizationMap: { [key: string]: string } = {
      'ガ': 'カ', 'ギ': 'キ', 'グ': 'ク', 'ゲ': 'ケ', 'ゴ': 'コ',
      'ザ': 'サ', 'ジ': 'シ', 'ズ': 'ス', 'ゼ': 'セ', 'ゾ': 'ソ',
      'ダ': 'タ', 'ヂ': 'チ', 'ヅ': 'ツ', 'デ': 'テ', 'ド': 'ト',
      'バ': 'ハ', 'ビ': 'ヒ', 'ブ': 'フ', 'ベ': 'ヘ', 'ボ': 'ホ', 
      'パ': 'ハ', 'ピ': 'ヒ', 'プ': 'フ', 'ペ': 'ヘ', 'ポ': 'ホ',
      'ァ': 'ア', 'ィ': 'イ', 'ゥ': 'ウ', 'ェ': 'エ', 'ォ': 'オ',
      'ャ': 'ヤ', 'ュ': 'ユ', 'ョ': 'ヨ', 'ッ': 'ツ'
    };
  return normalizationMap[char] || char;
}

export function getHeadChar(name: string): string {
  return normalizeChar(name.slice(0, 1));
}

export function getTailChar(name: string): string {
  let tailChar = name.slice(-1);
  const ignoreChars = ["ー", "♀", "♂", "２", "Ｚ"];
  if (ignoreChars.includes(tailChar) && name.length > 1) {
    tailChar = name.slice(-2, -1);
  }
  return normalizeChar(tailChar);
}

export function solveShiritoriRule(tailPokeName: string, nextPokeName: string): boolean {
  const tailChar = getTailChar(tailPokeName);
  const nextChar = getHeadChar(nextPokeName);
  return tailChar === nextChar;
}
