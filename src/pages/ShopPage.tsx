import { useProductsStore } from "../stores/productsStore.ts";
import FiltersNavBar from "../components/FiltersNavBar.tsx";
import ProductCard from "../components/ProductCard.tsx";
import FiltersMenu from "../components/FiltersMenu.tsx";
import SortByMenu from "../components/SortByMenu.tsx";
import GoToTopButton from "../components/GoToTopButton.tsx";
import Pagination from "../components/Pagination.tsx";
import { CATEGORY_CONFIG } from "../constants/constants.ts";

import { IoIosClose } from "react-icons/io";

export default function ShopPage() {
  const {
    filteredProducts,
    selectedCategory,
    productFilters,
    telescopeFilters,
    mountFilters,
    eyepieceFilters,
    filterFilters,
    filterProductsBySubCategory,

    currentPage,
    getCurrentPageProducts,
    getTotalPages,
    setCurrentPage,
  } = useProductsStore();

  // ---------------- Pagination Logic --------------------
  // Obtener productos de la página actual y total de páginas
  const currentPageProducts = getCurrentPageProducts();
  const totalPages = getTotalPages();

  // Función para cambiar página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll suave al inicio de la página
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // -------------- Filters Logic -------------------------
  // IMPROVE LOGIC -- REFACTOR !!!!!!
  // Main selected filter by selected category
  const mainFilterNameByCategory: Record<string, string | null> = {
    telescopes: telescopeFilters?.opticalDesign,
    mounts: mountFilters?.buildType,
    eyepieces: eyepieceFilters?.buildType,
    filters: filterFilters?.buildType,
  };

  const selectedMainFilterName = selectedCategory
    ? mainFilterNameByCategory[selectedCategory]
    : undefined;

  // Filtra los filtros por la categoría seleccionada
  const relevantFilters = selectedCategory
    ? productFilters.filter((f) => f.category === selectedCategory)
    : productFilters;

  // Busca el filtro principal seleccionado solo entre los relevantes
  const selectedMainFilter = relevantFilters.find(
    (filter) => filter.name === selectedMainFilterName,
  );

  const handleRemoveMainFilter = () => {
    if (selectedCategory === "telescopes") {
      filterProductsBySubCategory("telescopes", {
        ...telescopeFilters,
        opticalDesign: null,
      });
    } else if (selectedCategory === "mounts") {
      filterProductsBySubCategory("mounts", {
        ...mountFilters,
        buildType: null,
      });
    } else if (selectedCategory === "eyepieces") {
      filterProductsBySubCategory("eyepieces", {
        ...eyepieceFilters,
        buildType: null,
      });
    } else if (selectedCategory === "filters") {
      filterProductsBySubCategory("filters", {
        ...filterFilters,
        buildType: null,
      });
    }
  };

  return (
    <section className="h-full">
      {/* Category Description / Main Selected Filter */}
      {selectedCategory && CATEGORY_CONFIG[selectedCategory] && (
        <div className="mb-4">
          {selectedMainFilter ? (
            <>
              {/* Breadcrumb */}
              <div className="my-2 flex items-center gap-2">
                <span className="font-black">
                  {CATEGORY_CONFIG[selectedCategory].title}
                </span>
                <span className="mx-1">→</span>
                <span className="font-semibold">{selectedMainFilter.name}</span>
                <button
                  className=""
                  aria-label="Remove filter"
                  onClick={handleRemoveMainFilter}
                >
                  <IoIosClose size={32} className="text-red-500" />
                </button>
              </div>
              {/* Main Filter Info */}
              <div className="mt-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-700">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex min-w-[8rem] flex-col items-center">
                    <img
                      src={selectedMainFilter.image_url}
                      alt={selectedMainFilter.name}
                      className="rounded-full"
                    />
                    <h3 className="text-lg font-bold">
                      {selectedMainFilter.name}
                    </h3>
                  </div>
                  <div>
                    <p className="text-sm">{selectedMainFilter.description}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>
              <h2 className="font-orbitron text-2xl font-bold">
                {CATEGORY_CONFIG[selectedCategory].title}
              </h2>
              <p className="font-space text-sm">
                {CATEGORY_CONFIG[selectedCategory].description}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Filters Navbar */}
      <div className="sticky top-[68px]">
        <FiltersNavBar />
      </div>

      {/* Fixed Filters and Sortby Menus */}
      <FiltersMenu />
      <SortByMenu />

      {/* Go to Top Button */}
      <GoToTopButton />

      {/* PRODUCTS LIST - AHORA USA currentPageProducts EN LUGAR DE filteredProducts */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        {currentPageProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* COMPONENTE DE PAGINACIÓN */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
