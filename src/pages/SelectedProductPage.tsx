import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/cartStore.ts";
import {
  getTelesocopeByIdService,
  getMountByIdService,
  getEyepieceByIdService,
  getFilterByIdService
} from "../services/shopService.ts";
import { MountType, TelescopeType, EyepieceType, FilterType } from "../types/types.ts";

export default function ProductPage() {
  const { id, type } = useParams();
  const {addToCart} = useCartStore();
  const [selectedProduct, setSelectedProduct] = useState<
    TelescopeType | MountType | EyepieceType | FilterType | null
  >(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id || !type) {
          throw new Error("Id is missing");
        }
        if (type === 'telescope') {
          const product = await getTelesocopeByIdService(id);
          setSelectedProduct(product);
        } else if (type === 'mount') {
          const product = await getMountByIdService(id);
          setSelectedProduct(product);
        }
        else if (type === 'eyepiece') {
          const product = await getEyepieceByIdService(id);
          setSelectedProduct(product);
        }
        else if (type === 'filter') {
          const product = await getFilterByIdService(id);
          setSelectedProduct(product);
        }
      } catch (error) {
        console.error("Error fetching product by id", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!selectedProduct) {
    return <div>Loading product...</div>;
  }
  return (
    <section>
      <Link to="/">Back shop</Link>

      <div>
        <h3>{selectedProduct.brand}</h3>
        <h3>{selectedProduct.name}</h3>
        <img src={selectedProduct.image} alt="product image" />
        <p>{selectedProduct.price} $</p>
        <button onClick={() => addToCart(selectedProduct)}>
          <Link to="/cart">ADD TO CART</Link>
        </button>
      </div>
      <div>
        <h3>Product Description</h3>
        <p>{selectedProduct.description}</p>
      </div>
      <div>
        <h3>Specifications</h3>
        {selectedProduct.product_type === "telescope" && (
          <div>
            <p><strong>Type</strong> {(selectedProduct as TelescopeType).specifications.type}</p>
            <p><strong>Type of build</strong> {(selectedProduct as TelescopeType).specifications.optical_design}</p>
            <p><strong>Aperture (mm)</strong> {(selectedProduct as TelescopeType).specifications.aperture}</p>
            <p><strong>Focal length (mm)</strong> {(selectedProduct as TelescopeType).specifications.focal_length}</p>
            <p><strong>Aperture ratio (f/)</strong> {(selectedProduct as TelescopeType).specifications.aperture_ratio}</p>
            <p><strong>Resolving capacity</strong> {(selectedProduct as TelescopeType).specifications.resolving_capacity}</p>
            <p><strong>Limit value (mag)</strong> {(selectedProduct as TelescopeType).specifications.limit_value}</p>
            <p><strong>Light gathering capacity</strong> {(selectedProduct as TelescopeType).specifications.light_gathering_capacity}</p>
            <p><strong>Max useful magnification</strong> {(selectedProduct as TelescopeType).specifications.max_useful_magnification}</p>
            <p><strong>Total weight (kg)</strong> {(selectedProduct as TelescopeType).specifications.total_weight}</p>
            <p><strong>Mount build type</strong> {(selectedProduct as TelescopeType).specifications.mount_build_type}</p>
            <p><strong>Mount type</strong> {(selectedProduct as TelescopeType).specifications.mount_type}</p>
            <p><strong>GoTo</strong> {(selectedProduct as TelescopeType).specifications.GoTo}</p>
            <p><strong>Moon and planets</strong> {(selectedProduct as TelescopeType).specifications.moon_planets}</p>
            <p><strong>Nebulae and galaxies</strong> {(selectedProduct as TelescopeType).specifications.nebulae_galaxies}</p>
            <p><strong>Nature observation</strong> {(selectedProduct as TelescopeType).specifications.nature_observation}</p>
            <p><strong>Astrophotography</strong> {(selectedProduct as TelescopeType).specifications.astrophotography}</p>
            <p><strong>Sun</strong> {(selectedProduct as TelescopeType).specifications.sun}</p>
            <p><strong>Beginners</strong> {(selectedProduct as TelescopeType).specifications.beginners}</p>
            <p><strong>Advanced</strong> {(selectedProduct as TelescopeType).specifications.advanced}</p>
            <p><strong>Observatories</strong> {(selectedProduct as TelescopeType).specifications.observatories}</p>
          </div>
        )}
        {selectedProduct.product_type === "mount" && (
          <div>
            <div>
              <p><strong>Max. additional load capacity (kg)</strong> {(selectedProduct as MountType).specifications.max_adding_load_capacity}</p>
              <p><strong>Polar axis scale</strong> {(selectedProduct as MountType).specifications.polar_axis_scale}</p>
              <p><strong>GoTo system</strong> {(selectedProduct as MountType).specifications.GoTo}</p>
              <p><strong>Pole finder</strong> {(selectedProduct as MountType).specifications.pole_finder}</p>
              <p><strong>Total weight (kg)</strong> {(selectedProduct as MountType).specifications.total_weight}</p>
              <p><strong>Type</strong> {(selectedProduct as MountType).specifications.type}</p>
              <p><strong>Type of build</strong> {(selectedProduct as MountType).specifications.build_type}</p>
              <p><strong>Series</strong> {(selectedProduct as MountType).specifications.series}</p>
              {(selectedProduct as MountType).specifications.GoTo && (
                <>
                  <p><strong>Software</strong> {(selectedProduct as MountType).specifications.software}</p>
                  <p><strong>Database</strong> {(selectedProduct as MountType).specifications.database}</p>
                  <p><strong>GPS</strong> {(selectedProduct as MountType).specifications.GPS}</p>
                  <p><strong>Autoguiding</strong> {(selectedProduct as MountType).specifications.autoguiding}</p>
                  <p><strong>WIFI</strong> {(selectedProduct as MountType).specifications.WIFI}</p>
                </>
              )}
            </div>
          </div>
        )}
        {selectedProduct.product_type === "eyepiece" && (
          <div>
            <div>
              <p><strong>Focal length (mm)</strong> {(selectedProduct as EyepieceType).specifications.focal_length}</p>
              <p><strong>Apparent field of view</strong> {(selectedProduct as EyepieceType).specifications.apparent_field}</p>
              <p><strong>Number of lenses</strong> {(selectedProduct as EyepieceType).specifications.number_of_lenses}</p>
              <p><strong>Coating optical system</strong> {(selectedProduct as EyepieceType).specifications.coating_optical_system}</p>
              <p><strong>Adjustable eyepiece cup</strong> {(selectedProduct as EyepieceType).specifications.adjustable_eyepiece_cup}</p>
              <p><strong>Filter thread</strong> {(selectedProduct as EyepieceType).specifications.filter_thread}</p>
              <p><strong>Series</strong> {(selectedProduct as EyepieceType).specifications.series}</p>
              <p><strong>Type</strong> {(selectedProduct as EyepieceType).specifications.type}</p>
              <p><strong>Type of build</strong> {(selectedProduct as EyepieceType).specifications.build_type}</p>
            </div>
          </div>
        )}
        {selectedProduct.product_type === "filter" && (
          <div>
            <div>
              <p><strong>Connection (to the telescope)</strong> {(selectedProduct as FilterType).specifications.connection}</p>
              <p><strong>Transmission</strong> {(selectedProduct as FilterType).specifications.transmission}</p>
              <p><strong>Mount material</strong> {(selectedProduct as FilterType).specifications.mount_material}</p>
              <p><strong>Frame</strong> {(selectedProduct as FilterType).specifications.frame}</p>
              <p><strong>Series</strong> {(selectedProduct as FilterType).specifications.series}</p>
              <p><strong>Type</strong> {(selectedProduct as FilterType).specifications.type}</p>
              <p><strong>Type of build</strong> {(selectedProduct as FilterType).specifications.build_type}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
