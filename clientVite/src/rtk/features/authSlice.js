import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openAuthModal: false,
  authType: "login",
  loginCredentials: {
    usermail: "",
    password: "",
  },
  registerInfo: {
    userName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
  },
  openResendTokenModal: false,
  activationEmail: "",
  resendTokenEmail: "",
  isLoggedIn: false,
  loggedInInfo: {},
  userInfo: {},
  resendType: "",
  resendVerificationTimer: {
    startDate: new Date(),
    expiredDate: new Date(),
  },
  forgotPasswordEmail: "",
  resetPasswordInfo: {
    newPassword: "",
    confirmNewPassword: "",
  },
  error: "",
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleOpenAuthModal: (state, action) => {
      state.openAuthModal = action.payload;
    },
    handleToggleAuthModal: (state, action) => {
      state.openAuthModal = !state.openAuthModal;
    },
    handleAuthType: (state, action) => {
      state.authType = action.payload;
    },
    handleLoginCredentials: (state, action) => {
      state.loginCredentials = action.payload;
    },
    handleRegisterInfo: (state, action) => {
      state.registerInfo = action.payload;
    },
    handleOpenResendTokenModal: (state, action) => {
      state.openResendTokenModal = action.payload;
    },
    handleActivationEmail: (state, action) => {
      state.activationEmail = action.payload;
    },
    handleResendTokenEmail: (state, action) => {
      state.resendTokenEmail = action.payload;
    },
    handleIsLoggedIntoggle: (state, action) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    handleLoggedInInfo: (state, action) => {
      state.loggedInInfo = action.payload;
    },
    handleUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    handleResendType: (state, action) => {
      state.resendType = action.payload;
    },
    handleResendVerificationTimer: (state, action) => {
      state.resendVerificationTimer = action.payload;
    },
    handleForgotPasswordEmail: (state, action) => {
      state.forgotPasswordEmail = action.payload;
    },
    handleResetPasswordInfo: (state, action) => {
      state.resetPasswordInfo = action.payload;
    }
  },
});

export const {
  handleOpenAuthModal,
  handleAuthType,
  handleLoginCredentials,
  handleRegisterInfo,
  handleOpenResendTokenModal,
  handleActivationEmail,
  handleResendTokenEmail,
  handleIsLoggedIntoggle,
  handleUserInfo,
  handleLoggedInInfo,
  handleResendType,
  handleResendVerificationTimer,
  handleForgotPasswordEmail,
  handleResetPasswordInfo,
  handleToggleAuthModal,
} = authSlice.actions;

export default authSlice.reducer;
