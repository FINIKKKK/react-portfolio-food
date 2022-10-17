export type TProduct = {
  id: number;
  img: string;
  title: string;
  text: string;
  price: number;
};

export interface TProductsSlice {
  items: TProduct[];
}
