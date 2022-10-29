export type TProduct = {
  id: number;
  img: string;
  name: string;
  text: string;
  price: number;
  category: number;
};

export interface TProductsSlice {
  status: LoadingStatus;
  items: TProduct[];
}

export enum LoadingStatus {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
