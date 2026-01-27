export type Asset = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
  type: "crypto" | "stock";
};

export type MarketCapCategory = "all" | "large" | "mid" | "small";

export type PriceChange = "all" | "gainers" | "losers";
