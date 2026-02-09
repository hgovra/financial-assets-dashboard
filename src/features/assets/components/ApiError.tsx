import { ServerOff } from "lucide-react";

export const ApiError = () => {
  return (
    <div className="flex flex-col flex-1 justify-center items-center px-4 py-16">
      <div className="mb-2 text-red-600">
        <ServerOff className="mx-auto mb-2 w-12 h-12" />
      </div>

      <h3 className="mb-1 font-medium text-red-300 text-lg">
        Failed to load assets
      </h3>

      <p className="text-red-500 text-center">Please try again later</p>
    </div>
  );
};
