import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//product
const initialState = {
    items: [],
    status: null
}
    

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        fetchProduct:(state)=> {
            state.status = "pending"
        },
        productSuccess:(state, action)=> {
            state.status = "success"
            state.items = action.payload
        },
        fetchError:(state)=> {
            state.status = "error"
        }
    }
})
export const {fetchProduct,productSuccess,fetchError} = productSlice.actions
export default productSlice.reducer
//passed to index.js