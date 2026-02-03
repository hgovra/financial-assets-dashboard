import type { Asset, MarketCap } from "../types/asset";

export function filterByMarketCap(asset: Asset, category: MarketCap) {
  if (category === "all") return true;

  const cap = asset.marketCap;

  if (category === "large") {
    return cap >= 50_000_000_000;
  }

  if (category === "mid") {
    return cap >= 5_000_000_000 && cap < 50_000_000_000;
  }

  if (category === "small") {
    return cap < 5_000_000_000;
  }

  return true;
}
