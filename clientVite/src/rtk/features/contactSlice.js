import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	name: '',
	email: '',
	subject: '',
	message: '',
}

export const contactSlice = createSlice({
	name: 'contact',
	initialState,
	reducers: {
		handleName: (state, action) => {
			state.name = action.payload
		},
		handleEmail: (state, action) => {
			state.email = action.payload
		},
		handleSubject: (state, action) => {
			state.subject = action.payload
		},
		handleMessage: (state, action) => {
			state.message = action.payload
		},
	},
})

export const { handleName, handleEmail, handleSubject, handleMessage } = contactSlice.actions

export default contactSlice.reducer
