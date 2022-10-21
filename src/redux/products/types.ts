export type TProduct = {
  id: number;
  img: string;
  name: string;
  text: string;
  price: number;
  category: number;
};

export interface TProductsSlice {
  status: ProductStatus;
  items: TProduct[];
}

export enum ProductStatus {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
