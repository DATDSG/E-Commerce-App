import { create } from "zustand";
import { fetchProducts as fetchProductsService } from "../services/api";

const useStore = create((set) => ({
  products: [],
  cart: [],

  fetchProducts: async () => {
    try {
      const products = await fetchProductsService();
      set({ products });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  },

  addToCart: (product) =>
    set((state) => {
      const isProductInCart = state.cart.some((item) => item.id === product.id);
      return isProductInCart ? state : { cart: [...state.cart, product] };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
}));

export default useStore;
