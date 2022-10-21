import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCartSlice, TCartItem } from "./types";

const initialState: TCartSlice = {
  items: [],
  totalCount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem(state, { payload }: PayloadAction<TCartItem>) {
      const findItem = state.items.find((obj) => obj.id === payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...payload });
      }

      state.totalCount = state.items.reduce((sum, obj) => obj.count + sum, 0);
      state.totalPrice = state.items.reduce(
        (sum, obj) => Number(obj.price) + sum * obj.count,
        0
      );
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addCartItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
