export type TCartItem = {
  id: number;
  img: string;
  name: string;
  count: number;
  price: number;
};

export interface TCartSlice {
  items: [];
};