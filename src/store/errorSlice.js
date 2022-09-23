import { createSlice } from "@reduxjs/toolkit";

const error = createSlice({
  name: "error",
  initialState: {
    error: false,
  },
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    removeError(state) {
      state.error = false;
    },
  },
});

export const errorActions = error.actions;

export default error.reducer;
