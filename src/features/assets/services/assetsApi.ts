import axios from "axios";

import type { Asset } from "../types/asset";

/* -------------------------------------------------------------------------- */
/* Axios instance                                                             */
/* -------------------------------------------------------------------------- */

const api = axios.create({
  baseURL: import.meta.env.VITE_COINGECKO_API_BASE_URL,
  timeout: 10_000,
});

/* -------------------------------------------------------------------------- */
/* CoinGecko response (partial typing)                                        */
/* -------------------------------------------------------------------------- */

type CoinGeckoMarketItem = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number | null;
  market_cap: number;
};

/* -------------------------------------------------------------------------- */
/* Public API                                                                 */
/* -------------------------------------------------------------------------- */

export async function fetchAssets(): Promise<Asset[]> {
  const { data } = await api.get<CoinGeckoMarketItem[]>("/coins/markets", {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 50,
      page: 1,
      sparkline: false,
      price_change_percentage: "24h",
    },
  });

  return data.map(mapCoinGeckoToAsset);
}

/* -------------------------------------------------------------------------- */
/* Mappers                                                                    */
/* -------------------------------------------------------------------------- */

function mapCoinGeckoToAsset(item: CoinGeckoMarketItem): Asset {
  return {
    id: item.id,
    name: item.name,
    symbol: item.symbol.toUpperCase(),
    imageUrl: item.image,
    price: item.current_price,
    priceChange24h: item.price_change_percentage_24h ?? 0,
    marketCap: item.market_cap,
  };
}
