export type TParams = {
  img: string;
  name: string;
  text: string;
};

export interface TPopupSlice {
  visible: boolean;
  params: TParams;
}
