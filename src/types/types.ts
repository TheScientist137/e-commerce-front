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
 product_id: number,
 telescope_type: string,
 telescope_type_description: string,
 optical_design: string,
 optical_design_description: string
}

export type MountType = {
 product_id: number,
 mount_type: string,
 mount_type_description: string
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
export type AuthContextType = {
 user: UserType | null,
 isAdmin: boolean | null,
 login: (token: string, userData: UserType) => void,
 logout: () => void,
 checkAuth: () => Promise<void>
}

export type ShopContextType = {
 products: ProductType[],
 filteredProducts: ProductType[],
 cartItems: CartItemType[],
 setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>,
 setFilteredProducts: React.Dispatch<React.SetStateAction<ProductType[]>>,
 fetchProducts: () => Promise<void>
}