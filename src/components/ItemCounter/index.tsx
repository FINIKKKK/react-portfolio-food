import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { minusCartItem, plusCartItem } from "../../redux/cart/slice";
import { minusCountItem, plusCountItem } from "../../redux/popup/slice";
import { removeLastDopItem } from "../../redux/dopItems/slice";

import styles from "./ItemCounter.module.scss";
import { cartSliceSelector } from "../../redux/cart/selectors";
import { popupSliceSelector } from "../../redux/popup/selectors";

type ItemCounterProps = { id: number; category?: number };

export const ItemCounter: React.FC<ItemCounterProps> = ({ id, category }) => {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector(cartSliceSelector);
  const { itemCount: count } = useSelector(popupSliceSelector);
  const findItem = cartItems.find((obj) => obj.id === id);
  // @ts-ignore
  const findItemCategory = findItem?.category === 6 || findItem?.category === 7;

  const onPlus = () => {
    if (!findItem) {
      dispatch(plusCountItem());
    } else {
      dispatch(plusCartItem(id));
    }
  };
  const onMinus = () => {
    if (findItem && findItemCategory && category) {
      dispatch(removeLastDopItem({ category, id }));
    }

    if (!findItem) {
      dispatch(minusCountItem());
    } else {
      dispatch(minusCartItem(id));
    }
  };

  return (
    <div className={`${styles.counter} counter`}>
      <button
        onClick={onMinus}
        className={`${styles.counter__btn} ${styles.minus}`}
      >
        -
      </button>
      <input
        readOnly
        type="text"
        className={styles.number}
        value={findItem ? findItem.count : count}
      />
      <button
        onClick={onPlus}
        className={`${styles.counter__btn} ${styles.plus}`}
      >
        +
      </button>
    </div>
  );
};
