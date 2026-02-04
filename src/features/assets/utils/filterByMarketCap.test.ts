import type { Asset } from "../types/asset";
import { filterByMarketCap } from "./filterByMarketCap";

describe("filterByMarketCap", () => {
  const baseAsset: Asset = {
    id: "btc",
    name: "Bitcoin",
    symbol: "btc",
    price: 50_000,
    priceChange24h: 2.5,
    marketCap: 0, // will be overwritten in each test
    imageUrl: "",
  };

  it("returns true for all category regardless of market cap", () => {
    const asset = { ...baseAsset, marketCap: 1 };

    expect(filterByMarketCap(asset, "all")).toBe(true);
  });

  it("classifies large cap assets correctly", () => {
    const asset = { ...baseAsset, marketCap: 50_000_000_000 };

    expect(filterByMarketCap(asset, "large")).toBe(true);
    expect(filterByMarketCap(asset, "mid")).toBe(false);
    expect(filterByMarketCap(asset, "small")).toBe(false);
  });

  it("classifies mid cap assets correctly", () => {
    const asset = { ...baseAsset, marketCap: 20_000_000_000 };

    expect(filterByMarketCap(asset, "mid")).toBe(true);
    expect(filterByMarketCap(asset, "large")).toBe(false);
    expect(filterByMarketCap(asset, "small")).toBe(false);
  });

  it("classifies small cap assets correctly", () => {
    const asset = { ...baseAsset, marketCap: 3_000_000_000 };

    expect(filterByMarketCap(asset, "small")).toBe(true);
    expect(filterByMarketCap(asset, "mid")).toBe(false);
    expect(filterByMarketCap(asset, "large")).toBe(false);
  });

  it("handles boundary values correctly", () => {
    const largeBoundary = {
      ...baseAsset,
      marketCap: 50_000_000_000,
    };

    const midBoundary = {
      ...baseAsset,
      marketCap: 5_000_000_000,
    };

    expect(filterByMarketCap(largeBoundary, "large")).toBe(true);
    expect(filterByMarketCap(largeBoundary, "mid")).toBe(false);

    expect(filterByMarketCap(midBoundary, "mid")).toBe(true);
    expect(filterByMarketCap(midBoundary, "small")).toBe(false);
  });
});
