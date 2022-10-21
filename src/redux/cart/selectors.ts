import { RootState } from '../store';

export const cartItemsSliceSelector = ({ cart }: RootState) => cart.items;