import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { TCategoriesSlice, TCategory, CategoryStatus } from "./types";

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
  statusCategory: CategoryStatus.LOADING,
  categories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories(state, { payload }: PayloadAction<TCategory[]>) {
      state.categories = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.statusCategory = CategoryStatus.LOADING;
      state.categories = [];
    });
    builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
      state.statusCategory = CategoryStatus.SUCCESS;
      state.categories = payload;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.statusCategory = CategoryStatus.ERROR;
      state.categories = [];
    });
  },
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
