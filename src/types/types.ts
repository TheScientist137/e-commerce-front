// User types
export type User = {
 id: number,
 name: string,
 email: string,
 role: 'user' | 'admin'
}

// Product types
export type BaseProduct = {
 id: number,
 name: 'string',
 description: 'string',
 price: number,
 brand: string,
 image: string,
 product_type: 'telescope' | 'mount',
 created_at: string,
 updated_at: string,
}

export type Telescope = {
 product_id: number,
 telescope_type: string,
 telescope_type_description: string,
 optical_design: string,
 optical_design_description: string
}

export type Mount = {
 product_id: number,
 mount_type: string,
 mount_type_description: string
}

export type Product = BaseProduct & {
 telescope?: Telescope,
 mount?: Mount
}

export type ProductFormValues = {
 name: string,
 description: string,
 price: number,
 brand: string,
 image: string,
 product_type: 'telescope' | 'mount',
 telescope_type?: string,
 optical_design?: string,
 mount_type?: string
}

export type CartItem = {
 product: Product,
 quantity: number
}

// Context types
export type AuthContextType = {
 user: User | null,
 isAdmin: boolean | null,
 login: (token: string, userData: User) => void,
 logout: () => void,
 checkAuth: () => Promise<void>
}

export type ShopContextType = {
 products: Product[],
 filteredProducts: Product[],
 cartItems: CartItem[],
 setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
 setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>
}