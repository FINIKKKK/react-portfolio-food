import { configureStore } from "@reduxjs/toolkit";

import products from "./products/slice";
import categories from "./categories/slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    products,
    categories,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
