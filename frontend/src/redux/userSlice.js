import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    currentCity: null,
    currentAddress: null,
    currentState: null,
    cartItems: [],
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

    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.id === item.id,
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cartItems.push(item);
      }
      console.log(state.cartItems);
    },
    removeFromCart: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});

export const {
  setUserData,
  setCurrentCity,
  setCurrentAddress,
  setCurrentState,
  addToCart,
  removeFromCart,
} = userSlice.actions;
export default userSlice.reducer;
