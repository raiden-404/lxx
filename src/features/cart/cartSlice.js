import { createSlice } from "@reduxjs/toolkit";
import { addItemFromBackend, removeItemFromBackend } from "./apiCallsForCartSlice";

//Mock data, inital state

export const cartSlice = createSlice({
    //Name of the slice , it is default syntax used by redux to manage store
    name: "cart",

    //initial state for the slice
    initialState: {
        items: null,//our cart start with mock data(use fetch data from database)
    },

    //reducers: these are the functions and only way to update the state
    reducers: {
        //we can define functions any where else and use here or directly declare here
        //these function is used to handle data change in that slice
        //like we use for cart then there are some operation we have to done like
        //update item and it's quantity or remove any item
        //it receive current state and an action
        //action.payload is , like {id: 23, name: "shirt"}

        addItem: (state, action) => {
            //get value passed to addItem function
            console.log(addItemFromBackend(action.payload));

            const { id, quantity } = action.payload;

            // Find the item to update
            const itemToUpdate = state.items.items.find(item => item.productId === id);

            //Check if item exists then increse the quantity,else just add the item
            if (itemToUpdate) {
                itemToUpdate.quantity += quantity;
            } else {
                //Here write the logic to add item on first time
            }
            
            //Order Summery change
            state.items.mrpTotal += itemToUpdate.productMrp;
            state.items.subTotal += itemToUpdate.productSellPrice;
            state.items.tax = (state.items.taxPercent/100) * state.items.subTotal;
            if(state.items.subTotal >= 249) {
                state.items.shipping = 0;
            } else { state.items.shipping = 49 }
            state.items.total = state.items.subTotal + state.items.tax + state.items.shipping;
        
        },
        removeItem: (state, action) => {
            //Get value passed to removeItem function
            console.log(removeItemFromBackend(action.payload));
            const { id, quantity } = action.payload;

            //Find item to update
            const itemToUpdate = state.items.items.find(item => item.productId === id);

            //Chech if quantity of itemToUpdate is one or less then remove it, else reduce the quantity
            if (itemToUpdate && itemToUpdate.quantity > 1) {
                itemToUpdate.quantity -= quantity;
            } else {
                state.items.items = state.items.items.filter(item => item.productId !== id);
            }

            //Order Summery change
            state.items.mrpTotal -= itemToUpdate.productMrp;
            state.items.subTotal -= itemToUpdate.productSellPrice;
            state.items.tax = (state.items.taxPercent/100) * state.items.subTotal;
            if(state.items.subTotal >= 249) {
                state.items.shipping = 0;
            } else { state.items.shipping = 49 }
            state.items.total = state.items.subTotal + state.items.tax + state.items.shipping;
            if(state.items.items.length === 0) {
                state.items = null;
            }

        },
        deleteItem : (state, action) => {
            const {id} = action.payload;
            const quantity = state.items.items.find(item => item.productId === id).quantity;
            console.log(removeItemFromBackend({id:id,quantity:quantity}));
            state.items.items = state.items.items.filter(item => item.productId !== id);
            if(state.items.items.length === 0) {
                state.items = null;
            }
        },
        updateCart: (state, action) => {
            state.items = action.payload;
        }
    },
});

//export the action to use 
//'createSlice' automatically generates action creators with the same name as our reducers.
//we'll use these in our React components to "dispatch" actions.
export const { addItem, removeItem, updateCart, deleteItem } = cartSlice.actions;

//export the reducer itself.
//The store need to known about this reducer.
export default cartSlice.reducer;