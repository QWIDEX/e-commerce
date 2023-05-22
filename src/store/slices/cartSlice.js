import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "products",
    initialState: {
        products: []
    },

    reducers: {
        addToCart(state, action) {
            state.products.push(action.payload) 
        },
        // deletFromCart(state, action) {

        // }
    }
})

export default cartSlice.reducer
export const {addToCart} = cartSlice.actions