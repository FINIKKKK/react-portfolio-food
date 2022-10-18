export type TProduct = {
  img: string;
  name: string;
  text: string;
  price: number;
  category: number;
};

export interface TProductsSlice {
  statusProduct: ProductStatus;
  products: TProduct[];
}

export enum ProductStatus {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
