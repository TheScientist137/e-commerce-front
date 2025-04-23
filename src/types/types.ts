// User types
export type UserType = {
 id: number,
 name: string,
 email: string,
 role: 'user' | 'admin'
}

// Product types
export type ProductType = {
 id: number,
 name: string,
 description: string,
 brand: string,
 price: number,
 image: string,
 image_public_id: string,
 product_type: 'telescope' | 'mount',
 created_at: string,
 updated_at: string
}

export type TelescopeType = ProductType &{
 telescope_type: string,
 telescope_type_description: string,
 optical_design_type: string,
 optical_design_description: string,
}

export type MountType = ProductType & {
 mount_type: string,
 mount_type_description: string,
}

export type ProductCategoryType = {
 id: number,
 type: string,
 description: string
}

export type ProductsTypesType = {
 telescopeTypes: ProductCategoryType[],
 opticalDesigns: ProductCategoryType[],
 mountTypes: ProductCategoryType[]
}

// Comprobar si sigue haciendo falta?? => Refactor
export type ProductFormType = {
 name: string,
 description: string,
 brand: string,
 price: number,
 image: string,
 product_type: 'telescope' | 'mount',
 telescope_type_id: number,
 optical_design_id: number,
 mount_type_id: number
}

export type CartItemType = {
 product: ProductType,
 quantity: number
}

// Context types

