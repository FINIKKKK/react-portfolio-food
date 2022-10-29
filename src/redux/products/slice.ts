import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProductsSlice, TProduct, LoadingStatus } from "./types";

export const fetchProducts = createAsyncThunk<TProduct[]>(
  "products/fetchProductsStatus",
  async () => {
    const { data } = await axios.get<TProduct[]>(
      `https://634ac8cf5df952851418b562.mockapi.io/products?`
    );
    return data;
  }
);

const initialState: TProductsSlice = {
  status: LoadingStatus.LOADING,
  items: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, { payload }: PayloadAction<TProduct[]>) {
      state.items = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = LoadingStatus.LOADING;
      state.items = [];
    });
    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      state.status = LoadingStatus.SUCCESS;
      state.items = payload;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = LoadingStatus.ERROR;
      state.items = [];
    });
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
