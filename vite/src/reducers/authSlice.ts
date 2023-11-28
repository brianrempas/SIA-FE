import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types";
import { RootState } from "../store";

const persistedState = localStorage.getItem("user");

const initialState: AuthState = {
  token: persistedState ? JSON.parse(persistedState).token : null,
  username: persistedState ? JSON.parse(persistedState).username : null,
  role: persistedState ? JSON.parse(persistedState).role : null,
  mixId: persistedState ? JSON.parse(persistedState).mixId : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { username, token, role, mixId } = action.payload;
      state.username = username;
      state.token = token;
      state.role = role;
      state.mixId = mixId;
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: token,
          username: username,
          role: role,
          mixId: mixId
        })
      );
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.role = null;
      state.mixId = null
      localStorage.removeItem('user')
    },
  },
});

export const selectAuth = (state: RootState) => state.authReducer;
export const selectRole = (state: RootState) => state.authReducer.role;
export const selectMixId = (state: RootState) => state.authReducer.mixId;
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
