export type TParams = {
  img: string;
  name: string;
  text: string;
};

export interface TPopupSlice {
  visible: boolean;
  mini: boolean;
  params: TParams;
}
