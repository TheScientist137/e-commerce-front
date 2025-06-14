import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useCartStore } from "../stores/cartStore.ts";
import { useProductsStore } from "../stores/productsStore.ts";
import {
  getTelesocopeByIdService,
  getMountByIdService,
  getEyepieceByIdService,
  getFilterByIdService,
} from "../services/shopService.ts";
import {
  MountType,
  TelescopeType,
  EyepieceType,
  FilterType,
} from "../types/types.ts";
import { FaArrowLeft } from "react-icons/fa";

const SPEC_FIELDS: Record<string, { key: string; label: string }[]> = {
  telescope: [
    { key: "type", label: "Type" },
    { key: "optical_design", label: "Type of build" },
    { key: "aperture", label: "Aperture (mm)" },
    { key: "focal_length", label: "Focal length (mm)" },
    { key: "aperture_ratio", label: "Aperture ratio (f/)" },
    { key: "resolving_capacity", label: "Resolving capacity" },
    { key: "limit_value", label: "Limit value (mag)" },
    { key: "light_gathering_capacity", label: "Light gathering capacity" },
    { key: "max_useful_magnification", label: "Max useful magnification" },
    { key: "total_weight", label: "Total weight (kg)" },
    { key: "mount_build_type", label: "Mount build type" },
    { key: "mount_type", label: "Mount type" },
    { key: "GoTo", label: "GoTo" },
    { key: "moon_planets", label: "Moon and planets" },
    { key: "nebulae_galaxies", label: "Nebulae and galaxies" },
    { key: "nature_observation", label: "Nature observation" },
    { key: "astrophotography", label: "Astrophotography" },
    { key: "sun", label: "Sun" },
    { key: "beginners", label: "Beginners" },
    { key: "advanced", label: "Advanced" },
    { key: "observatories", label: "Observatories" },
  ],
  mount: [
    {
      key: "max_adding_load_capacity",
      label: "Max. additional load capacity (kg)",
    },
    { key: "polar_axis_scale", label: "Polar axis scale" },
    { key: "GoTo", label: "GoTo system" },
    { key: "pole_finder", label: "Pole finder" },
    { key: "total_weight", label: "Total weight (kg)" },
    { key: "type", label: "Type" },
    { key: "build_type", label: "Type of build" },
    { key: "series", label: "Series" },
    { key: "software", label: "Software" },
    { key: "database", label: "Database" },
    { key: "GPS", label: "GPS" },
    { key: "autoguiding", label: "Autoguiding" },
    { key: "WIFI", label: "WIFI" },
  ],
  eyepiece: [
    { key: "focal_length", label: "Focal length (mm)" },
    { key: "apparent_field", label: "Apparent field of view" },
    { key: "number_of_lenses", label: "Number of lenses" },
    { key: "coating_optical_system", label: "Coating optical system" },
    { key: "adjustable_eyepiece_cup", label: "Adjustable eyepiece cup" },
    { key: "filter_thread", label: "Filter thread" },
    { key: "series", label: "Series" },
    { key: "type", label: "Type" },
    { key: "build_type", label: "Type of build" },
  ],
  filter: [
    { key: "connection", label: "Connection (to the telescope)" },
    { key: "transmission", label: "Transmission" },
    { key: "mount_material", label: "Mount material" },
    { key: "frame", label: "Frame" },
    { key: "series", label: "Series" },
    { key: "type", label: "Type" },
    { key: "build_type", label: "Type of build" },
  ],
};

