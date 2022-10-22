import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTotalCount, getTotalPrice } from "../../utils/getInfoCart";
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

      state.totalCount = getTotalCount(state.items);
      state.totalPrice = getTotalPrice(state.items);
    },
    plusCartItem(state, { payload }: PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === payload);
      if (findItem && findItem.count !== 99) {
        findItem.count++;
      }
      state.totalCount = getTotalCount(state.items);
      state.totalPrice = getTotalPrice(state.items);
    },
    minusCartItem(state, { payload }: PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === payload);
      if (findItem && findItem.count !== 1) {
        findItem.count--;
      }
      state.totalCount = getTotalCount(state.items);
      state.totalPrice = getTotalPrice(state.items);
    },
    removeCartItem(state, { payload }: PayloadAction<number>) {
      state.items = state.items.filter((obj) => obj.id !== payload);
      state.totalCount = getTotalCount(state.items);
      state.totalPrice = getTotalPrice(state.items);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addCartItem,
  removeCartItem,
  plusCartItem,
  minusCartItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
