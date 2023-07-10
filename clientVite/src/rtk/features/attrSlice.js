import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Attractions: [],
  AttractionDetails: {},
  attractionEdit: {},
};

export const attrSlice = createSlice({
  name: "AttractionGroup",
  initialState,
  reducers: {
    AttractionGroupHandler: (state, action) => {
      state.Attractions = action.payload;
    },
    AttractionDetailsHandlerById: (state, action) => {
      state.AttractionDetails = state.Attractions.find(
        (a) => a._id === action.payload
      );
    },
    attractionEditHandler: (state, action) => {
      state.attractionEdit = action.payload;
    },
  },
});

export const {
  AttractionGroupHandler,
  AttractionDetailsHandlerById,
  attractionEditHandler,
} = attrSlice.actions;

export default attrSlice.reducer;
