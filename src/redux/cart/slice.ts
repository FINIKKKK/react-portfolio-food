import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCartSlice, TCartItem } from './types';

const initialState: TCartSlice = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem(state, { payload }: PayloadAction<TCartItem>) {
      state.items.push({...payload})
    },
  },
});

export const { addCartItem } = cartSlice.actions;

export default cartSlice.reducer;