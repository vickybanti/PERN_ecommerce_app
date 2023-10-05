import {  createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Alert, Snackbar, SnackbarContent } from "@mui/material";

const initialState = {
    isCartOpen: false,
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0,
    
};



export const cartSlice = createSlice({
    //slice contains the logic for reducer and action
    name: "cart",
    initialState,
    reducers: {

        setIsCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },
        addToCart: (state, action) => {
          const productToAdd = action.payload;
          const existingProduct = state.cartItems.find(
            (item) => item.id === productToAdd.id
          );

        
          if (existingProduct) {
            // If the product already exists in the cart, show a notification and return the current state
            toast.info(<h2 style={{color:"white"}}>Product has already been added to cart</h2>)
        
               
            // alert("added already")
            
            return state;
          }
        
          // If the product doesn't exist in the cart, add it as a new item
          state.cartItems.push(productToAdd);
          state.totalQuantity += productToAdd.count;
          state.totalPrice += productToAdd.price * productToAdd.count;
          const cartDataToStore = state.cartItems.map((item) => ({
            id: item.id,
            count: item.count,
          }));
        
          localStorage.setItem("cartItems", JSON.stringify(cartDataToStore));
        
          toast.success(<h2 style={{color:"white"}}>{action.payload.title} added to cart</h2>)
        },          
        
        removeFromCart (state, action) {
            
            const nextCart = state.cartItems.filter(
                item=> item.id !==action.payload.id
            )
            state.cartItems = nextCart
            if (state.totalPrice > 0){
                state.totalPrice -=action.payload.price * action.payload.count;
            } else {
                state.totalPrice = 0
            }

            const updatedQuantity = state.cartItems.length;
            state.totalQuantity = updatedQuantity;
            localStorage.removeItem("item", JSON.stringify(state.cartItems))
            toast.error(<h2 style={{color:"red"}}>{action.payload.title} removed from cart</h2>)


        },

        increaseCount: (state, action) => {
            state.cartItems = state.cartItems.map((item) => {
                if (item.id === action.payload.id){
                    item.count++;
                }
                return item
            })
            
        },

        decreaseCount: (state, action) => {
           
            state.cartItems = state.cartItems.map((item) => {
                if (item.id === action.payload.id && item.count >1){
                    item.count--;
                }
                return item    
    
            })
            
        },

        clearCart:(state) =>{
            localStorage.removeItem("item",JSON.stringify(state.cartItems))
            state.cartItems = []
            state.totalPrice = 0
            state.totalQuantity = 0
        },
       
        
    },
  
  
    
    });

    
export const {
    setIsCartOpen,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    clearProduct,
    clearCart
} = cartSlice.actions;



export default cartSlice.reducer;


