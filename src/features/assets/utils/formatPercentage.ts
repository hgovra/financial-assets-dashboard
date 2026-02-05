type FormatPercentageOptions = {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

export function formatPercentage(
  value: number,
  {
    minimumFractionDigits: _minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  }: FormatPercentageOptions = {},
): string {
  if (Number.isNaN(value)) return "-";

  return `${value.toFixed(maximumFractionDigits)}%`;
}
