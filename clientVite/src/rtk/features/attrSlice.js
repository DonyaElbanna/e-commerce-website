import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Attractions: [],
  AttractionDetails: {},
  attractionEdit: {},
  filteredCityAttrs: [],
  filteredCatAttrs: [],
  filteredPriceAttrs: [],
  highestRated: [],
  filters: [],
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
    highestAttrsHandler: (state, action) => {
      state.highestRated = action.payload;
    },
    getFilteredAttrsByCity: (state, action) => {
      state.filteredCityAttrs = state.Attractions.filter(
        (attr) => attr.category._id == action.payload
      );
    },
    getFilteredAttrsByCat: (state, action) => {
      state.filteredCatAttrs = state.filteredCityAttrs.filter(
        (attr) => attr.subcategory._id == action.payload
      );
    },
    getFilteredAttrsByPrice: (state, action) => {
      if (action.payload == 0) {
        state.filteredPriceAttrs = state.filteredCatAttrs.filter(
          (attr) => attr.AdultPrice > 0 && attr.AdultPrice <= 500
        );
      } else if (action.payload == 1) {
        state.filteredPriceAttrs = state.filteredCatAttrs.filter(
          (attr) => attr.AdultPrice > 500 && attr.AdultPrice <= 1000
        );
      } else {
        state.filteredPriceAttrs = state.filteredCatAttrs.filter(
          (attr) => attr.AdultPrice > 1000
        );
      }
    },
    handleFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});

export const {
  AttractionGroupHandler,
  AttractionDetailsHandlerById,
  attractionEditHandler,
  highestAttrsHandler,
  getFilteredAttrsByCity,
  getFilteredAttrsByCat,
  getFilteredAttrsByPrice,
  handleFilters,
} = attrSlice.actions;

export default attrSlice.reducer;
