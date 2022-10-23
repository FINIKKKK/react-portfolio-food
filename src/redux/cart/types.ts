export type TAddItem = {
  id: number;
  img: string;
  name: string;
  price: number;
  count: number;
};

export type TCartItem = {
  id: number;
  img: string;
  name: string;
  count: number;
  price: number;
  addItems: TAddItem[];
};

export interface TCartSlice {
  items: TCartItem[];
  totalCount: number;
  totalPrice: number;
}
