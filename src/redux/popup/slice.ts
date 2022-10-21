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
  },
});

export const { setPopupVisible, setPopupMini, setPopupParams } = popupSlice.actions;

export default popupSlice.reducer;
