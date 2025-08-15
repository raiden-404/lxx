import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        items: [],
        mrpTotal: 0,
        shipping: 0,
        subTotal: 0,
        tax: 0,
        taxPercent: 0,
        total: 0,
    },
    reducers: {
        updateCheckout: (state, action) => {
            state.items = action.payload.items;
            state.mrpTotal = action.payload.mrpTotal;
            state.shipping = action.payload.shipping;
            state.subTotal = action.payload.subTotal;
            state.tax = action.payload.tax;
            state.taxPercent = action.payload.taxPercent;
            state.total = action.payload.total;
        },
        clearCheckout: (state) => {
            state.items = [];
            state.mrpTotal = 0;
            state.shipping = 0;
            state.subTotal = 0;
            state.tax = 0;
            state.taxPercent = 0;
            state.total = 0;
        }
    },
});
export const { updateCheckout, clearCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;