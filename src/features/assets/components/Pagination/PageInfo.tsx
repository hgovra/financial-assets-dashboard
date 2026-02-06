interface PageInfoProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  label?: string;
}

export function PageInfo({
  currentPage,
  pageSize,
  totalItems,
  label = "assets",
}: PageInfoProps) {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <span className="text-sm text-neutral-400">
      Showing <span className="text-neutral-100">{start}</span> to{" "}
      <span className="text-neutral-100">{end}</span> of{" "}
      <span className="text-neutral-100">{totalItems}</span> {label}
    </span>
  );
}
