export type TCategory = {
  name: string;
};

export interface TCategoriesSlice {
  statusCategory: CategoryStatus;
  categories: TCategory[];
}

export enum CategoryStatus {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
