import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getCartInfo,
  getTotalCount,
  getTotalPrice,
} from "../../utils/getInfoCart";
import { TDopItem } from "../dopItems/types";
import { TCartSlice, TCartItem } from "./types";

const initialState: TCartSlice = {
  items: getCartInfo().items,
  totalCount: getCartInfo().totalCount,
  totalPrice: getCartInfo().totalPrice,
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
    removeCartItem(state, { payload }: PayloadAction<number>) {
      state.items = state.items.filter((obj) => obj.id !== payload);
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
    clearCart(state) {
      state.items = [];
      state.totalCount = getTotalCount(state.items);
      state.totalPrice = getTotalPrice(state.items);
    },

    removeOrMinusCartItem(state, { payload }: PayloadAction<TCartItem>) {
      const findItem = state.items.find((obj) => obj.id === payload.id);
      if (findItem && findItem.count !== 1) {
        findItem.count--;
      } else {
        state.items = state.items.filter((obj) => obj.id !== payload.id);
      }
      state.totalCount = getTotalCount(state.items);
      state.totalPrice = getTotalPrice(state.items);
    },
    addDopItemsToCart(state, { payload }: PayloadAction<TDopItem[]>) {
      const findItems1 = state.items.filter((obj1) =>
        payload.some((obj2) => obj2.id === obj1.id)
      );
      const findItems3 = payload.filter((obj1) =>
        state.items.every((obj2) => obj2.id !== obj1.id)
      );
      if (findItems1.length > 0) {
        findItems1.forEach((obj) => obj.count++);
        if (findItems3.length > 0) {
          state.items.push(...findItems3);
        }
      } else {
        state.items.push(...payload);
      }
      state.totalCount = getTotalCount(state.items);
      state.totalPrice = getTotalPrice(state.items);
    },
  },
});

export const {
  addCartItem,
  removeCartItem,
  plusCartItem,
  minusCartItem,
  clearCart,
  addDopItemsToCart,
  removeOrMinusCartItem,
} = cartSlice.actions;

export default cartSlice.reducer;
