import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TDopItemsSlice, TDopItem } from "./types";

const initialState: TDopItemsSlice = {
  items: [],
  itemsCart: [],
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
    removeDopItemInItem(
      state,
      { payload }: PayloadAction<{ itemId: number; id: number }>
    ) {
      // state.itemsCart = []
      state.itemsCart = state.itemsCart.filter(
        (obj) => !(obj.itemId === payload.itemId && obj.id === payload.id)
      );
    },
  },
});

export const {
  addDopItem,
  removeDopItem,
  resetDopItems,
  addDopItemToCart,
  removeDopItemInItem,
} = dopItemsSlice.actions;

export default dopItemsSlice.reducer;
