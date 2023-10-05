import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  order: [],
  count:0,
  stock: []
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    //ADD ORDER
    addOrder: (state, action) => {
      state.order = action.payload;
      state.stock -= state.count
    },
    clearOrder: (state) => {
      state.order = [];
    },
  },
});

export const { addOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
