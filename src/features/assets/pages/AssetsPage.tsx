import { useMemo, useState } from "react";

import { AssetsTable } from "../components/AssetsTable";
import FiltersBar from "../components/FiltersBar";
import { useAssetsQuery } from "../hooks/useAssetsQuery";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type PriceChangeFilter = "all" | "gainers" | "losers";

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export function AssetsPage() {
  const { data: assets = [], isLoading, isError } = useAssetsQuery();

  const [search, setSearch] = useState("");
  const [priceChange, setPriceChange] = useState<PriceChangeFilter>("all");

  const filteredAssets = useMemo(() => {
    return assets
      .filter((asset) =>
        asset.name.toLowerCase().includes(search.toLowerCase()),
      )
      .filter((asset) => {
        if (priceChange === "gainers") {
          return asset.priceChange24h > 0;
        }

        if (priceChange === "losers") {
          return asset.priceChange24h < 0;
        }

        return true;
      });
  }, [assets, search, priceChange]);

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
        marketCapCategory={""}
        priceChange={""}
        onMarketCapCategoryChange={function (value: string): void {
          throw new Error("Function not implemented.");
        }}
        onPriceChangeChange={function (value: string): void {
          throw new Error("Function not implemented.");
        }}
      />

      {/* Table */}
      <AssetsTable assets={filteredAssets} isLoading={isLoading} />
    </>
  );
}

export default AssetsPage;
