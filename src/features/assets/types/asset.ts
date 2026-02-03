export type Asset = {
  id: string;
  name: string;
  symbol: string;
  imageUrl: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
};

export type MarketCap = "all" | "large" | "mid" | "small";

export type PriceChange = "all" | "gainers" | "losers";
