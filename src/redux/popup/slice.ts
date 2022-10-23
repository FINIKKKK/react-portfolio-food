import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TParams, TPopupSlice } from "./types";

const initialState: TPopupSlice = {
  visible: false,
  mini: false,
  params: {
    id: 0,
    img: "",
    name: "",
    text: "",
    price: 0,
  },
  itemCount: 1,
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    setPopupVisible(state, { payload }: PayloadAction<boolean>) {
      state.visible = payload;
    },
    setPopupMini(state, { payload }: PayloadAction<boolean>) {
      state.mini = payload;
    },
    setPopupParams(state, { payload }: PayloadAction<TParams>) {
      state.params = payload;
    },
    plusCountItem(state) {
      if (state.itemCount !== 99) {
        state.itemCount++;
      }
    },
    minusCountItem(state) {
      if (state.itemCount !== 1) {
        state.itemCount--;
      }
    },
    setDefaultCount(state) {
      state.itemCount = 1;
    }
  },
});

export const {
  setPopupVisible,
  setPopupMini,
  setPopupParams,
  plusCountItem,
  minusCountItem,
  setDefaultCount,
} = popupSlice.actions;

export default popupSlice.reducer;
