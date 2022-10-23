import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import products from "./products/slice";
import categories from "./categories/slice";
import popup from "./popup/slice";
import cart from "./cart/slice";
import dopItems from "./dopItems/slice";

export const store = configureStore({
  reducer: {
    categories,
    products,
    popup,
    cart,
    dopItems,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
