import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Parks: [],
  parkDetails: {},
  ParksFilter:[],
  filterName:"All Attraction",
  pageNum:1
};

export const parkGroupSlice = createSlice({
  name: "parkGroup",
  initialState,
  reducers: {
    parkGroupHandler: (state, action) => {
      state.Parks = action.payload;
    },
    parkFilterHandler: (state, action) => {
      state.ParksFilter = action.payload;
    },
    parkDetailsHandler: (state, action) => {
      state.parkDetails = action.payload;
    },
    parkDetailsHandlerById:(state,action)=>{
      state.parkDetails = state.Parks.find((p)=> p._id === action.payload)
    },
    FilterGroupNameHanlder:(state,action)=>{
      state.filterName = action.payload
    },
    PageNumHandler:(state,action)=>{
      state.pageNum = action.payload
  }
  },
});

export const { PageNumHandler,FilterGroupNameHanlder, parkGroupHandler, parkDetailsHandler,parkFilterHandler,parkDetailsHandlerById } = parkGroupSlice.actions;

export default parkGroupSlice.reducer;
