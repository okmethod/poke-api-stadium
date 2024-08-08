export function formatHW(value: number | undefined, mode: "height" | "weight"): string {
  const num = value !== undefined ? (value * 0.1).toFixed(1) : "???";
  const unit = mode === "height" ? "m" : "kg";
  return `${num} ${unit}`;
}

export function formatStat(value: number | undefined): string {
  return value !== undefined ? value.toString() : "???";
}

export function getRandomNumber(length: number): number {
  return Math.floor(Math.random() * length);
}

export function pickRandomNumbers(numbers: number[], count: number): number[] {
  if (numbers.length < count) {
    throw new Error("shortage elements in the array");
  }

  const result: number[] = [];
  const usedIndices: Set<number> = new Set();
  while (result.length < count) {
    const randomIndex = getRandomNumber(numbers.length);
    if (!usedIndices.has(randomIndex)) {
      result.push(numbers[randomIndex]);
      usedIndices.add(randomIndex);
    }
  }
  return result;
}
