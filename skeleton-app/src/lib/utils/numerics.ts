export function formatHeightWeight(value: number | null, mode: "height" | "weight"): string {
  const num = value ? (value * 0.1).toFixed(1) : "???";
  const unit = mode === "height" ? "m" : "kg";
  return `${num} ${unit}`;
}

export function formatStat(value: number | undefined): string {
  return value !== undefined ? value.toString() : "???";
}
