type FormatMarketCapOptions = {
  currency?: string;
  locale?: string;
  maximumFractionDigits?: number;
};

export function formatMarketCap(
  value: number,
  {
    currency = "USD",
    locale = "en-US",
    maximumFractionDigits = 1,
  }: FormatMarketCapOptions = {},
): string {
  if (Number.isNaN(value) || value <= 0) {
    return "-";
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits,
  });

  return formatter.format(value);
}
