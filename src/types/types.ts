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
  brand_name: string;
  brand_image: string;
  price: number;
  image: string;
  image_public_id: string;
  product_type: "telescope" | "mount" | "eyepiece" | "filter";
  created_at: string;
  updated_at: string;
};

// Tipo para las especificaciones del telescopio
export type TelescopeSpecsType = {
  id: number;
  telescope_id: number;
  type: string;
  optical_design: string;
  aperture: string;
  focal_length: string;
  aperture_ratio: string;
  resolving_capacity: string;
  limit_value: string;
  light_gathering_capacity: string;
  max_useful_magnification: string;
  mount_type: string;
  mount_build_type: string;
  GoTo: string;
  total_weight: string;
  moon_planets: string;
  nebulae_galaxies: string;
  nature_observation: string;
  astrophotography: string;
  sun: string;
  beginners: string;
  advanced: string;
  observatories: string;
};

export type MountSpecsType = {
  id: number;
  mount_id: number;
  max_adding_load_capacity: string;
  polar_axis_scale: string;
  GoTo: string;
  pole_finder: string;
  total_weight: string;
  type: string;
  build_type: string;
  series: string;
  software: string;
  database: string;
  GPS: string;
  autoguiding: string;
  WIFI: string;
};

export type EyepieceSpecsType = {
  id: number;
  eyepiece_id: number;
  focal_length: string;
  apparent_field: string;
  number_of_lenses: string;
  coating_optical_system: string;
  adjustable_eyepiece_cup: string;
  filter_thread: string;
  series: string;
  type: string;
  build_type: string;
};

export type FilterSpecsType = {
  id: number;
  filter_id: number;
  connection: string;
  frame: string;
  transmission: string;
  mount_material: string;
  series: string;
  type: string;
  build_type: string;
};

// Tipo para el telescopio que extiende ProductType
export type TelescopeType = ProductType & {
  optical_design_name: string;
  optical_design_image: string;
  mount_type_name: string;
  mount_type_image: string;
  specifications: TelescopeSpecsType;
};

export type MountType = ProductType & {
  build_type_name: string;
  build_type_image: string;
  specifications: MountSpecsType;
};

export type EyepieceType = ProductType & {
  build_type_name: string;
  build_type_image: string;
  specifications: EyepieceSpecsType;
};
export type FilterType = ProductType & {
  build_type_name: string;
  build_type_image: string;
  specifications: FilterSpecsType;
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
