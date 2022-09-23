import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import error from "./errorSlice";

const store = configureStore({
  reducer: { auth: auth, error: error },
});

export default store;