export default function ProductPage() {
  const navigate = useNavigate();
  const { id, type } = useParams();
  const { addToCart } = useCartStore();
  const {selectedCategory, filterProductsByCategory} = useProductsStore()
  const [selectedProduct, setSelectedProduct] = useState<
    TelescopeType | MountType | EyepieceType | FilterType | null
  >(null);
  const [showFullDescription, setShowFullDescription] =
    useState<boolean>(false);
  const [showFullTable, setShowFullTable] = useState<boolean>(false);

  // show more (expand/collapse) in description and table implementation !!

  // Effect to obtain from db the product by id
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id || !type) throw new Error("Id is missing");

        if (type === "telescope") {
          const product = await getTelesocopeByIdService(id);
          setSelectedProduct(product);
        } else if (type === "mount") {
          const product = await getMountByIdService(id);
          setSelectedProduct(product);
        } else if (type === "eyepiece") {
          const product = await getEyepieceByIdService(id);
          setSelectedProduct(product);
        } else if (type === "filter") {
          const product = await getFilterByIdService(id);
          setSelectedProduct(product);
        }

        // Go to the top when opening SelectedProductPage
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.error("Error fetching product by id", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCartClick = () => {
    selectedProduct && addToCart(selectedProduct);
    navigate("/cart");
  };

    const handleBackToShop = (category: string) => {
    navigate("/shop");
    filterProductsByCategory(category);
    // Go to the top when changing category
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!selectedProduct) return <div>Loading product...</div>;
  return (
    <section className="h-full">
      <div
        onClick={() => selectedCategory && handleBackToShop(selectedCategory)}
        className="flex items-center py-2 justify-center gap-4 rounded-xl bg-slate-100 dark:bg-slate-800 "
      >
        <FaArrowLeft />
        <span>Back to shop</span>
      </div>

      {/* ----------------- Add to cart Product card ------------------ */}
      <div className="my-4 flex flex-col gap-4 rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
        {/* Product details */}
        <div>
          <div className="rounded-xl border bg-slate-50 p-2 dark:bg-slate-700">
            <img
              className="object-contain rounded-xl"
              src={selectedProduct.image}
              alt="product image"
            />
          </div>
          <img
            className="h-20 w-30 object-contain rounded-2xl"
            src={selectedProduct.brand_image}
            alt={selectedProduct.brand_name}
          />
          <h2 className="font-space text-lg font-bold">
            {selectedProduct.name}
          </h2>
        </div>
        {/* Add to Cart */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold text-red-600">
            {selectedProduct.price} $
          </span>
          <button
            className="rounded-xl bg-slate-50 p-4 font-extrabold dark:bg-slate-700"
            onClick={() => handleAddToCartClick()}
          >
            ADD TO CART
          </button>
        </div>
      </div>

      {/* --------------- Description & Specs -------------------------*/}
      <div className="font-space flex flex-col gap-4 rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
        {/* Description */}
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl">Product Description</h3>
          <p>
            {showFullDescription
              ? selectedProduct.description
              : selectedProduct.description.slice(0, 200) +
                (selectedProduct.description.length > 200 ? "..." : "")}
          </p>
          {selectedProduct.description.length > 200 && (
            <button
              className="rounded-xl bg-slate-50 p-2 dark:bg-slate-700"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? "Show less" : "Show more"}
            </button>
          )}
        </div>
        {/* Specifications */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xl">Specifications</h3>
          <table className="table-auto border-separate border-spacing-2">
            <tbody>
              {(showFullTable
                ? SPEC_FIELDS[selectedProduct.product_type]
                : SPEC_FIELDS[selectedProduct.product_type].slice(0, 5)
              ).map((specs) => (
                <tr key={specs.key}>
                  <td className="bg-slate-100 p-2 font-bold dark:bg-slate-700">
                    {specs.label}
                  </td>
                  <td className="bg-slate-50 p-2 text-center dark:bg-slate-600">
                    {
                      (
                        selectedProduct.specifications as Record<
                          string,
                          string | number
                        >
                      )[specs.key]
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {SPEC_FIELDS[selectedProduct.product_type].length > 5 && (
            <button
              className="rounded-xl bg-slate-50 p-2 dark:bg-slate-700"
              onClick={() => setShowFullTable((prev) => !prev)}
            >
              {showFullTable ? "Show less" : "Show more"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
