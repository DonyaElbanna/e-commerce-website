import { createSlice } from '@reduxjs/toolkit'
const initialState = {
	SocketId: "",
}
export const socketSlice = createSlice({
	name: 'socket',
	initialState,
	reducers: {
		handleSocketId: (state, action) => {
			state.SocketId = action.payload
		},
	},
})
export const { handleSocketId} = socketSlice.actions
export default socketSlice.reducer
