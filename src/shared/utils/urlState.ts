import type { AssetsFiltersState } from "@/features/assets/slices/assetsFiltersSlice";
import type { PaginationState } from "@/features/assets/slices/paginationSlice";

export function filtersToSearchParams(filters: AssetsFiltersState) {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.priceChange !== "all")
    params.set("priceChange", filters.priceChange);
  if (filters.marketCap !== "all")
    params.set("marketCap", filters.marketCap);

  return params;
}

export function paginationToSearchParams(
  pagination: PaginationState,
  params: URLSearchParams,
) {
  if (pagination.currentPage > 1)
    params.set("page", String(pagination.currentPage));
}
