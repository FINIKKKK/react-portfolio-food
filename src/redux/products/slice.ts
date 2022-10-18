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
  statusProduct: ProductStatus.LOADING,
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, { payload }: PayloadAction<TProduct[]>) {
      state.products = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.statusProduct = ProductStatus.LOADING;
      state.products = [];
    });
    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      state.statusProduct = ProductStatus.SUCCESS;
      state.products = payload;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.statusProduct = ProductStatus.ERROR;
      state.products = [];
    });
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
