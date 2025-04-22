import { MountType, ProductType, TelescopeType } from "../types/types.ts";

// Arreglar problema con localStorage y mejorar funciones de servicios!!!!!!!!!!

export const getProductsService = async (): Promise<ProductType[]> => {
  const response = await fetch("http://localhost:3000/api/shop/products", {
    credentials: "include",
  });
  const data = await response.json();
  console.log(data.message);
  return data.products || [];
};

export const getTelescopesService = async (): Promise<TelescopeType[]> => {
  const response = await fetch("http://localhost:3000/api/shop/telescopes", {
    credentials: "include",
  });
  const data = await response.json();
  console.log(data.message);
  return data.telescopes || [];
};

export const getMountsService = async (): Promise<MountType[]> => {
  const response = await fetch("http://localhost:3000/api/shop/mounts", {
    credentials: "include",
  });
  const data = await response.json();
  console.log(data.message);
  return data.mounts || [];
};
