import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types";
import { RootState } from "../store";

const persistedState = localStorage.getItem("user");

const initialState: AuthState = {
  token: persistedState ? JSON.parse(persistedState).token : null,
  username: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { username, token } = action.payload;
      state.username = username;
      state.token = token;
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: action.payload.token,
        })
      );
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      localStorage.removeItem('user')
    },
  },
});

export const selectAuth = (state: RootState) => state.authReducer;
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
