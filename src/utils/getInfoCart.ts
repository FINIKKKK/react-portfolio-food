import { TCartItem } from "../redux/cart/types";

export const getTotalCount = (arr: TCartItem[]) => {
  return arr.reduce((sum, obj) => obj.count + sum, 0);
};

export const getTotalPrice = (arr: TCartItem[]) => {
  return arr.reduce((sum, obj) => Number(obj.price) * Number(obj.count) + sum, 0);
};

export const getCartInfo = () => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = getTotalPrice(items);
  const totalCount = getTotalCount(items);

  return {
    items,
    totalPrice,
    totalCount,
  };
};

export const getDopItemsInfo = () => {
  const data = localStorage.getItem("dopItems");
  const itemsCart = data ? JSON.parse(data) : [];

  return {
    itemsCart,
  };
};