import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const cartSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },

  reducers: {
    addToCart(state, action) {
      const { product, quantity } = action.payload;
      const idx = state.products.findIndex((doc) => product.id === doc.id);
      if (idx !== -1) {
        if (state.products[idx].quantity + quantity <= product.available) {
          state.products = [
            ...state.products.slice(0, idx),
            { ...product, quantity: state.products[idx].quantity + quantity },
            ...state.products.slice(idx + 1),
          ];
          toast.success("Added to cart");
        } else {
          toast.error(`Only ${product.available} ${product.label} available`);
          state.products = [
            ...state.products.slice(0, idx),
            { ...product, quantity: product.available },
            ...state.products.slice(idx + 1),
          ];
          toast.success(`Added to cart ${product.available} ${product.label} `);
        }
      } else {
        toast.success("Added to cart");
        state.products.push({ ...product, quantity });
      }
    },

    setToCart(state, action) {
      const { product, quantity } = action.payload;
      const idx = state.products.findIndex((doc) => product.id === doc.id);
      if (idx !== -1) {
        state.products = [
          ...state.products.slice(0, idx),
          { ...product, quantity: quantity || product.quantity },
          ...state.products.slice(idx + 1),
        ];
      } else {
        state.products.push({ ...product, quantity: quantity || product.quantity });
      }

      if (quantity) toast.success("Added to cart");
    }, 

    deleteFromCart(state, action) {
      const idx = state.products.findIndex(
        (product) => action.payload.id === product.id
      );

      state.products = [
        ...state.products.slice(0, idx),
        ...state.products.slice(idx + 1),
      ];
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, setToCart, deleteFromCart } = cartSlice.actions;
