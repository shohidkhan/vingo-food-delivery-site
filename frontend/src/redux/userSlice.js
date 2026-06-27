import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    currentCity: null,
    currentAddress: null,
    currentState: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;
    },
    setCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
    },
    setCurrentState: (state, action) => {
      state.currentState = action.payload;
    },
  },
});

export const {
  setUserData,
  setCurrentCity,
  setCurrentAddress,
  setCurrentState,
} = userSlice.actions;
export default userSlice.reducer;
