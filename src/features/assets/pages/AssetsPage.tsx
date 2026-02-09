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
  const { data: assets = [], isLoading, isError } = useAssetsQuery();

  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((s) => s.filters);
  const pagination = useAppSelector((s) => s.pagination);
  const [, setSearchParams] = useSearchParams();
  const { currentPage, pageSize } = useAppSelector((state) => state.pagination);
  const { search, marketCap, priceChange } = useAppSelector(
    (state) => state.filters,
  );

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

  // Hydrate Redux state from URL on initial load only

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

  // Update URL when filters change and vice-versa

  useEffect(() => {
    const params = filtersToSearchParams(filters);
    paginationToSearchParams(pagination, params);

    setSearchParams(params, { replace: true });
  }, [filters, pagination, setSearchParams]);

  // Update pagination when filters change to last page available

  useEffect(() => {
    const totalPages = Math.ceil(filteredAssets.length / pageSize);

    if (currentPage > totalPages && totalPages > 0) {
      dispatch(setPage(totalPages));
    }
  }, [filteredAssets.length, currentPage, pageSize, dispatch]);

  // Reset pagination when filters change

  useEffect(() => {
    dispatch(resetPagination());
  }, [filters.search, filters.priceChange, filters.marketCap, dispatch]);

  if (isError) return <ApiError />;

  return (
    <>
      {/* Filters */}
      <FiltersBar
        search={search}
        priceChange={priceChange}
        marketCap={marketCap}
        onSearchChange={(value) => dispatch(setSearch(value))}
        onPriceChangeChange={(value) => dispatch(setPriceChange(value))}
        onMarketCapChange={(value) => dispatch(setMarketCap(value))}
      />
      {/* Table */}
      <AssetsTable assets={paginatedAssets} isLoading={isLoading} />
      {/* Pagination */}
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
