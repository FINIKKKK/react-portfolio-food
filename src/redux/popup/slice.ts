import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TParams, TPopupSlice } from "./types";

const initialState: TPopupSlice = {
  visible: false,
  params: {
    img: "",
    name: "",
    text: "",
  },
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    setPopup(state, { payload }: PayloadAction<boolean>) {
      state.visible = payload;
    },
    setParams(state, { payload }: PayloadAction<TParams>) {
      state.params = payload;
    },
  },
});

export const { setPopup, setParams } = popupSlice.actions;

export default popupSlice.reducer;
