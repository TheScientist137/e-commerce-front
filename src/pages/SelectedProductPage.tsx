import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useCartStore } from "../stores/cartStore.ts";
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
  const { id, type } = useParams();
  const { addToCart } = useCartStore();
  const [selectedProduct, setSelectedProduct] = useState<
    TelescopeType | MountType | EyepieceType | FilterType | null
  >(null);

  // show more (expand/collapse) in description and table implementation !!

  // Effect to obtain the product when id updates
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
      } catch (error) {
        console.error("Error fetching product by id", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!selectedProduct) return <div>Loading product...</div>;
  return (
    <section>
      <Link to="/">
        <div className="flex h-8 items-center gap-2">
          <FaArrowLeft />
          <button>Back</button>
        </div>
      </Link>

      {/* Add to cart Product card */}
      <div className="p-2 text-center">
        <img
          className="object-contain"
          src={selectedProduct.image}
          alt="product image"
        />

        <div className="my-6">
          <h3 className="mb-4 text-2xl font-semibold">
            {selectedProduct.name}
          </h3>
          <img
            className="h-24 w-full object-contain"
            src={selectedProduct.brand_image}
            alt={selectedProduct.brand_name}
          />
        </div>

        <div className="my-4">
          <p className="text-xl font-bold text-red-600 mb-2">
            {selectedProduct.price} $
          </p>
          <button
            className="rounded-xl border p-2 font-extrabold"
            onClick={() => addToCart(selectedProduct)}
          >
            <Link to="/cart">ADD TO CART</Link>
          </button>
        </div>
      </div>

      {/* Description and Specifications */}
      <div className="font-space">
        <div className="">
          <h3 className="text-xl">Product Description</h3>
          <p className="font-space">{selectedProduct.description}</p>
        </div>
        <div className="">
          <h3 className="text-xl">Specifications</h3>
          <table className="table-auto border-separate border-spacing-2">
            <tbody>
              {SPEC_FIELDS[selectedProduct.product_type].map((specs) => (
                <tr key={specs.key}>
                  <td className="bg-gray-300 p-2 font-bold">{specs.label}</td>
                  <td className="bg-gray-200 p-2 text-center">
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
        </div>
      </div>
    </section>
  );
}
