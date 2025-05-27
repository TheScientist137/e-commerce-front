import { useEffect } from "react";
import { useProductsStore } from "../stores/productsStore";
import { useUiStore } from "../stores/uiStore";
import { IoClose } from "react-icons/io5";

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
    <div className="fixed top-0 right-0 left-0 z-50 m-8 rounded-xl overflow-y-auto bg-white p-6 shadow-lg">
      <div className="mb-4 flex w-full justify-between">
        <h3 className="text-2xl font-medium">Sort By</h3>
        <button onClick={() => setIsSortMenuOpen(false)}>
          <IoClose className="self-center text-2xl" />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {sortFilters.map((sortFilter) => (
          <div
            className={`cursor-pointer border-1 py-1 rounded-xl text-center text-lg ${sortBy === sortFilter.value ? "bg-gray-300 font-bold" : ""}`}
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
