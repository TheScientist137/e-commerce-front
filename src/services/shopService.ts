import { MountType, ProductType, TelescopeType } from "../types/types.ts";

// MEJORAR SERVICIOS !!!!!!!!

export const getProductsService = async (): Promise<ProductType[]> => {
  const response = await fetch("http://localhost:3000/api/shop/products", {
    credentials: "include",
  });
  const data = await response.json();
  console.log(data.message);
  return data.products || [];
};

export const getTelesocopeByIdService = async (
  id: string | number,
): Promise<TelescopeType> => {
  const response = await fetch(
    `http://localhost:3000/api/shop/telescopes/${id}`,
    {
      credentials: "include",
    },
  );
  const data = await response.json();
  console.log(data.message);
  return data.product;
};

export const getMountByIdService = async (
  id: string | number,
): Promise<MountType> => {
  const response = await fetch(`http://localhost:3000/api/shop/mounts/${id}`, {
    credentials: "include",
  });
  const data = await response.json();
  console.log(data.message);
  return data.product;
};

export const getEyepieceByIdService = async (
  id: string | number,
): Promise<any> => {
  const response = await fetch(
    `http://localhost:3000/api/shop/eyepieces/${id}`,
    {
      credentials: "include",
    },
  );
  const data = await response.json();
  console.log(data.message);
  return data.product;
};

export const getFilterByIdService = async (
  id: string | number,
): Promise<any> => {
  const response = await fetch(`http://localhost:3000/api/shop/filters/${id}`, {
    credentials: "include",
  });
  const data = await response.json();
  console.log(data.message);
  return data.product;
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

export const getEyepiecesService = async (): Promise<any[]> => {
  const response = await fetch("http://localhost:3000/api/shop/eyepieces", {
    credentials: "include",
  });
  const data = await response.json();
  console.log(data.message);
  return data.eyepieces || [];
};

export const getFiltersService = async (): Promise<any[]> => {
  const response = await fetch("http://localhost:3000/api/shop/filters", {
    credentials: "include",
  });
  const data = await response.json();
  console.log(data.message);
  return data.filters || [];
};

export const getProductFiltersService = async (): Promise<any[]> => {
  const response = await fetch(
    "http://localhost:3000/api/shop/filterImages",
    {
      credentials: "include",
    },
  );
  const data = await response.json();
  console.log(data.message)
  return data.productFilters || [];
};
