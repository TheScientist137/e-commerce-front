import { useProductsStore } from "../stores/productsStore.ts";
import FiltersNavBar from "../components/FiltersNavBar.tsx";
import ProductCard from "../components/ProductCard.tsx";

type CategoryConfig = {
  title: string;
  description: string;
};

type CategoryConfigMap = {
  [key: string]: CategoryConfig;
};

export default function ShopPage() {
  const { filteredProducts, selectedCategory } = useProductsStore();

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

  return (
    <section className="my-4">
      {selectedCategory && (
        <div>
          <h2 className="font-zen text-lg">
            {CATEGORY_CONFIG[selectedCategory].title}
          </h2>
          <p className="">{CATEGORY_CONFIG[selectedCategory].description}</p>
        </div>
      )}

      {/* Don`t show FiltersNavbar when CategoriesMenu is open */}
      <FiltersNavBar />

      {/* PRODUCTS LIST */}
      <div className="grid grid-cols-2 gap-2">
        {filteredProducts.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </section>
  );
}
