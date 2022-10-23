import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAddItemsSlice, TAddItem } from "./types";

const initialState: TAddItemsSlice = {
  items: [],
};

const additemsSlice = createSlice({
  name: "additems",
  initialState,
  reducers: {
    setAddItemActive(state, { payload }: PayloadAction<number>) {
      state.items.push(payload);
    },
    setAddItemDisabled(state, { payload }: PayloadAction<number>) {
      state.items = state.items.filter((id) => id !== payload);
    },
    setAdditemsDefault(state) {
      state.items = [];
    },
  },
});

export const { setAddItemActive, setAddItemDisabled, setAdditemsDefault } =
  additemsSlice.actions;

export default additemsSlice.reducer;
