export type TCategory = {
  id: number;
  name: string;
};

export interface TCategoriesSlice {
  status: CategoryStatus;
  categories: TCategory[];
}

export enum CategoryStatus {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}