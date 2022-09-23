import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
  name: "token",
  initialState: {
    token: "",
    error: false,
    role: null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    removeToken(state) {
      state.token = "";
    },
    setRole(state, action) {
      state.role = action.payload;
    },
    removeRole(state) {
      state.role = null;
    },
  },
});

export const authActions = auth.actions;

export default auth.reducer;
