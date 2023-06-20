import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const cartSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },

  reducers: {
    addToCart(state, action) {
      const { product, count, type = "add" } = action.payload;
      const idx = state.products.findIndex((doc) => product.id === doc.id);
      if (idx !== -1) {
        if (type === "set") {
          state.products = [
            ...state.products.slice(0, idx),
            { ...product, count: count },
            ...state.products.slice(idx + 1),
          ];
          toast.success("Added to cart");
        } else if (state.products[idx].count + count <= product.available) {
          state.products = [
            ...state.products.slice(0, idx),
            { ...product, count: state.products[idx].count + count },
            ...state.products.slice(idx + 1),
          ];
          toast.success("Added to cart");
        } else {
          toast.error(`Only ${product.available} ${product.label} available`);
          state.products = [
            ...state.products.slice(0, idx),
            { ...product, count: product.available },
            ...state.products.slice(idx + 1),
          ];
          toast.success(`Added to cart ${product.available} ${product.label} `);
        }
      } else {
        toast.success("Added to cart");
        state.products.push({ ...product, count });
      }
    },

    deleteFromCart(state, action) {
      const idx = state.products.findIndex((product) => action.payload.id === product.id);

      state.products = [
        ...state.products.slice(0, idx),
        ...state.products.slice(idx + 1),
      ];
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, deleteFromCart } = cartSlice.actions;
