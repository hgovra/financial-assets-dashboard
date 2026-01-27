import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";
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
      <Table className="w-full caption-bottom text-sm">
        <TableHeader className="[&_tr]:border-b">
          <TableRow className="data-[state=selected]:bg-muted border-b transition-colors border-neutral-800 hover:bg-transparent">
            <TableHead className="text-neutral-400">Asset</TableHead>
            <TableHead className="text-neutral-400">Symbol</TableHead>
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
    <div className="py-10 text-center text-sm text-muted-foreground">
      No assets match your current filters.
    </div>
  );
}
