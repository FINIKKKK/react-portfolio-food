import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProductsSlice, TProduct } from "./types";

const initialState: TProductsSlice = {
  items: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, { payload }: PayloadAction<TProduct[]>) {},
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
