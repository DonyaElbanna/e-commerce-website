import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  userEdit: {},
};
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersHandler: (state, action) => {
      state.users = action.payload;
    },
    userEditHandler: (state, action) => {
      state.userEdit = action.payload;
    },
    addUser: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
    editUser: (state, action) => {
      const updatedUser = action.payload;
      state.users = state.users.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      );
    },
    blockUser: (state, action) => {
      state.users = state.users.map((user) => {
        if (user._id === action.payload) {
          return {
            ...user,
            isBlocked: !user.isBlocked,
          };
        }
        return user;
      });
    },
    makeAdmin: (state, action) => {
      state.users = state.users.map((user) => {
        if (user._id === action.payload) {
          return {
            ...user,
            role: user.role == "admin" ? "user" : "admin",
          };
        }
        return user;
      });
    },
  },
});

export const {
  usersHandler,
  userEditHandler,
  addUser,
  removeUser,
  editUser,
  blockUser,
  makeAdmin,
} = usersSlice.actions;

export default usersSlice.reducer;
