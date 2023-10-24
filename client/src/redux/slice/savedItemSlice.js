import {  createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    isItemOpen: false,
    savedItems: [],
    totalQuantity: 0,
    
};



export const savedItemSlice = createSlice({
    //slice contains the logic for reducer and action
    name: "savedProducts",
    initialState,
    reducers: {

        setItemOpen: (state, action) => {
            state.isItemOpen = !state.isItemOpen;
        },
    saveItem: (state, action) => {
          const productToAdd = action.payload;
          const existingProduct = state.savedItems.find(
            (item) => item.id === productToAdd.id
          );
        
          if (existingProduct) {
            // If the product already exists in the cart, show a notification and return the current state
            toast.info("Product has already been saved")
            // alert("added already")
           
            return state;
          }
        
          // If the product doesn't exist in the cart, add it as a new item
          state.savedItems.push(productToAdd);
          state.totalQuantity += productToAdd.count;
          const itemToSave = state.savedItems.map((item) => ({
            id: item.id,
          }));
          toast.success(<h2 style={{color:"white"}}>{action.payload.title} added to saved item</h2>)
          localStorage.setItem("savedItems", JSON.stringify(itemToSave))
        },          
        
        deleteItem (state, action) {
            
            const nextCart = state.savedItems.filter(
                item=> item.id !==action.payload.id
            )
            state.savedItems = nextCart
            const updatedQuantity = state.savedItems.length;
            state.totalQuantity = updatedQuantity;
            localStorage.removeItem("item", JSON.stringify(state.savedItems))
            toast.error(<h2 style={{color:"white"}}>{action.payload.title} removed from saved item</h2>)
        }
    }
    });

    export const {setItemOpen, saveItem, deleteItem} = savedItemSlice.actions
    export default savedItemSlice.reducer