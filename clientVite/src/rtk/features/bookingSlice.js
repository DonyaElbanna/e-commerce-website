import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openBookModal: false,
  bookingInfo: {
    parkId: null,
    ticketTypeId: null,
    inventoryTypeId: null,
    grandTotal: 0,
    name: "",
    email: "",
    adultCount: 0,
    childCount: 0,
    AdultTotalGrand:0,
    ChildTotalGrand:0,
    travelDate: null,
    contactNo: null, 
    dateValue:null,
    bookingPaxDtls: [
      {
        name: null,
      },
    ],
  },
  ticketInfo:{},
  creditInfo:{
    CardHolderName:"",
    CreditCardCVV:"",
    CreditCardExpiry:"",
    CreditCardNumber:""
  },
  bookingStep: 0,
  TransToken:""
};

export const bookingSlice = createSlice({
  name: "Booking",
  initialState,
  reducers: {
    handleToggleBookModal: (state, action) => {
      state.openBookModal = !state.openBookModal;
    },
    handleBookInfo: (state, action) => {
      state.bookingInfo = action.payload;
    },
    handleStepNext: (state, action) => {
      state.bookingStep = ++state.bookingStep;
    },
    handleStepBack: (state, action) => {
      if (state.bookingStep > 0) {
        state.bookingStep = --state.bookingStep;
      }
    },
    handleResetStep :(state,action)=>{
      state.bookingStep = 0
    },
    handleAddChild: (state, action) => {
      state.bookingInfo = {
        ...state.bookingInfo,
        childCount: ++state.bookingInfo.childCount,
      };
    },
    handleAddAdult: (state, action) => {
      state.bookingInfo = {
        ...state.bookingInfo,
        adultCount: ++state.bookingInfo.adultCount,
      };
    },
    handleRemoveChild: (state, action) => {
      if (state.bookingInfo.childCount > 0)
        state.bookingInfo = {
          ...state.bookingInfo,
          childCount: --state.bookingInfo.childCount,
        };
    },
    handleRemoveAdult: (state, action) => {
      if (state.bookingInfo.adultCount > 0)
        state.bookingInfo = {
          ...state.bookingInfo,
          adultCount: --state.bookingInfo.adultCount,
        };
    },
    handleGrandTotal: (state, action) => {
      state.bookingInfo = {
        ...state.bookingInfo,
        grandTotal:
          state.bookingInfo.adultCount * (action.payload.AdultPrice || 0)  +
          state.bookingInfo.childCount * (action.payload.ChildPrice || 0),
      };
    },
    handleTransToken:(state,action)=>{
      state.TransToken = action.payload
    },
    handleTicketInfo:(state,action)=>{
      state.ticketInfo = action.payload
    }
  },
});

export const {
  handleToggleBookModal,
  handleBookInfo,
  handleStepBack,
  handleStepNext,
  handleAddChild,
  handleAddAdult,
  handleRemoveAdult,
  handleRemoveChild,
  handleGrandTotal,
  handleTransToken,
  handleTicketInfo,
  handleResetStep
} = bookingSlice.actions;

export default bookingSlice.reducer;
