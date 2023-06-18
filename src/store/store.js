import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productsSlice from "./slices/productsSlice";
import cartSlice from "./slices/cartSlice";
import optProductsSlice from "./slices/optProductsSlice";
import userSlice from "./slices/userSlice";

const reducers = combineReducers({
  products: productsSlice,
  cart: cartSlice,
  optProducts: optProductsSlice,
  user: userSlice
});

const store = configureStore({
  reducer: reducers,
});

export default store;
