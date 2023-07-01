import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	orders: [],
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		handleOrders: (state, action) => {
			state.orders = action.payload
		},
	},
})

export const { handleOrders } = cartSlice.actions

export default cartSlice.reducer
