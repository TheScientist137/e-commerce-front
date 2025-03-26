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
 telescopeType: TelescopeType,
 opticalDesign: OpticalDesign
}

export type TelescopeType = {
 id: number,
 type: string,
 description: string
}

export type OpticalDesign = {
 id: number,
 type: string,
 description: string
}

// Mount types
export type Mount = {
 id: number,
 name: string,
 description: string,
 price: number,
 brand: string,
 image: string,
 mountingType: MountingType,
}

export type MountingType = {
 id: number,
 type: string,
 description: string
}

// Cart types
export type CartItem = {
 product: Telescope | Mount,
 quantity: number
}

// ShopContext types
export type ShopContextType = {
 cartItems: CartItem[],
 setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
}

// AuthContext types
export type AuthContextType = {
 user: User | null,
 isAdmin: boolean | null,
 login: (token: string, userData: User) => void,
 logout: () => void,
 checkAuth: () => Promise<void>
}
