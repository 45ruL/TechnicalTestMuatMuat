/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ProductType } from "@/types/productType";
import { InitialProductData } from "@/dummy/dummyProduct";

interface ProductState {
  products: ProductType[];
  filteredProducts: ProductType[];
  addProduct: (product: Omit<ProductType, "id">) => void;
  updateProduct: (id: string | number, product: any) => void;
  deleteProduct: (id: number | string) => void;
  searchProducts: (query: string) => void;
  sortByPrice: (order: "asc" | "desc") => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: InitialProductData,
  filteredProducts: InitialProductData,
  addProduct: (product) => {
    set((state) => {
      const newProducts = [
        ...state.products,
        { ...product, id: Math.random() },
      ];
      return {
        products: newProducts,
        filteredProducts: newProducts,
      };
    });
  },
  updateProduct: (id, product) => {
    set((state) => {
      const updatedProducts = state.products.map((item) =>
        item.id === id ? { ...item, ...product } : item
      );

      return {
        products: updatedProducts,
        filteredProducts: updatedProducts,
      };
    });
  },
  deleteProduct: (id) => {
    set((state) => {
      const updatedProducts = state.products.filter((item) => item.id !== id);
      return {
        products: updatedProducts,
        filteredProducts: updatedProducts,
      };
    });
  },
  searchProducts: (query: string) => {
    set((state) => ({
      filteredProducts: state.products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      ),
    }));
  },
  sortByPrice: (order: "asc" | "desc" | "") => {
    set((state) => ({
      filteredProducts:
        order === ""
          ? [...state.products]
          : [...state.filteredProducts].sort((a, b) =>
              order === "asc" ? b.price - a.price : a.price - b.price
            ),
    }));
  },
}));
