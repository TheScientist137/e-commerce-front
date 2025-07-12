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
          <div className="text-center md:text-left">
            <h2 className="font-orbitron text-2xl font-bold md:text-3xl lg:text-4xl">
              {CATEGORY_CONFIG[selectedCategory].title}
            </h2>
            <p className="font-space mt-2 text-sm leading-relaxed md:text-base lg:text-lg">
              {CATEGORY_CONFIG[selectedCategory].description}
            </p>
          </div>
        </div>
      )}

      {/* Filters Navbar */}
      <div className="sticky top-[68px] md:top-[78px] lg:top-[88px]">
        <FiltersNavBar />
      </div>

      {/* Fixed Filters and Sortby Menus */}
      <FiltersMenu />
      <SortByMenu />

      {/* Go to Top Button */}
      <GoToTopButton />

      {/* PRODUCTS LIST - AHORA USA currentPageProducts EN LUGAR DE filteredProducts */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
