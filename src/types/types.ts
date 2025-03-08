// User types
export type User = {
 id: number,
 name: string,
 email: string
}

// Telescope types
export type Telescope = {
 id: number,
 name: string,
 description: string,
 price: number,
 brand: string,
 telescopeType: TelescopeType,
}

export type TelescopeType = {
 id: number,
 type: string,
 description: string
}

// Mount types

// Cart types
export type CartItem = {
 product: Telescope,
 quantity: number
}
