import { TCartItem } from "../redux/cart/types";

export const getTotalCount = (arr: TCartItem[]) => {
  return arr.reduce((sum, obj) => obj.count + sum, 0);
};

export const getTotalPrice = (arr: TCartItem[]) => {
  return arr.reduce((sum, obj) => Number(obj.price) * Number(obj.count) + sum, 0);
};
