import { TrendingDown, TrendingUp } from "lucide-react";

import { formatPercentage } from "@/features/assets/utils/formatPercentage";
import { cn } from "@/lib/shadcn/utils";

type PriceChangeProps = {
  value: number;
};

export function PriceChange({ value }: PriceChangeProps) {
  const isPositive = value > 0;
  const isNegative = value < 0;
  const isNeutral = value === 0;

  let sign = "";
  if (isPositive) sign = "+";

  return (
    <span
      className={cn(
        "flex items-center justify-end gap-1 font-mono tabular-nums",
        isPositive && "text-green-500",
        isNegative && "text-red-500",
        isNeutral && "text-muted-foreground",
      )}
    >
      {isPositive ? (
        <TrendingUp className="h-4 w-4" />
      ) : (
        <TrendingDown className="h-4 w-4" />
      )}

      {sign}
      {formatPercentage(value)}
    </span>
  );
}
