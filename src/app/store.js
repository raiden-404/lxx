import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice"
import userReducer from "../features/user/userSlice"
import wishlistReducer from "../features/wishlist/wishlistSlice"

export default configureStore({
    reducer: {
        // The `reducer` object is like a table of contents for our state.
        // The key 'cart' determines that our cart state will be accessible as `state.cart`
        // The value `cartReducer` is the function that will manage this part of the state.
        cart: cartReducer,
        user: userReducer,
        wishlist: wishlistReducer,
    },
});