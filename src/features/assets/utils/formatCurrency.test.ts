import { formatCurrency } from "./formatCurrency";

describe("formatCurrency", () => {
  it("formats a number as USD currency with default options", () => {
    const result = formatCurrency(43250.75);

    expect(result).toBe("$43,250.75");
  });

  it("returns '-' when value is NaN", () => {
    const result = formatCurrency(Number.NaN);

    expect(result).toBe("-");
  });

  it("formats currency using a custom locale and currency", () => {
    const result = formatCurrency(1000, {
      locale: "pt-BR",
      currency: "BRL",
    });

    // Normalize non-breaking space produced by Intl
    expect(result.replace(/\u00A0/g, " ")).toBe("R$ 1.000,00");
  });

  it("respects minimum and maximum fraction digits", () => {
    const result = formatCurrency(1234.5678, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    expect(result).toBe("$1,235");
  });

  it("formats values with more decimal precision when configured", () => {
    const result = formatCurrency(1.2345, {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    });

    expect(result).toBe("$1.2345");
  });
});
