import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  userType: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("User", action.payload);
      const { user, token, userType } = action.payload;
      console.log("🚀 ~ user:", user);
      state.user = user;
      state.token = token;
      state.userType = userType;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userType = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state) => state?.auth?.token;
export const selectCurrentUser = (state) => state?.auth?.user;
export const useCurrentUserType = (state) => state?.auth?.userType;
