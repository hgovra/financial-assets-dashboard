import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  filtersToSearchParams,
  paginationToSearchParams,
} from "@/utils/urlState";

import { ApiError } from "../components/ApiError";
import { AssetsTable } from "../components/AssetsTable/AssetsTable";
import FiltersBar from "../components/FiltersBar";
import { Pagination } from "../components/Pagination/Pagination";
import { useAssetsQuery } from "../hooks/useAssetsQuery";
import {
  hydrateFilters,
  setMarketCap,
  setPriceChange,
  setSearch,
} from "../slices/filtersSlice";
import { resetPagination, setPage } from "../slices/paginationSlice";
import type { MarketCap, PriceChange } from "../types/asset";
import { filterByMarketCap } from "../utils/filterByMarketCap";

function AssetsPage() {
  // Routing + state wiring

  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { search, marketCap, priceChange } = useAppSelector(
    (state) => state.filters,
  );
  const { currentPage, pageSize } = useAppSelector((state) => state.pagination);

  // Server state

  const { data: assets = [], isLoading, isError } = useAssetsQuery();

  // Derived data (pure)

  const filteredAssets = useMemo(() => {
    return assets
      .filter((asset) =>
        asset.name.toLowerCase().includes(search.toLowerCase()),
      )
      .filter((asset) => {
        if (priceChange === "gainers") return asset.priceChange24h > 0;
        if (priceChange === "losers") return asset.priceChange24h < 0;
        return true;
      })
      .filter((asset) => filterByMarketCap(asset, marketCap));
  }, [assets, search, priceChange, marketCap]);

  const paginatedAssets = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    return filteredAssets.slice(start, end);
  }, [filteredAssets, currentPage, pageSize]);

  // Effects: coordination & guards

  // Hydrate Redux UI state from URL on first render only.
  // URL is treated as an external persistence layer.
  useEffect(() => {
    const search = searchParams.get("search") ?? "";
    const priceChange = searchParams.get("priceChange") ?? "all";
    const marketCap = searchParams.get("marketCap") ?? "all";
    const page = Number(searchParams.get("page") ?? 1);

    dispatch(
      hydrateFilters({
        search,
        priceChange: priceChange as PriceChange,
        marketCap: marketCap as MarketCap,
      }),
    );

    dispatch(setPage(page));

    // Intentionally run once to avoid URL/Redux sync loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist Redux UI state back to the URL
  useEffect(() => {
    const params = filtersToSearchParams({ search, marketCap, priceChange });
    paginationToSearchParams({ currentPage, pageSize }, params);

    setSearchParams(params, { replace: true });
  }, [search, marketCap, priceChange, currentPage, pageSize, setSearchParams]);

  // Guard against invalid page index after filtering
  useEffect(() => {
    const totalPages = Math.ceil(filteredAssets.length / pageSize);

    if (currentPage > totalPages && totalPages > 0) {
      dispatch(setPage(totalPages));
    }
  }, [filteredAssets.length, currentPage, pageSize, dispatch]);

  // Reset pagination when filters change
  useEffect(() => {
    dispatch(resetPagination());
  }, [search, marketCap, priceChange, dispatch]);

  // Render

  if (isError) return <ApiError />;

  return (
    <>
      <FiltersBar
        search={search}
        priceChange={priceChange}
        marketCap={marketCap}
        onSearchChange={(value) => dispatch(setSearch(value))}
        onPriceChangeChange={(value) => dispatch(setPriceChange(value))}
        onMarketCapChange={(value) => dispatch(setMarketCap(value))}
      />

      <AssetsTable assets={paginatedAssets} isLoading={isLoading} />

      <Pagination
        totalItems={filteredAssets.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={(page) => dispatch(setPage(page))}
      />
    </>
  );
}

export default AssetsPage;
