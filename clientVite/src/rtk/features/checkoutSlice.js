import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerInfo: {
    firstname: "",
    lastname: "",
    emailAddress: "",
    contactNumber: "",
    billingAddress: "",
    billingCity: "",
    billingCountry: "",
    currency: "ILS",
    cardExpiryMonth: "",
    cardExpiryYear: "",
  },
  checkoutOrders: [],
  emailStatus: "",
  paymentMethod: "creditCards",
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    handleCustomerInfo: (state, action) => {
      state.customerInfo = action.payload;
    },
    handleCheckoutOrders: (state, action) => {
      state.checkoutOrders = action.payload;
    },
    handleEmailStatus: (state, action) => {
      state.emailStatus = action.payload;
    },
    handlePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
  },
});

export const {
  handleCustomerInfo,
  handleCheckoutOrders,
  handleEmailStatus,
  handlePaymentMethod,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
