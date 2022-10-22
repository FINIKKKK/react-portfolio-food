import { RootState } from "../store";

export const visibleSliceSelector = ({ popup }: RootState) => popup.visible;
export const paramsSliceSelector = ({ popup }: RootState) => popup.params;
export const miniPopupSliceSelector = ({ popup }: RootState) => popup.mini;
export const countItemSliceSelector = ({ popup }: RootState) => popup.itemCount;
