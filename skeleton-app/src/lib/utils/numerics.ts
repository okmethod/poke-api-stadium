export function formatHeightWeight(value: number | null, mode: "height" | "weight"): string {
  const num = value ? (value * 0.1).toFixed(1) : "???";
  const unit = mode === "height" ? "m" : "kg";
  return `${num} ${unit}`;
}

export function formatStat(value: number | undefined): string {
  return value !== undefined ? value.toString() : "???";
}

export function getRandomNumber(length: number): number {
  return Math.floor(Math.random() * length);
}

export function pickRandomKey<T extends Record<string, unknown>>(obj: T): keyof T {
  const keys = Object.keys(obj) as Array<keyof T>;
  const randomIndex = getRandomNumber(keys.length);
  return keys[randomIndex];
}

export function pickRandomNumbers(numbers: number[], count: number): number[] {
  if (numbers.length < count) {
    throw new Error("shortage elements in the array");
  }
  const pickedNumbers: number[] = [];
  const usedIndices: Set<number> = new Set();
  while (pickedNumbers.length < count) {
    const randomIndex = getRandomNumber(numbers.length);
    if (!usedIndices.has(randomIndex)) {
      pickedNumbers.push(numbers[randomIndex]);
      usedIndices.add(randomIndex);
    }
  }
  return pickedNumbers;
}

export function shuffleArray(array: number[]): number[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
