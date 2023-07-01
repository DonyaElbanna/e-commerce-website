import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	imei: '',
	data: {},
	activeStep: 0,
	skipped: new Set(),
}

export const imeiSlice = createSlice({
	name: 'imei',
	initialState,
	reducers: {
		handleImei: (state, action) => {
			state.imei = action.payload
		},
		handleData: (state, action) => {
			state.data = action.payload
		},
		handleActiveStep: (state, action) => {
			state.activeStep = action.payload
		},
		handleSkipped: (state, action) => {
			state.skipped = action.payload
		},
	},
})

export const { handleImei, handleData, handleActiveStep, handleSkipped } = imeiSlice.actions

export default imeiSlice.reducer
