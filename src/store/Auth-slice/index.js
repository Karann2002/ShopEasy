// src/redux/slices/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, logoutUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
