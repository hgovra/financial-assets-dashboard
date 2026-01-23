import type { AssetType, PriceChange } from "../types/asset";

export const ASSET_TYPE_OPTIONS: {
  value: AssetType;
  label: string;
}[] = [
  { value: "all", label: "All Assets" },
  { value: "crypto", label: "Crypto" },
];

export const PRICE_CHANGE_OPTIONS: {
  value: PriceChange;
  label: string;
}[] = [
  { value: "all", label: "All Changes" },
  { value: "gainers", label: "Gainers" },
  { value: "losers", label: "Losers" },
];
