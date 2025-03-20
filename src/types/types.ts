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
