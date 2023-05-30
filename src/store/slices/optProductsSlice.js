import { createSlice } from "@reduxjs/toolkit";

const optProdutsSlice = createSlice({
  name: "optProducts",
  initialState: {
    optProdutsDocs: [],
    products: [],
  },
  reducers: {
    setOptProducts(state, action) {
      state.products = action.payload;
    },
    setOptProductsDocs(state, action) {
      state.optProdutsDocs = action.payload;
    },
  },
});

export default optProdutsSlice.reducer;
export const { setOptProducts, setOptProductsDocs } = optProdutsSlice.actions;
