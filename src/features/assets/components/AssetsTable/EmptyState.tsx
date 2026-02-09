import { TrendingDown } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-col flex-1 justify-center items-center px-4 py-16">
      <div className="mb-2 text-neutral-600">
        <TrendingDown className="mx-auto mb-2 w-12 h-12" />
      </div>

      <h3 className="mb-1 font-medium text-neutral-300 text-lg">
        No assets found
      </h3>

      <p className="text-neutral-500 text-center">
        Try adjusting your filters or search query
      </p>
    </div>
  );
};

export default EmptyState;
