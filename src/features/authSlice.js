// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  name: null,
  token: null,
  calorias: null
};

export const autenticSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCalorias: (state, action) => {
      state.calorias = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.calorias = null;
      state.name = null;
    }
  }
});

export const { setUser, setName, setToken, logout, setCalorias,} = autenticSlice.actions;

export default autenticSlice.reducer;
