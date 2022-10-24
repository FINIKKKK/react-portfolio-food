export type TDopItem = {
  id: number;
  img: string;
  name: string;
  price: number;
  count: number;
  itemId: number;
};

export interface TDopItemsSlice {
  items: TDopItem[];
  itemsCart: TDopItem[];
}
