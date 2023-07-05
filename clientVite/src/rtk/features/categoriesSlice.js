import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  categoryEdit: {},
};
export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoriesHandler: (state, action) => {
      state.categories = action.payload;
    },
    categoryEditHandler: (state, action) => {
      state.categoryEdit = action.payload;
    },
    // addCity: (state, action) => {
    //   state.cities = [...state.cities, action.payload];
    // },
  },
});

export const { categoriesHandler, categoryEditHandler } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;
