export type TParams = {
  id: number;
  img: string;
  name: string;
  text: string;
  price: number;
};

export interface TPopupSlice {
  visible: boolean;
  mini: boolean;
  params: TParams;
  itemCount: number;
}
