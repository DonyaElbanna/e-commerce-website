import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  // orderEdit: {},
};
export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    ordersHandler: (state, action) => {
      // console.log("get action", action.payload);
      state.orders = action.payload;
    },
    // orderEditHandler: (state, action) => {
    //   state.orderEdit = action.payload;
    // },
    addOrder: (state, action) => {
      // console.log("add action", action.payload);
      state.orders = [...state.orders, action.payload];
    },
    removeOrder: (state, action) => {
      // console.log("remove action", action.payload);
      state.orders = state.orders.filter((order) => order._id !== action.payload);
    },
    // editOrder(state, action) {
    //   // console.log("edit action", action.payload);
    //   const updatedOrder = action.payload;
    //   state.orders = state.orders.map((order) =>
    //     order._id === updatedOrder._id ? updatedOrder : order
    //   );
    //   // console.log("after edits", state.orders);
    // },
  },
});

export const { ordersHandler, addOrder, removeOrder} =
  ordersSlice.actions;

export default ordersSlice.reducer;
