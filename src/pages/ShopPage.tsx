import { Link } from "react-router";
import { useProductsStore } from "../stores/productsStore.ts";
import { useUiStore } from "../stores/uiStore.ts";
import { FaArrowCircleUp } from "react-icons/fa";
import FiltersNavBar from "../components/FiltersNavBar.tsx";

type CategoryConfig = {
  title: string;
  description: string;
};

type CategoryConfigMap = {
  [key: string]: CategoryConfig;
};

export default function ShopPage() {
  const { filteredProducts, selectedCategory } = useProductsStore();
  const { isMenuOpen } = useUiStore();

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
    products: {
      title: "ALL PRODUCTS",
      description: "Browse our complete collection of astronomy equipment.",
    },
  };

  return (
    <section className="">
      {selectedCategory && (
        <div>
          <h2>{CATEGORY_CONFIG[selectedCategory].title}</h2>
          <p>{CATEGORY_CONFIG[selectedCategory].description}</p>
        </div>
      )}

      {!isMenuOpen && <FiltersNavBar />}

      {/* PRODUCTS LIST */}
      <div className="">
        {filteredProducts.map((product) => (
          <div className="flex flex-col items-center" key={product.id}>
            <h3>{product.name}</h3>
            <img
              src={product.image}
              alt="image"
              style={{ maxWidth: "200px" }}
            />
            <p>{product.brand}</p>
            <p>{product.price} $</p>
            <Link
              className="underline"
              to={`/product/${product.product_type}/${product.id}`}
            >
              View details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
