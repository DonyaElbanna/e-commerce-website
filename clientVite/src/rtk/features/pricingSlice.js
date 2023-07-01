import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	generic: '',
	apple: '',
}

export const pricingSlice = createSlice({
	name: 'pricing',
	initialState,
	reducers: {
		handleGeneric: (state, action) => {
			state.generic = action.payload
		},
		handleApple: (state, action) => {
			state.apple = action.payload
		},
	},
})

export const { handleGeneric, handleApple } = pricingSlice.actions

export default pricingSlice.reducer
