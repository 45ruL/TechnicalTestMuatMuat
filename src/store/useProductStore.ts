/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ProductType } from "@/types/productType";
import { InitialProductData } from "@/dummy/dummyProduct";

interface ProductState {
  products: ProductType[];
  addProduct: (product: Omit<ProductType, "id">) => void;
  updateProduct: (id: string | number, product: any) => void;
  deleteProduct: (id: number | string) => void;
  searchProducts?: (query: string) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: InitialProductData,
  addProduct: (product) => {
    set((state) => ({
      products: [...state.products, { ...product, id: Math.random() }],
    }));
  },
  updateProduct: (id, product) => {
    set((state) => ({
      products: state.products.map((item) =>
        item.id === id ? { ...item, ...product } : item
      ),
    }));
  },
  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter((item) => item.id !== id),
    }));
  },
  //   searchProducts: (query) => {
  //     set((state) => ({
  //       products: state.products.filter((item) =>
  //         item.name.toLowerCase().includes(query.toLowerCase())
  //       ),
  //     }));
  //   },
}));
