import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Asset } from "../types/asset";
import { AssetRow } from "./AssetRow";

const assets: Asset[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: 43250.32,
    priceChange24h: 2.45,
    marketCap: 847123456789,
    type: "crypto",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    price: 2280.17,
    priceChange24h: -1.32,
    marketCap: 274987654321,
    type: "crypto",
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    price: 98.41,
    priceChange24h: 4.87,
    marketCap: 43210987654,
    type: "crypto",
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    price: 0.58,
    priceChange24h: -0.76,
    marketCap: 20345678901,
    type: "crypto",
  },
  {
    id: "ripple",
    name: "XRP",
    symbol: "XRP",
    price: 0.62,
    priceChange24h: 1.12,
    marketCap: 33219876543,
    type: "crypto",
  },
  {
    id: "polkadot",
    name: "Polkadot",
    symbol: "DOT",
    price: 7.14,
    priceChange24h: -2.03,
    marketCap: 9823456789,
    type: "crypto",
  },
  {
    id: "chainlink",
    name: "Chainlink",
    symbol: "LINK",
    price: 14.87,
    priceChange24h: 3.61,
    marketCap: 8123456789,
    type: "crypto",
  },
  {
    id: "litecoin",
    name: "Litecoin",
    symbol: "LTC",
    price: 72.55,
    priceChange24h: -0.95,
    marketCap: 5412345678,
    type: "crypto",
  },
  {
    id: "avalanche",
    name: "Avalanche",
    symbol: "AVAX",
    price: 36.21,
    priceChange24h: 5.42,
    marketCap: 12987654321,
    type: "crypto",
  },
  {
    id: "polygon",
    name: "Polygon",
    symbol: "MATIC",
    price: 0.91,
    priceChange24h: -1.88,
    marketCap: 8765432109,
    type: "crypto",
  },
];

const AssetsTable = () => {
  return (
    <div className="overflow-x-auto">
      <Table className="w-full caption-bottom text-sm">
        <TableHeader className="[&_tr]:border-b">
          <TableRow className="data-[state=selected]:bg-muted border-b transition-colors border-neutral-800 hover:bg-transparent">
            <TableHead className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5 text-neutral-400">
              Asset
            </TableHead>
            <TableHead className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5 text-neutral-400">
              Symbol
            </TableHead>
            <TableHead className="h-10 px-2 align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5 text-neutral-400 text-right">
              Price
            </TableHead>
            <TableHead className="h-10 px-2 align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5 text-neutral-400 text-right">
              24h Change
            </TableHead>
            <TableHead className="h-10 px-2 align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5 text-neutral-400 text-right">
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
};

export default AssetsTable;
