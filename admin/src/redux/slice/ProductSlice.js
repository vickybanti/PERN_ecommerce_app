import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


//product
const initialState = {
    items: [],
    status:""
}
    

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        fetchProducts:(state)=> {
            state.status = "pending"
        },
        productSuccess:(state, action)=> {
            state.status="succes"
        },
        fetchError:(state)=> {
            state.status = "error"
        },

        allProducts:(state, action)=>{
            const productsToAdd  = action.payload
            state.items.push(productsToAdd)
            
        },

        deleteProduct (state, action) {
            
            const remainingProduct = state.items.filter(
                item => item !==action.payload
            )
            state.items= remainingProduct
            

        },
    }
})
export const {fetchProducts,productSuccess,fetchError, allProducts,deleteProduct} = productSlice.actions
export default productSlice.reducer
//passed to index.js