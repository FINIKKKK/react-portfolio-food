import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDopItemsInfo } from "../../utils/getInfoCart";
import { TDopItemsSlice, TDopItem } from "./types";

const initialState: TDopItemsSlice = {
  items: [],
  itemsCart: getDopItemsInfo().itemsCart,
};

const dopItemsSlice = createSlice({
  name: "dopItems",
  initialState,
  reducers: {
    addDopItem(state, { payload }: PayloadAction<TDopItem>) {
      state.items.push({ ...payload });
    },
    removeDopItem(state, { payload }: PayloadAction<TDopItem>) {
      state.items = state.items.filter((obj) => obj.id !== payload.id);
    },
    resetDopItems(state) {
      state.items = [];
    },
    addDopItemToCart(state, { payload }: PayloadAction<TDopItem[]>) {
      state.itemsCart.push(...payload);
    },
    addOneDopItemToCart(state, { payload }: PayloadAction<TDopItem>) {
      state.itemsCart.push({ ...payload });
    },
    removeDopItemInItem(
      state,
      { payload }: PayloadAction<{ itemId: number; id: number }>
    ) {
      state.itemsCart = state.itemsCart.filter(
        (obj) => !(obj.itemId === payload.itemId && obj.id === payload.id)
      );
    },
    removeAllDopItemInItem(state, { payload }: PayloadAction<number>) {
      state.itemsCart = state.itemsCart.filter((obj) => obj.id !== payload);
    },
    removeDopItemsWhenRemoveItem(state, { payload }: PayloadAction<number>) {
      state.itemsCart = state.itemsCart.filter((obj) => obj.itemId !== payload);
    },
    resetDopItemsCart(state) {
      state.itemsCart = [];
    },
    removeLastDopItem(state, { payload }: PayloadAction<{category: number; id: number}>) {
      // @ts-ignore
      const index = state.itemsCart.findLastIndex((obj: any) => (obj.category === payload.category && obj.id === payload.id));
      if (index >= 0) {
        state.itemsCart.splice(index, 1);
      }
    },
  },
});

export const {
  addDopItem,
  removeDopItem,
  resetDopItems,
  addDopItemToCart,
  addOneDopItemToCart,
  removeDopItemInItem,
  removeAllDopItemInItem,
  removeDopItemsWhenRemoveItem,
  resetDopItemsCart,
  removeLastDopItem,
} = dopItemsSlice.actions;

export default dopItemsSlice.reducer;
