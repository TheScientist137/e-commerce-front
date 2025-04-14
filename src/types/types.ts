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
 product_type: 'telescope' | 'mount',
 created_at: string,
 updated_at: string
}

export type TelescopeType = {
 id: number,
 product_type: 'telescope'
 name: string,
 description: string,
 brand: string,
 price: number,
 image: string,
 telescope_type: string,
 telescope_type_description: string,
 optical_design_type: string,
 optical_design_description: string,
}

export type MountType = {
 id: number,
 product_type: 'mount'
 name: string,
 description: string,
 brand: string,
 price: number,
 image: string,
 mount_type: string,
 mount_type_description: string,
}

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

