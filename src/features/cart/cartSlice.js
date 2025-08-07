import { createSlice } from "@reduxjs/toolkit";

//Mock data, inital state
const inititalCartItems = [
    { id: 1, title: 'Zenith Wireless Headphones', price: 7999.00, image: 'https://placehold.co/300x300/f0f0f0/333?text=Headphones', quantity: 1, color: 'Black' },
    { id: 2, title: 'Aura Smartwatch', price: 14999.00, image: 'https://placehold.co/300x300/e8e8e8/333?text=Smartwatch', quantity: 1, color: 'Silver' },
    { id: 3, title: 'Nebula Portable Speaker', price: 5999.00, image: 'https://placehold.co/300x300/e0e0e0/333?text=Speaker', quantity: 2, color: 'Gray' },
];

export const cartSlice = createSlice({
    //Name of the slice , it is default syntax used by redux to manage store
    name : "cart",

    //initial state for the slice
    initialState : {
        items: inititalCartItems,//our cart start with mock data(use fetch data from database)
    },
    
    //reducers: these are the functions and only way to update the state
    reducers: {
        //we can define functions any where else and use here or directly declare here
        //these function is used to handle data change in that slice
        //like we use for cart then there are some operation we have to done like
        //update item and it's quantity or remove any item
        //it receive current state and an action
        //action.payload is , like {id: 23, name: "shirt"}
        changeQuantity: (state, action) => {
            const { id, newQuantity } = action.payload;

            const itemToUpdate = state.items.find(item => item.id === id);

            if(itemToUpdate) {
                itemToUpdate.quantity = newQuantity;
            }
        },

        removeItem: ( state, action ) => {
            const idToRemove = action.payload;
            state.items = state.items.filter(item => item.id !== idToRemove);
        },
    },
});

//export the action to use 
//'createSlice' automatically generates action creators with the same name as our reducers.
//we'll use these in our React components to "dispatch" actions.
export const { changeQuantity, removeItem } = cartSlice.actions;

//export the reducer itself.
//The store need to known about this reducer.
export default cartSlice.reducer;