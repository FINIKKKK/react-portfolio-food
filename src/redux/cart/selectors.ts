import { RootState } from "../store";

export const cartItemsSliceSelector = ({ cart }: RootState) => cart.items;
export const cartSliceSelector = ({ cart }: RootState) => cart;
