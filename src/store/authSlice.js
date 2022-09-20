import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
  name: "token",
  initialState: {
    token: "",
    error: false,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    removeToken(state) {
      state.token = "";
    },
    setError(state, action) {
      state.error = action.payload;
    },
    removeError(state) {
      state.error = false;
    },
  },
});

export const authActions = auth.actions;

export default auth.reducer;
