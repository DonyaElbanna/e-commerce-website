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
      // console.log("get cat action", action.payload);
      state.categories = action.payload;
    },
    categoryEditHandler: (state, action) => {
      state.categoryEdit = action.payload;
    },
    addCat: (state, action) => {
      // console.log("add cat action", action.payload);
      state.categories = [...state.categories, action.payload];
    },
    removeCat: (state, action) => {
      // console.log("remove cat action", action.payload);
      state.categories = state.categories.filter(
        (cat) => cat._id !== action.payload
      );
    },
    editCat: (state, action) => {
      // console.log("edit cat action", action.payload);
      const updatedCat = action.payload;
      state.categories = state.categories.map((cat) =>
        cat._id === updatedCat._id ? updatedCat : cat
      );
      // console.log("after cat edits", state.categories);
    },
  },
});

export const {
  categoriesHandler,
  categoryEditHandler,
  addCat,
  removeCat,
  editCat,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
