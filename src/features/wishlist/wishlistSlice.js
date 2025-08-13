import { createSlice } from "@reduxjs/toolkit";
import { addItemToBackendWishlist, removeItemFromBackendWishlist } from "./apiCallsForWishlistSlice";

export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        items:[],
    },
    reducers: {
        addItemInWishlist: (state, action) => {
            addItemToBackendWishlist(action.payload.productId);
            const isItemInWishlist = state.items.find(item => item.productId === action.payload.productId);
            if(!isItemInWishlist) {
                state.items.push(action.payload);
            }
        },
        removeItemFromWishlist : (state, action) => {
            removeItemFromBackendWishlist(action.payload);
            state.items = state.items.filter(item => item.productId !== action.payload);
        },
        updateWishlist: (state, action) => {
            state.items = action.payload;
        }
    }
})
export const {addItemInWishlist, removeItemFromWishlist, updateWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;