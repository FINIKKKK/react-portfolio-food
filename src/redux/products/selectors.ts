import { RootState } from "../store";

export const productsSliceSelector = ({ products }: RootState) =>
  products.items;
export const statusSliceSelector = ({ products }: RootState) => products.status;
