import type { Asset, MarketCapCategory } from "../types/asset";

export function filterByMarketCap(asset: Asset, category: MarketCapCategory) {
  if (category === "all") return true;

  const cap = asset.marketCap;

  if (category === "large") {
    return cap >= 10_000_000_000;
  }

  if (category === "mid") {
    return cap >= 1_000_000_000 && cap < 10_000_000_000;
  }

  if (category === "small") {
    return cap < 1_000_000_000;
  }

  return true;
}
