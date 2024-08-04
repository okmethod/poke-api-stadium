export function formatHW(value: number | undefined): string {
  return value !== undefined ? (value * 0.1).toFixed(1) : "???";
}

export function formatStat(value: number | undefined): string {
  return value !== undefined ? value.toString() : "???";
}

export function getRandomNumbers(min: number, max: number, count: number): number[] {
  if (max - min + 1 < count) {
    throw new Error("shortage number of range");
  }

  const randomNumbers = new Set<number>();
  while (randomNumbers.size < count) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomNumbers.add(randomNumber);
  }
  return Array.from(randomNumbers);
}
