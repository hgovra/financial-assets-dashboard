export type Asset = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
  type: "crypto" | "stock";
};

export type AssetType = "all" | "crypto" | "stock";

export type PriceChange = "all" | "gainers" | "losers";
