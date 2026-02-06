import { BadgeX } from "lucide-react";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 h-screen">
      <div className="text-neutral-600 mb-2">
        <BadgeX className="w-12 h-12 mx-auto mb-2" />
      </div>

      <h3 className="text-lg font-medium text-neutral-300 mb-1">Not found</h3>

      <p className="text-neutral-500 text-center">
        Check the address and try again
      </p>
    </div>
  );
}

export default NotFound;
