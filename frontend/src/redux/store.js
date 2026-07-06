import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import authSlice from "./authSlice.js";
import ownerSlice from "./ownerSlice.js";
import mapSlice from "./mapSlice.js";
export const store = configureStore({
  reducer: {
    user: userSlice,
    auth: authSlice,
    owner: ownerSlice,
    map: mapSlice,
  },
});
