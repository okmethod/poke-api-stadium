export function formatHW(value: number | undefined): string {
  return value !== undefined ? (value * 0.1).toFixed(1) : "???";
}
