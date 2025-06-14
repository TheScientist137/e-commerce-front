import { useRef } from "react";
import { useProductsStore } from "../stores/productsStore.ts";
import { useUiStore } from "../stores/uiStore.ts";
import FiltersButtons from "../components/FiltersButtons.tsx";
import FiltersNavBar from "../components/FiltersNavBar.tsx";
import ProductCard from "../components/ProductCard.tsx";
import FiltersMenu from "../components/FiltersMenu.tsx";
import SortByMenu from "../components/SortByMenu.tsx";

type CategoryConfig = {
  title: string;
  description: string;
};
type CategoryConfigMap = {
  [key: string]: CategoryConfig;
};
const CATEGORY_CONFIG: CategoryConfigMap = {
  telescopes: {
    title: "TELESCOPES",
    description:
      "Explore the cosmos with our precision-engineered telescopes. Whether you're taking your first steps in astronomy or pushing the boundaries of deep-space observation, our curated collection offers optical excellence for every level of enthusiast. Experience crystal-clear views of planets, galaxies, and nebulae with instruments crafted for discovery.",
  },
  mounts: {
    title: "MOUNTS",
    description:
      "The foundation of every great observation session starts with a stable mount. ur selection of equatorial and alt-azimuth mounts provides buttery-smooth tracking, vibration-free performance, and effortless celestial navigation. From portable setups to observatory-grade systems, find your perfect platform for hours of comfortable stargazing.",
  },
  eyepieces: {
    title: "EYEPIECES",
    description:
      "  Transform your telescope's capabilities with our premium eyepieces. Featuring multi-coated optics and precision engineering, our range delivers exceptional edge-to-edge clarity, comfortable eye relief, and stunning contrast. Whether you're observing lunar details or hunting faint deep-sky objects, the right eyepiece makes all the difference.",
  },
  filters: {
    title: "FILTERS",
    description:
      "Enhance your celestial views with our professional-grade filters. Reduce light pollution, boost planetary contrast, and reveal subtle nebula details with precision optical filters designed for specific astronomical targets. Our carefully selected range helps you see more, even under less-than-ideal observing conditions.",
  },
};

export default function ShopPage() {
  const filterButtonsRef = useRef<HTMLDivElement | null>(null);
  const { filteredProducts, selectedCategory } = useProductsStore();
  const { isFiltersMenuOpen, isSortMenuOpen } = useUiStore();

  return (
    <section className="my-8">
      {/* Category and Description */}
      {selectedCategory && (
        <div className="">
          <div>
            <h2 className="font-orbitron text-xl font-bold">
              {CATEGORY_CONFIG[selectedCategory].title}
            </h2>
            <p className="font-space text-sm">
              {CATEGORY_CONFIG[selectedCategory].description}
            </p>
          </div>
        </div>
      )}

      {/* Show buttons only when any filter is active */}
      <div ref={filterButtonsRef} className="">
        {<FiltersButtons />}
      </div>

      {/* Filters Navbar */}
      <div className="sticky top-[62px]">
        <FiltersNavBar filterButtonsRef={filterButtonsRef} />
        {isFiltersMenuOpen && <FiltersMenu />}
        {isSortMenuOpen && <SortByMenu />}
      </div>

      {/* PRODUCTS LIST */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
