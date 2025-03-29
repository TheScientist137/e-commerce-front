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
 telescope_type_description: string,
 optical_design_type: string
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

// Cart types
export type CartItem = {
 product: Telescope | Mount,
 quantity: number
}

export type Cart = CartItem[]

// Context types
export type ShopContextType = {
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
