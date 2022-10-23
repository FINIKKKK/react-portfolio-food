import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TDopItemsSlice, TDopItem } from "./types";

const initialState: TDopItemsSlice = {
  items: [],
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
  },
});

export const { addDopItem, removeDopItem, resetDopItems } =
  dopItemsSlice.actions;

export default dopItemsSlice.reducer;
