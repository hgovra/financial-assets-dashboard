import { useMemo } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AssetsTable } from "../components/AssetsTable";
import FiltersBar from "../components/FiltersBar";
import { useAssetsQuery } from "../hooks/useAssetsQuery";
import {
  setMarketCapCategory,
  setPriceChange,
  setSearch,
} from "../slices/assetsFiltersSlice";
import { filterByMarketCap } from "../utils/filterByMarketCap";

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export function AssetsPage() {
  const { data: assets = [], isLoading, isError } = useAssetsQuery();

  const dispatch = useAppDispatch();

  const { search, marketCapCategory, priceChange } = useAppSelector(
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
      .filter((asset) => filterByMarketCap(asset, marketCapCategory));
  }, [assets, search, priceChange, marketCapCategory]);

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
        marketCapCategory={marketCapCategory}
        onSearchChange={(value) => dispatch(setSearch(value))}
        onPriceChangeChange={(value) => dispatch(setPriceChange(value))}
        onMarketCapChange={(value) => dispatch(setMarketCapCategory(value))}
      />

      {/* Table */}
      <AssetsTable assets={filteredAssets} isLoading={isLoading} />
    </>
  );
}

export default AssetsPage;
