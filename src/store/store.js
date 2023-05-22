import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productsSlice from "./slices/productsSlice";
import cartSlice from "./slices/cartSlice";

const reducers = combineReducers({
    products: productsSlice,
    cart: cartSlice
})

const store = configureStore({
    reducer: reducers
})

export default store