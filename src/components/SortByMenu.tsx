import { useProductsStore } from "../stores/productsStore";
import { useUiStore } from "../stores/uiStore";

export default function SortByMenu() {
  const { isSortMenuOpen, setIsSortMenuOpen } = useUiStore();
  const { sortFilteredProducts, sortBy } = useProductsStore();
  const sortFilters = [
    { title: "Alphabetically: A-Z", value: "a-z" },
    { title: "Alphabetically: Z-A", value: "z-a" },
    { title: "Price: Low-High", value: "low-high" },
    { title: "Price: High-Low", value: "high-low" },
    { title: "Date: Old-New", value: "old-new" },
    { title: "Date: New-Old", value: "new-old" },
  ];

  const handleSortFilter = (sortFilter: string) => {
    sortFilteredProducts(sortFilter);
    setIsSortMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isSortMenuOpen) return null;
  return (
    <div className="max-h-[50vh] overflow-y-auto rounded-b-xl bg-white p-4">
      <div className="flex flex-col gap-4">
        {sortFilters.map((sortFilter) => (
          <div
            className={`cursor-pointer rounded-xl border-1 py-1 text-center text-bse ${sortBy === sortFilter.value ? "bg-gray-300 font-bold" : ""}`}
            key={sortFilter.value}
            onClick={() => handleSortFilter(sortFilter.value)}
          >
            {sortFilter.title}
          </div>
        ))}
      </div>
    </div>
  );
}
