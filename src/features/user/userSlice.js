import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        items: null,
    },
    reducers : {
        updateUser : (state,action) => {
            state.items = action.payload;
        },
        removeUser: (state) => {
            state.items = null;
        },
    },
});
export const {updateUser, removeUser} = userSlice.actions;
export default userSlice.reducer;