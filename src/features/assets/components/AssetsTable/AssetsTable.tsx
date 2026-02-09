import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Asset } from "../../types/asset";

import AssetRow from "./AssetRow";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";

type AssetsTableProps = {
  assets: Asset[];
  isLoading: boolean;
};

export function AssetsTable({ assets, isLoading }: AssetsTableProps) {
  if (isLoading) return <LoadingState />;

  if (assets.length === 0) return <EmptyState />;

  return (
    <div className="flex-1 overflow-x-auto">
      <Table className="w-full text-sm table-fixed caption-bottom">
        <TableHeader className="[&_tr]:border-b">
          <TableRow className="data-[state=selected]:bg-muted hover:bg-transparent border-neutral-800 border-b transition-colors">
            {/* Asset name */}
            <TableHead className="text-neutral-400">Asset</TableHead>

            {/* Symbol */}
            <TableHead className="w-1/6 text-neutral-400 text-center">
              Symbol
            </TableHead>

            {/* Price */}
            <TableHead className="w-1/6 text-neutral-400 text-right">
              Price
            </TableHead>

            {/* 24h Change */}
            <TableHead className="w-1/6 text-neutral-400 text-right">
              24h Change
            </TableHead>

            {/* Market Cap */}
            <TableHead className="w-1/6 text-neutral-400 text-right">
              Market Cap
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="[&_tr:last-child]:border-0">
          {assets.map((asset) => (
            <AssetRow key={asset.id} asset={asset} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
