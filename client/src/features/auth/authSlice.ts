import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "../../utils/types";

const initialState: AuthState = {
  email: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  tokenExpiry: null,
  isRefreshing: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string | null>) => {
      state.email = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = Boolean(action.payload);
    },
    setRefreshToken: (state, action: PayloadAction<string | null>) => {
      state.refreshToken = action.payload;
    },
    setTokenExpiry: (state, action: PayloadAction<number | null>) => {
      state.tokenExpiry = action.payload;
    },
    setIsRefreshing: (state, action: PayloadAction<boolean>) => {
      state.isRefreshing = action.payload;
    },
    clearUser: () => initialState,
  },
});

export const {
  setEmail,
  setAccessToken,
  setRefreshToken,
  setTokenExpiry,
  setIsRefreshing,
  clearUser,
} = authSlice.actions;

export default authSlice.reducer;
