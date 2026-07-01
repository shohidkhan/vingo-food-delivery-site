import { createSlice } from "@reduxjs/toolkit";

const ownerSlice = createSlice({
  name: "shop",
  initialState: {
    myShopData: null,
    getShopByCity: null,
  },
  reducers: {
    setMyShopData: (state, action) => {
      state.myShopData = action.payload;
    },
    setGetShopByCity: (state, action) => {
      state.getShopByCity = action.payload;
    },
  },
});

export const { setMyShopData, setGetShopByCity } = ownerSlice.actions;
export default ownerSlice.reducer;
