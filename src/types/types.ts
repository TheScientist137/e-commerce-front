// User types
export type UserType = {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
};

// Product types
export type ProductType = {
  id: number;
  name: string;
  description: string;
  brand: string;
  price: number;
  image: string;
  image_public_id: string;
  product_type: "telescope" | "mount";
  created_at: string;
  updated_at: string;
};

// Telescope specific info type
export type TelescopeInfoType = {
  id: number;
  product_id: number;
  telescope_type: string;
  optical_design: string;
  mount_type: string;
  aperture: string;
  // Añade aquí cualquier otro campo específico de telescopios que pueda faltar
  // Por ejemplo: focal_length, weight, etc.
};

// Full telescope type
export type TelescopeType = ProductType & {
  telescopeInfo: TelescopeInfoType;
};

export type MountType = ProductType & {
  mount_type: string;
  mount_type_description: string;
};

export type ProductCategoryType = {
  id: number;
  type: string;
  description: string;
};

export type ProductsTypesType = {
  telescopeTypes: ProductCategoryType[];
  opticalDesigns: ProductCategoryType[];
  mountTypes: ProductCategoryType[];
};

// Comprobar si sigue haciendo falta?? => Refactor
// Mejorar codigo donde usamos el tipo
export type ProductFormType = {
  name: string;
  description: string;
  brand: string;
  price: number;
  image: string;
  product_type: "telescope" | "mount";
  telescope_type_id: number;
  optical_design_id: number;
  mount_type_id: number;
};

export type CartItemType = {
  product: ProductType;
  quantity: number;
};

// Context types
