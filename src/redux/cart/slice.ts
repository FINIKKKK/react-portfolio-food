import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCartSlice, TCartItem } from './types';

const initialState: TCartSlice = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem(state, { payload }: PayloadAction<any>) {
      state.items = payload;
    },
  },
});

export const { addCartItem } = cartSlice.actions;

export default cartSlice.reducer;