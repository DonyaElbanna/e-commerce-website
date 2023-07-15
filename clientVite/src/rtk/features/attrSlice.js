import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Attractions: [],
  AttractionDetails: {},
  attractionEdit: {},
  highestRated: [],
  filteredAttrs: [],
  cityID: null,
  catID: null,
  priceID: null,
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
      state.cityID = action.payload;

      state.filteredAttrs = state.Attractions.filter(
        (attr) => attr.category._id == action.payload
      );
    },
    getFilteredAttrsByCat: (state, action) => {
      state.catID = action.payload;

      if (state.cityID && state.catID) {
        state.filteredAttrs = state.Attractions.filter(
          (attr) =>
            attr.category._id == state.cityID &&
            attr.subcategory._id == action.payload
        );
        console.log(state.filteredAttrs);
      } else {
        state.filteredAttrs = state.Attractions.filter(
          (attr) => attr.subcategory._id == action.payload
        );
      }
    },
    getFilteredAttrsByPrice: (state, action) => {
      state.priceID = action.payload;
      // with cityID && catID
      if (state.cityID && state.catID) {
        if (action.payload == 0) {
          state.filteredAttrs = state.Attractions.filter(
            (attr) =>
              attr.category._id == state.cityID &&
              attr.subcategory._id == state.catID &&
              attr.AdultPrice > 0 &&
              attr.AdultPrice <= 500
          );
        } else if (action.payload == 1) {
          state.filteredAttrs = state.Attractions.filter(
            (attr) =>
              attr.category._id == state.cityID &&
              attr.subcategory._id == state.catID &&
              attr.AdultPrice > 500 &&
              attr.AdultPrice <= 1000
          );
        } else {
          state.filteredAttrs = state.Attractions.filter(
            (attr) =>
              attr.category._id == state.cityID &&
              attr.subcategory._id == state.catID &&
              attr.AdultPrice > 1000
          );
        }
      }
      // with cityID only
      else if (state.cityID && !state.catID) {
        if (action.payload == 0) {
          state.filteredAttrs = state.Attractions.filter(
            (attr) =>
              attr.category._id == state.cityID &&
              attr.AdultPrice > 0 &&
              attr.AdultPrice <= 500
          );
        } else if (action.payload == 1) {
          state.filteredAttrs = state.Attractions.filter(
            (attr) =>
              attr.category._id == state.cityID &&
              attr.AdultPrice > 500 &&
              attr.AdultPrice <= 1000
          );
        } else {
          state.filteredAttrs = state.Attractions.filter(
            (attr) =>
              attr.category._id == state.cityID && attr.AdultPrice > 1000
          );
        }
      }
      // with catID only
      else if (!state.cityID && state.catID) {
        if (action.payload == 0) {
          state.filteredAttrs = state.Attractions.filter(
            (attr) =>
              attr.subcategory._id == state.catID &&
              attr.AdultPrice > 0 &&
              attr.AdultPrice <= 500
          );
        } else if (action.payload == 1) {
          state.filteredAttrs = state.Attractions.filter(
            (attr) =>
              attr.subcategory._id == state.catID &&
              attr.AdultPrice > 500 &&
              attr.AdultPrice <= 1000
          );
        } else {
          state.filteredAttrs = state.Attractions.filter(
            (attr) =>
              attr.subcategory._id == state.catID && attr.AdultPrice > 1000
          );
        }
      }
      // with priceID only
      else {
        if (action.payload == 0) {
          state.filteredAttrs = state.Attractions.filter(
            (attr) => attr.AdultPrice > 0 && attr.AdultPrice <= 500
          );
        } else if (action.payload == 1) {
          state.filteredAttrs = state.Attractions.filter(
            (attr) => attr.AdultPrice > 500 && attr.AdultPrice <= 1000
          );
        } else {
          state.filteredAttrs = state.Attractions.filter(
            (attr) => attr.AdultPrice > 1000
          );
        }
      }
    },
    handleFilters: (state, action) => {
      state.filteredAttrs = action.payload;
      state.cityID = action.payload;
      state.catID = action.payload;
      state.priceID = action.payload;
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
