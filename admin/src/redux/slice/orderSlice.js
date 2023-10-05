import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  status:""
  
};

const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    //ADD ORDER
    addOrder: (state, action) => {
      state.orders = action.payload;
    },
    clearOrder: (state) => {
      state.orders = [];
    },
    changeStatus : (state,action) => {
      const {status} = action.payload
      state.status = status
    }
  },
});

export const { addOrder, clearOrder, changeStatus } = OrderSlice.actions;
export default OrderSlice.reducer;
