export type TCartItem = {
  id: number;
  img: string;
  name: string;
  count: number;
  price: number;
  category?: number;
};

export interface TCartSlice {
  items: TCartItem[];
  totalCount: number;
  totalPrice: number;
}
