import { RootState } from '../store';

export const dopItemsSliceSelector = ({ dopItems }: RootState) => dopItems.items;