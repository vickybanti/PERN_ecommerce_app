import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: {},
};

const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    //ADD ORDER
    addOrder: (state, action) => {
      state.order = action.payload;
    },
    clearOrder: (state) => {
      state.order = {};
    },
  },
});

export const { addOrder, clearOrder } = OrderSlice.actions;
export default OrderSlice.reducer;
