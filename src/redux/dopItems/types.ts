export type TDopItem = {
  id: number;
  img: string;
  name: string;
  price: number;
  count: number;
  itemId: number;
  category?: number;
};

export interface TDopItemsSlice {
  dopItems: TDopItem[];
  dopItemsCart: TDopItem[];
}
