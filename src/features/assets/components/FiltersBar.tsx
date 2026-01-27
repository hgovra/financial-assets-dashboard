import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import {
  MARKET_CAP_CATEGORIES,
  PRICE_CHANGE_OPTIONS,
} from "../constants/filterOptions";

interface FiltersBarProps {
  assetType: string;
  priceChange: string;
  onMarketCapCategoryChange: (value: string) => void;
  onPriceChangeChange: (value: string) => void;
}

const FiltersBar = ({
  assetType = "all",
  priceChange = "all",
  onMarketCapCategoryChange,
  onPriceChangeChange,
}: FiltersBarProps) => {
  return (
    <section className="flex flex-col sm:flex-row gap-3 p-4 bg-neutral-900/50 border-b border-neutral-800">
      <InputGroup className="file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-9 w-full min-w-0 rounded-md border p-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-neutral-900 border-neutral-800 text-neutral-100 placeholder:text-neutral-500 focus:border-neutral-700">
        <InputGroupInput placeholder="Search by name or symbol..." />
        <InputGroupAddon className="pl-2">
          <Search />
        </InputGroupAddon>
      </InputGroup>

      <Select value={assetType} onValueChange={onMarketCapCategoryChange}>
        <SelectTrigger className="data-placeholder:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 w-full sm:w-45 bg-neutral-900 border-neutral-800 text-neutral-100">
          <SelectValue placeholder="Market Cap" />
        </SelectTrigger>

        <SelectContent>
          {MARKET_CAP_CATEGORIES.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={priceChange} onValueChange={onPriceChangeChange}>
        <SelectTrigger className="data-placeholder:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 w-full sm:w-45 bg-neutral-900 border-neutral-800 text-neutral-100">
          <SelectValue placeholder="Price Change" />
        </SelectTrigger>

        <SelectContent>
          {PRICE_CHANGE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </section>
  );
};

export default FiltersBar;
