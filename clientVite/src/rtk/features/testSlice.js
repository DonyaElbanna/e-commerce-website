import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	test: false,
}

export const testSlice = createSlice({
	name: 'test',
	initialState,
	reducers: {
		testHandler: (state, action) => {
			state.test = action.payload
		},
	},
})

export const { testHandler } = testSlice.actions

export default testSlice.reducer
