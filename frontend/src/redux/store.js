import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import authSlice from "./authSlice.js";
import ownerSlice from "./ownerSlice.js";
export const store = configureStore({
  reducer: {
    user: userSlice,
    auth: authSlice,
    owner: ownerSlice,
  },
});
