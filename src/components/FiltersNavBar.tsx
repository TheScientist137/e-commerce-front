import { useState, useEffect } from "react";
import { useProductsStore } from "../stores/productsStore";
import { useUiStore } from "../stores/uiStore";
import { FaFilter, FaSort } from "react-icons/fa";
import { IoIosOptions } from "react-icons/io";
import { IoAccessibility } from "react-icons/io5";


export default function FiltersNavBar({
  filterButtonsRef,
}: {
  filterButtonsRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { getIsFiltersActive } = useProductsStore();
  const {
    isFiltersMenuOpen,
    isSortMenuOpen,
    setIsFiltersMenuOpen,
    setIsSortMenuOpen,
  } = useUiStore();
  const [showFiltersButton, setShowFiltersButton] = useState<boolean>(false);
  const shouldShowFiltersButton = showFiltersButton || getIsFiltersActive();

  // MOSTRAR/OCULTAR COMPONENTE ENTERO ??????????

  useEffect(() => {
    const handleScroll = () => {
      // Control show filters button on FiltersNavbar
      // Show it when the FiltersButtons is not visible anymore
      if (filterButtonsRef.current) {
        const filterButtonsRect =
          filterButtonsRef.current.getBoundingClientRect();
        setShowFiltersButton(filterButtonsRect.bottom <= 60);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Clean the effect
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filterButtonsRef]);

  const handleOpenFiltersMenu = () => {
    setIsFiltersMenuOpen(!isFiltersMenuOpen);
    if (!isFiltersMenuOpen && isSortMenuOpen) {
      setIsSortMenuOpen(false);
    }
  };

  const handleOpenSortByMenu = () => {
    setIsSortMenuOpen(!isSortMenuOpen);
    if (!isSortMenuOpen && isFiltersMenuOpen) {
      setIsFiltersMenuOpen(false);
    }
  };

  return (
    <div className="flex gap-6 rounded-xl bg-slate-100 dark:bg-gray-800 p-4">
      {shouldShowFiltersButton && (
        <div
          className="flex items-center gap-1"
          onClick={() => handleOpenFiltersMenu()}
        >
          <IoIosOptions className="text-2xl" />
          <span className="">Filters</span>
        </div>
      )}

      <div
        className="flex items-center gap-1"
        onClick={() => handleOpenSortByMenu()}
      >
        <FaSort className="text-xl" />
        <span className="">Sort by</span>
      </div>
    </div>
  );
}
