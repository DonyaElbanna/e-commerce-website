import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	cities: [],
	cityEdit:{}
}
export const citiesSlice = createSlice({
	name: 'cities',
	initialState,
	reducers: {
		citiesHandler: (state, action) => {
			state.cities = action.payload
		},
		CityEditHandler: (state,action)=>{
			state.cityModel = action.payload
		}
	},
})

export const { citiesHandler,openCityModelHandler } = citiesSlice.actions

export default citiesSlice.reducer
