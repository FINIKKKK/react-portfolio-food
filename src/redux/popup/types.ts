import { TDopItem } from "../dopItems/types";

export type TParams = {
  id: number;
  img: string;
  name: string;
  text: string;
  price: number;
  dop?: TDopItem[]
};

export interface TPopupSlice {
  visible: boolean;
  mini: boolean;
  params: TParams;
  itemCount: number;
}
