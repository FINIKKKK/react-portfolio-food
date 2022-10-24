import { RootState } from '../store';

export const dopItemsSliceSelector = ({ dopItems }: RootState) => dopItems.items;
export const dopItemsCartSliceSelector = ({ dopItems }: RootState) => dopItems.itemsCart;