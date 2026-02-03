import { useEffect, useMemo } from "react";

import {
  filtersToSearchParams,
  paginationToSearchParams,
} from "@/shared/utils/urlState";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useSearchParams } from "react-router-dom";
import { AssetsTable } from "../components/AssetsTable";
import FiltersBar from "../components/FiltersBar";
import { Pagination } from "../components/Pagination";
import { useAssetsQuery } from "../hooks/useAssetsQuery";
import {
  hydrateFilters,
  setMarketCap,
  setPriceChange,
  setSearch,
} from "../slices/assetsFiltersSlice";
import { resetPagination, setPage } from "../slices/paginationSlice";
import type { MarketCap, PriceChange } from "../types/asset";
import { filterByMarketCap } from "../utils/filterByMarketCap";

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export function AssetsPage() {
  const { data: assets = [], isLoading, isError } = useAssetsQuery();

  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

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
  }, []);

  const filters = useAppSelector((s) => s.assetsFilters);
  const pagination = useAppSelector((s) => s.pagination);
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = filtersToSearchParams(filters);
    paginationToSearchParams(pagination, params);

    setSearchParams(params, { replace: true });
  }, [filters, pagination]);

  const { search, marketCap, priceChange } = useAppSelector(
    (state) => state.assetsFilters,
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

  const { currentPage, pageSize } = useAppSelector((state) => state.pagination);

  const paginatedAssets = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    return filteredAssets.slice(start, end);
  }, [filteredAssets, currentPage, pageSize]);

  useEffect(() => {
    const totalPages = Math.ceil(filteredAssets.length / pageSize);

    if (currentPage > totalPages && totalPages > 0) {
      dispatch(setPage(totalPages));
    }
  }, [filteredAssets.length, currentPage, pageSize]);

  useEffect(() => {
    dispatch(resetPagination());
  }, [filters.search, filters.priceChange, filters.marketCap]);

  if (isError) {
    return (
      <div className="py-10 text-center text-sm text-red-500">
        Failed to load assets. Please try again later.
      </div>
    );
  }

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
