import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurant: {},
};
export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      const payload = action.payload;
      state.restaurant = payload;
    },
    removeRestaurant: (state, action) => {
      state.restaurant = {};
    },
  },
});

export const { setRestaurant, removeRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;
