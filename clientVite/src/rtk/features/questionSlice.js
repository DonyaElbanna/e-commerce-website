import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	question: '',
}

export const questionSlice = createSlice({
	name: 'question',
	initialState,
	reducers: {
		handleQuestion: (state, action) => {
			state.question = action.payload
		},
	},
})

export const { handleQuestion } = questionSlice.actions

export default questionSlice.reducer
