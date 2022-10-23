import { RootState } from '../store';

export const addItemsSliceSelector = ({ addItems }: RootState) => addItems.items;