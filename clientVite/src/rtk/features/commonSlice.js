import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: "",
  anchorElUser: null,
  openSidebar: false,
  ShowCovidPolicyModal: false,
  ShowTermsModel:false,
  TermsType:"",
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    handleIsLoadingToggle: (state, action) => {
      state.isLoading = !state.isLoading;
    },
    handleIsError: (state, action) => {
      state.isError = action.payload;
    },
    handleErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    handleAnchorElUser: (state, action) => {
      state.anchorElUser = action.payload;
    },
    handleOpenSidebar: (state, action) => {
      state.openSidebar = action.payload;
    },
    handleToggleCovidPolicyModal: (state, action) => {
      state.ShowCovidPolicyModal = !state.ShowCovidPolicyModal;
    },
    handleToggleTermsModal:(state,action)=>{
      state.ShowTermsModel = !state.ShowTermsModel;
    },
    handleTermsType:(state,action)=>{
      state.TermsType = action.payload;
    }
  },
});

export const {
  handleIsLoadingToggle,
  handleIsError,
  handleErrorMessage,
  handleAnchorElUser,
  handleOpenSidebar,
  handleToggleCovidPolicyModal,
  handleTermsType,
  handleToggleTermsModal
} = commonSlice.actions;

export default commonSlice.reducer;
