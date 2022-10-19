import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import products from "./products/slice";
import categories from "./categories/slice";
import popup from "./popup/slice";

export const store = configureStore({
  reducer: {
    categories,
    products,
    popup,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
