import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};
export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    ordersHandler: (state, action) => {
      state.orders = action.payload;
    },
    addOrder: (state, action) => {
      state.orders = [...state.orders, action.payload];
    },
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order._id !== action.payload
      );
    },
  },
});

export const { ordersHandler, addOrder, removeOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
