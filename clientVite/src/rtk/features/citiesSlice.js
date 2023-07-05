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
      // console.log("get action", action.payload);
      state.cities = action.payload;
    },
    CityEditHandler: (state, action) => {
      state.cityEdit = action.payload;
    },
    addCity: (state, action) => {
      // console.log("add action", action.payload);
      state.cities = [...state.cities, action.payload];
    },
    removeCity: (state, action) => {
      // console.log("remove action", action.payload);
      state.cities = state.cities.filter((city) => city._id !== action.payload);
    },
    editCity(state, action) {
      // console.log("edit action", action.payload);
      const updatedCity = action.payload;
      state.cities = state.cities.map((city) =>
        city._id === updatedCity._id ? updatedCity : city
      );
      // console.log("after edits", state.cities);
    },
  },
});

export const { citiesHandler, CityEditHandler, addCity, removeCity, editCity } =
  citiesSlice.actions;

export default citiesSlice.reducer;
