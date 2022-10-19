import { RootState } from "../store";

export const visibleSliceSelector = ({ popup }: RootState) => popup.visible;
export const paramsSliceSelector = ({ popup }: RootState) => popup.params;