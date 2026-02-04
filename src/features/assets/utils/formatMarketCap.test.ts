import { formatMarketCap } from "./formatMarketCap";

describe("formatMarketCap", () => {
  it("formats market cap using compact notation with default options", () => {
    const result = formatMarketCap(1_500_000_000);

    expect(result).toBe("$1.5B");
  });

  it("returns '-' when value is NaN", () => {
    const result = formatMarketCap(Number.NaN);

    expect(result).toBe("-");
  });

  it("returns '-' when value is zero or negative", () => {
    expect(formatMarketCap(0)).toBe("-");
    expect(formatMarketCap(-100)).toBe("-");
  });

  it("respects maximumFractionDigits option", () => {
    const result = formatMarketCap(1_234_000_000, {
      maximumFractionDigits: 2,
    });

    expect(result).toBe("$1.23B");
  });

  it("formats market cap using a custom locale and currency", () => {
    const result = formatMarketCap(1_000_000, {
      locale: "pt-BR",
      currency: "BRL",
    });

    // Normalize non-breaking space produced by Intl
    const normalized = result.replace(/\u00A0/g, " ");

    expect(normalized).toBe("R$ 1 mi");
  });
});
