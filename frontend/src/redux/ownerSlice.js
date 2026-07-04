import { createSlice } from "@reduxjs/toolkit";

const ownerSlice = createSlice({
  name: "shop",
  initialState: {
    myShopData: null,
    getShopByCity: null,
    getItemByCity: null,
  },
  reducers: {
    setMyShopData: (state, action) => {
      state.myShopData = action.payload;
    },
    setGetShopByCity: (state, action) => {
      state.getShopByCity = action.payload;
    },
    setGetItemByCity: (state, action) => {
      state.getItemByCity = action.payload;
    },
  },
});

export const { setMyShopData, setGetShopByCity, setGetItemByCity } =
  ownerSlice.actions;
export default ownerSlice.reducer;
