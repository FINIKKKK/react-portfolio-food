import { RootState } from "../store";

export const categoriesSliceSelector = ({ categories }: RootState) =>
  categories.items;
