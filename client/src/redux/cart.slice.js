import { createSlice } from "@reduxjs/toolkit";

const item = {
  id: null,
  quantity: 0,
};
const initialState = {
  userId: null,
  restId: null,
  items: [],
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemsToCart: (state, action) => {
      const { itemId, quantity } = action.payload;

      if (quantity === 0) {
        state.items = state.items.filter((item) => !(item.itemId === itemId));
        return;
      }
      const existingItem = state.items.findIndex(
        (item) => item.itemId === itemId
      );
      if (existingItem === -1) {
        const updatedItem = [...state.items, action.payload];
        state.items = updatedItem;
        return;
      } else {
        const updatedItem = [...state.items];
        updatedItem[existingItem] = {
          ...updatedItem[existingItem],
          quantity: quantity,
        };
        state.items = updatedItem;
        return;
      }

      // const existingItemIndex = state.items.findIndex(
      //   (item) => (item.itemId = itemId)
      // );
      // if (existingItemIndex !== -1) {
      //   const updatedItem = [...state.items];
      //   updatedItem[existingItemIndex] = {
      //     ...updatedItem[existingItemIndex],
      //     quantity: quantity,
      //   };
      //   state.items = updatedItem;
      //   return;
      // } else {
      //   state.items = [...state.items, action.payload];
      // }
    },
    setRestId: (state, action) => {
      state.restId = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    deleteRestId: (state, action) => {
      state.restId = null;
    },
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItemsToCart, setRestId, setUserId, deleteRestId, emptyCart } =
  CartSlice.actions;
export default CartSlice.reducer;
