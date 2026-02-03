import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";
import { TrendingDown } from "lucide-react";
import type { Asset } from "../types/asset";
import { AssetRow } from "./AssetRow";

type AssetsTableProps = {
  assets: Asset[];
  isLoading: boolean;
};

export function AssetsTable({ assets, isLoading }: AssetsTableProps) {
  if (isLoading) return <AssetsTableSkeleton />;

  if (assets.length === 0) return <AssetsTableEmptyState />;

  return (
    <div className="overflow-x-auto">
      <Table className="w-full caption-bottom text-sm table-fixed">
        <TableHeader className="[&_tr]:border-b">
          <TableRow className="data-[state=selected]:bg-muted border-b transition-colors border-neutral-800 hover:bg-transparent">
            <TableHead className="text-neutral-400 w-1/3">Asset</TableHead>
            <TableHead className="text-neutral-400 text-center">
              Symbol
            </TableHead>
            <TableHead className="text-neutral-400 text-right">Price</TableHead>
            <TableHead className="text-neutral-400 text-right">
              24h Change
            </TableHead>
            <TableHead className="text-neutral-400 text-right">
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

/* -------------------------------------------------------------------------- */
/* Skeleton & Empty State                                                      */
/* -------------------------------------------------------------------------- */

function AssetsTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Asset</TableHead>
          <TableHead>Symbol</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>24h</TableHead>
          <TableHead className="text-right">Market Cap</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: 6 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-4 w-32" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-16" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-20" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-4 w-28 ml-auto" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function AssetsTableEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-neutral-600 mb-2">
        <TrendingDown className="w-12 h-12 mx-auto mb-4" />
      </div>

      <h3 className="text-lg font-medium text-neutral-300 mb-1">
        No assets found
      </h3>

      <p className="text-neutral-500 text-center">
        Try adjusting your filters or search query
      </p>
    </div>
  );
}
