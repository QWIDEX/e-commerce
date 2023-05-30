import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    productsDocs: [],
    products: [],
  },

  reducers: {
    setProductsDocs(state, action) {
      state.productsDocs = action.payload;
    },
    setProducts(state, action) {
      state.products = action.payload;
    },
    replaceProduct(state, action) {
      const { idx, product } = action.payload;

      state.products.products = [
        ...state.products.slice(0, idx),
        { imgUrl: state.products[idx].imgUrl, ...product },
        ...state.products.slice(idx + 1),
      ];
    },
    deleteProduct(state, action) {
      const idx = action.payload;

      state.products = [
        ...state.products.slice(0, idx),
        ...state.products.slice(idx + 1),
      ];
    },
    addProduct(state, action) {
      state.products.push(action.payload);
    },
  },
});

export default productsSlice.reducer;
export const {
  setProducts,
  replaceProduct,
  deleteProduct,
  addProduct,
  setProductsDocs,
} = productsSlice.actions;
