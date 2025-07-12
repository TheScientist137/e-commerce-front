import { useProductsStore } from "../stores/productsStore";
import { useUiStore } from "../stores/uiStore";
import FiltersMenuModal from "./FilterMenuModal";

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

  return (
    <FiltersMenuModal
      title="Sort By"
      isOpen={isSortMenuOpen}
      onClose={() => setIsSortMenuOpen(false)}
    >
      <div className="flex h-full flex-col gap-4">
        {sortFilters.map((sortFilter) => (
          <button
            className={`cursor-pointer rounded-xl border-2 border-slate-200 px-4 py-2 dark:border-slate-800 ${
              sortFilter.value === sortBy
                ? "bg-slate-200 dark:bg-slate-500"
                : "bg-slate-100 dark:bg-slate-600"
            } `}
            key={sortFilter.value}
            onClick={() => handleSortFilter(sortFilter.value)}
          >
            {sortFilter.title}
          </button>
        ))}
      </div>
    </FiltersMenuModal>
  );
}
