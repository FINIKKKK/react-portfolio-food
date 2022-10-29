import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { LoadingStatus } from "../products/types";
import { TCategoriesSlice, TCategory } from "./types";

export const fetchCategories = createAsyncThunk<TCategory[]>(
  "categories/fetchCategoriesStatus",
  async () => {
    const { data } = await axios.get<TCategory[]>(
      "https://634ac8cf5df952851418b562.mockapi.io/categories"
    );
    return data;
  }
);

const initialState: TCategoriesSlice = {
  status: LoadingStatus.LOADING,
  items: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories(state, { payload }: PayloadAction<TCategory[]>) {
      state.items = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.status = LoadingStatus.LOADING;
      state.items = [];
    });
    builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
      state.status = LoadingStatus.SUCCESS;
      state.items = payload;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.status = LoadingStatus.ERROR;
      state.items = [];
    });
  },
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
