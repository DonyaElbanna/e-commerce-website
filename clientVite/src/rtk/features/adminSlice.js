import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	admin: false,
	tableName:"tickets"
}

export const adminSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {
		tableNameHandler: (state, action) => {
			state.tableName = action.payload
		},
	},
})

export const { tableNameHandler } = adminSlice.actions

export default adminSlice.reducer
