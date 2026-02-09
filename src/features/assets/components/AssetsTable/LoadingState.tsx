import { Skeleton } from "@/components/ui/skeleton";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

const LoadingState = () => {
  return (
    <Table>
      <TableHeader className="[&_tr]:border-b">
        <TableRow className="data-[state=selected]:bg-muted hover:bg-transparent border-neutral-800 border-b transition-colors">
          <TableHead className="text-neutral-400">Asset</TableHead>
          <TableHead className="w-1/6 text-neutral-400 text-center">
            Symbol
          </TableHead>
          <TableHead className="w-1/6 text-neutral-400 text-right">
            Price
          </TableHead>
          <TableHead className="w-1/6 text-neutral-400 text-right">
            24h Change
          </TableHead>
          <TableHead className="w-1/6 text-neutral-400 text-right">
            Market Cap
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: 10 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="w-full h-5" />
            </TableCell>
            <TableCell className="w-1/6 text-center">
              <Skeleton className="w-full h-5" />
            </TableCell>
            <TableCell className="w-1/6 text-right">
              <Skeleton className="w-full h-5" />
            </TableCell>
            <TableCell className="w-1/6 text-right">
              <Skeleton className="w-full h-5" />
            </TableCell>
            <TableCell className="w-1/6 text-right">
              <Skeleton className="w-full h-5" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LoadingState;
