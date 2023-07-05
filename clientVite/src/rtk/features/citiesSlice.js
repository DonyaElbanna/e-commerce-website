import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cities: [],
  cityEdit: {},
};
export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    citiesHandler: (state, action) => {
      state.cities = action.payload;
    },
    CityEditHandler: (state, action) => {
      state.cityEdit = action.payload;
    },
    addCity: (state, action) => {
      state.cities = [...state.cities, action.payload];
    },
  },
});

export const { citiesHandler, CityEditHandler, addCity } = citiesSlice.actions;

export default citiesSlice.reducer;
