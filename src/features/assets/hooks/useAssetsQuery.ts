import { useQuery } from "@tanstack/react-query";

import { fetchAssets } from "../services/assetsApi";
import type { Asset } from "../types/asset";

export function useAssetsQuery() {
  return useQuery<Asset[]>({
    queryKey: ["assets"],
    queryFn: fetchAssets,
  });
}
