// User types
export type User = {
 id: number,
 name: string,
 email: string,
 role: 'user' | 'admin'
}

// Telescope types
export type Telescope = {
 id: number,
 name: string,
 description: string,
 price: number,
 brand: string,
 image: string,
 telescope_type: string,
 telescope_type_description: string,    // Campo adicional para el JOIN
 optical_design_type: string,
 optical_design_description: string, // Campo adicional para el JOIN
}

export type NewTelescope = {
 name: string,
 description: string,
 price: number,
 brand: string,
 image: string,
 telescope_type_id: number,
 optical_design_id: number
}

// Mount types
export type Mount = {
 id: number,
 name: string,
 description: string,
 price: number,
 brand: string,
 image: string,
 mount_type: string,
 mount_type_description: string
}

export type NewMount = {
 name: string,
 description: string,
 price: number,
 brand: string,
 image: string,
 mount_type_id: number
}

// Cart types
export type CartItem = {
 product: Telescope | Mount,
 quantity: number
}

export type Cart = CartItem[]

// Context types
export type ShopContextType = {
 telescopes: Telescope[],
 mounts: Mount[],
 filteredTelescopes: Telescope[],
 filterTelescopesByBrand: (brand: string) => void,
 setTelescopes: React.Dispatch<React.SetStateAction<Telescope[]>>,
 setMounts: React.Dispatch<React.SetStateAction<Mount[]>>,
 cartItems: Cart,
 setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>,
 addToCart: (product: Telescope | Mount) => void
}

export type AuthContextType = {
 user: User | null,
 isAdmin: boolean | null,
 login: (token: string, userData: User) => void,
 logout: () => void,
 checkAuth: () => Promise<void>
}
