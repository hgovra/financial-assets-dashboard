import { TableCell, TableRow } from "@/components/ui/table";

import { formatCurrency } from "@/shared/utils/formatCurrency";
import { formatMarketCap } from "@/shared/utils/formatMarketCap";
import type { Asset } from "../types/asset";
import { PriceChange } from "./PriceChange";

type AssetRowProps = {
  asset: Asset;
};

export function AssetRow({ asset }: AssetRowProps) {
  return (
    <TableRow
      key={asset.id}
      className="data-[state=selected]:bg-muted border-b border-neutral-800 hover:bg-neutral-900/50 transition-colors"
    >
      {/* Asset name */}
      <TableCell className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5 font-medium text-neutral-100">
        {asset.name}
      </TableCell>

      {/* Symbol */}
      <TableCell className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5 text-neutral-400 font-mono text-sm">
        {asset.symbol}
      </TableCell>

      {/* Price */}
      <TableCell className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5 text-right text-neutral-100 font-mono">
        {formatCurrency(asset.price, { currency: "USD" })}
      </TableCell>

      {/* 24h Change */}
      <TableCell className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5 text-right">
        <PriceChange value={asset.priceChange24h} />
      </TableCell>

      {/* Market Cap */}
      <TableCell className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5 text-right text-neutral-100 font-mono">
        {formatMarketCap(asset.marketCap)}
      </TableCell>
    </TableRow>
  );
}
