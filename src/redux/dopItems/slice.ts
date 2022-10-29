import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDopItemsInfo } from "../../utils/getInfoCart";
import { TDopItemsSlice, TDopItem } from "./types";

const initialState: TDopItemsSlice = {
  dopItems: [],
  dopItemsCart: getDopItemsInfo().dopItemsCart,
};

const dopItemsSlice = createSlice({
  name: "dopItems",
  initialState,
  reducers: {
    addDopItem(state, { payload }: PayloadAction<TDopItem>) {
      state.dopItems.push({ ...payload });
    },
    removeDopItem(state, { payload }: PayloadAction<TDopItem>) {
      state.dopItems = state.dopItems.filter((obj) => obj.id !== payload.id);
    },
    resetDopItems(state) {
      state.dopItems = [];
    },
    
    addDopItemToCart(state, { payload }: PayloadAction<TDopItem[]>) {
      state.dopItemsCart.push(...payload);
    },
    addOneDopItemToCart(state, { payload }: PayloadAction<TDopItem>) {
      state.dopItemsCart.push({ ...payload });
    },
    removeDopItemInItem(
      state,
      { payload }: PayloadAction<{ itemId: number; id: number }>
    ) {
      state.dopItemsCart = state.dopItemsCart.filter(
        (obj) => !(obj.itemId === payload.itemId && obj.id === payload.id)
      );
    },
    removeAllDopItemInItem(state, { payload }: PayloadAction<number>) {
      state.dopItemsCart = state.dopItemsCart.filter((obj) => obj.id !== payload);
    },
    removeDopItemsWhenRemoveItem(state, { payload }: PayloadAction<number>) {
      state.dopItemsCart = state.dopItemsCart.filter((obj) => obj.itemId !== payload);
    },
    resetDopItemsCart(state) {
      state.dopItemsCart = [];
    },
    removeLastDopItem(state, { payload }: PayloadAction<{category: number; id: number}>) {
      // @ts-ignore
      const index = state.dopItemsCart.findLastIndex((obj: any) => (obj.category === payload.category && obj.id === payload.id));
      if (index >= 0) {
        state.dopItemsCart.splice(index, 1);
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
