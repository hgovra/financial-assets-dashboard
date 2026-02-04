import { formatPercentage } from "./formatPercentage";

describe("formatPercentage", () => {
  it("formats percentage with default precision", () => {
    const result = formatPercentage(12.3456);

    expect(result).toBe("12.35%");
  });

  it("returns '-' when value is NaN", () => {
    const result = formatPercentage(Number.NaN);

    expect(result).toBe("-");
  });

  it("respects maximumFractionDigits option", () => {
    const result = formatPercentage(12.3456, {
      maximumFractionDigits: 1,
    });

    expect(result).toBe("12.3%");
  });

  it("formats whole numbers correctly", () => {
    const result = formatPercentage(5);

    expect(result).toBe("5.00%");
  });

  it("does not break when minimumFractionDigits is provided", () => {
    const result = formatPercentage(12.3, {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    });

    expect(result).toBe("12.300%");
  });
});
