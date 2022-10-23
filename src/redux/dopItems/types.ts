export type TDopItem = {
  id: number;
  img: string;
  name: string;
  price: number;
  count: number;
};

export interface TDopItemsSlice {
  items: TDopItem[];
};