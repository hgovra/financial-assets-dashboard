import type { MarketCap, PriceChange } from "../types/asset";

export const MARKET_CAP_CATEGORIES: {
  value: MarketCap;
  label: string;
}[] = [
  { value: "all", label: "All" },
  { value: "large", label: "Large Cap" },
  { value: "mid", label: "Mid Cap" },
  { value: "small", label: "Small Cap" },
];

export const PRICE_CHANGE_OPTIONS: {
  value: PriceChange;
  label: string;
}[] = [
  { value: "all", label: "All Changes" },
  { value: "gainers", label: "Gainers" },
  { value: "losers", label: "Losers" },
];
