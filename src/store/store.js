import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productsSlice from "./slices/productsSlice";
import cartSlice from "./slices/cartSlice";
import optProductsSlice from "./slices/optProductsSlice";

const reducers = combineReducers({
  products: productsSlice,
  cart: cartSlice,
  optProducts: optProductsSlice,
});

const store = configureStore({
  reducer: reducers,
});

export default store;
