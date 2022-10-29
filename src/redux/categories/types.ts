import { LoadingStatus } from "../products/types";

export type TCategory = {
  id: number,
  name: string;
};

export interface TCategoriesSlice {
  status: LoadingStatus;
  items: TCategory[];
}