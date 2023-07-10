import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Reviews: {},
};
export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    reviewHandler: (state, action) => {
      console.log("action", action.payload);
      state.Reviews = action.payload;
    },
    addReview: (state, action) => {
      console.log("add review ", action.payload);

      state.Reviews = {
        ...state.Reviews,
        avgRating: action.payload.avgRating,
        count: action.payload.count,
      };
    },
  },
});

export const { reviewHandler, addReview } = reviewsSlice.actions;

export default reviewsSlice.reducer;
