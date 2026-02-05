import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import { PageFooterInfo } from "./PageFooterInfo";

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  totalItems,
  currentPage,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = Array.from(
    { length: totalPages },
    (_, i) => i + 1,
  ).slice(Math.max(currentPage - 2, 0), Math.min(currentPage + 1, totalPages));

  return (
    <div className="flex items-center justify-between px-4 py-4 border-t border-neutral-800 bg-neutral-900/50">
      {/* Left side info */}
      <PageFooterInfo
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
      />

      {/* Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="bg-neutral-900 border-neutral-800 text-neutral-100 hover:bg-neutral-800 hover:text-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        {visiblePages.map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            className={
              page === currentPage
                ? "bg-neutral-100 text-neutral-900 hover:bg-neutral-200"
                : "bg-neutral-900 border-neutral-800 text-neutral-100 hover:bg-neutral-800 hover:text-neutral-300"
            }
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          className="bg-neutral-900 border-neutral-800 text-neutral-100 hover:bg-neutral-800 hover:text-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
