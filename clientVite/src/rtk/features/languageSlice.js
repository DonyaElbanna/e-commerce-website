import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	activeLanguage: {
		label: 'EN',
		icon: 'flag-uk.jpg',
		locale: 'en',
	},
}

export const languageSlice = createSlice({
	name: 'language',
	initialState,
	reducers: {
		handleActiveLanguage: (state, action) => {
			state.activeLanguage = action.payload
		},
	},
})

export const { handleActiveLanguage } = languageSlice.actions

export default languageSlice.reducer
