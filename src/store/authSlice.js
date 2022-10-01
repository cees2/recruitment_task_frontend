import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
  name: "token",
  initialState: {
    token: JSON.parse(localStorage.getItem("jwt")),
    error: false,
    role: null,
  },
  reducers: {
    setToken(state, action) {
      localStorage.setItem("jwt", JSON.stringify(action.payload));
      state.token = action.payload;
    },
    removeToken(state) {
      localStorage.removeItem("jwt");
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
