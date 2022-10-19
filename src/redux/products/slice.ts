import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProductsSlice, TProduct, ProductStatus } from "./types";

export const fetchProducts = createAsyncThunk<TProduct[]>(
  "products/fetchProductsStatus",
  async () => {
    const { data } = await axios.get<TProduct[]>(
      "https://634ac8cf5df952851418b562.mockapi.io/products"
    );
    return data;
  }
);

const initialState: TProductsSlice = {
  status: ProductStatus.LOADING,
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
      state.status = ProductStatus.LOADING;
      state.items = [];
    });
    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      state.status = ProductStatus.SUCCESS;
      state.items = payload;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = ProductStatus.ERROR;
      state.items = [];
    });
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
