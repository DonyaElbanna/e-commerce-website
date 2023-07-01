import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	activeMenu: 'imeiCheck',
	lastActiveMenu: '',
	selectedService: 0,
	imeiCheckOnProcess: [],
	imeiCheckIsDuplicate: false,
	imeiNumber: '',
	selectedPayment: 0,
	editProfileInfo: {},
	editStatus: '',
	openUpdatePasswordModal: false,
	updatePasswordInfo: {
		password: '',
		newPassword: '',
		confirmNewPassword: '',
	},
	orderHistoryList: [],
	orderHistoryInfo: {
		totalOrdersPerPage: 0,
		totalOrders: 0,
	},
	openViewResultModal: false,
	activeViewResult: {},
}

export const wholesaleSlice = createSlice({
	name: 'wholesale',
	initialState,
	reducers: {
		handleActiveMenu: (state, action) => {
			state.activeMenu = action.payload
		},
		handleLastActiveMenu: (state, action) => {
			state.lastActiveMenu = action.payload
		},
		handleSelectedService: (state, action) => {
			state.selectedService = action.payload
		},
		handleImeiCheckOnProcess: (state, action) => {
			state.imeiCheckOnProcess = action.payload
		},
		handleImeiCheckIsDuplicate: (state, action) => {
			state.imeiCheckIsDuplicate = action.payload
		},
		handleImeiNumber: (state, action) => {
			state.imeiNumber = action.payload
		},
		handleSelectedPayment: (state, action) => {
			state.selectedPayment = action.payload
		},
		handleEditProfileInfo: (state, action) => {
			state.editProfileInfo = action.payload
		},
		handleEditStatus: (state, action) => {
			state.editStatus = action.payload
		},
		handleOpenUpdatePasswordModal: (state, action) => {
			state.openUpdatePasswordModal = action.payload
		},
		handleUpdatePasswordInfo: (state, action) => {
			state.updatePasswordInfo = action.payload
		},
		handleOrderHistoryList: (state, action) => {
			state.orderHistoryList = action.payload
		},
		handleOrderHistoryInfo: (state, action) => {
			state.orderHistoryInfo = action.payload
		},
		handleOpenViewResultModal: (state, action) => {
			state.openViewResultModal = action.payload
		},
		handleActiveViewResult: (state, action) => {
			state.activeViewResult = action.payload
		},
	},
})

export const {
	handleActiveMenu,
	handleLastActiveMenu,
	handleImeiCheckOnProcess,
	handleImeiCheckIsDuplicate,
	handleSelectedService,
	handleImeiNumber,
	handleSelectedPayment,
	handleEditProfileInfo,
	handleEditStatus,
	handleOpenUpdatePasswordModal,
	handleUpdatePasswordInfo,
	handleOrderHistoryList,
	handleOrderHistoryInfo,
	handleOpenViewResultModal,
	handleActiveViewResult,
} = wholesaleSlice.actions

export default wholesaleSlice.reducer
