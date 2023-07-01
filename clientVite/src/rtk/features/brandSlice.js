import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	activeBrand: {},
}

export const brandSlice = createSlice({
	name: 'brand',
	initialState,
	reducers: {
		handleActiveBrand: (state, action) => {
			state.activeBrand = action.payload
		},
	},
})

export const { handleActiveBrand } = brandSlice.actions

export default brandSlice.reducer
