import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    handlePage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { handlePage } = paginationSlice.actions;

export default paginationSlice.reducer;
