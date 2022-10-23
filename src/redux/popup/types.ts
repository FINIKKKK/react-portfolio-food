import { TAddItem } from "../cart/types";

export type TParams = {
  id: number;
  img: string;
  name: string;
  text: string;
  price: number;
  addItems: TAddItem[];
};

export interface TPopupSlice {
  visible: boolean;
  mini: boolean;
  params: TParams;
  itemCount: number;
}
