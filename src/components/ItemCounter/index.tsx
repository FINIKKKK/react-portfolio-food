import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartItemsSliceSelector } from "../../redux/cart/selectors";
import { minusCartItem, plusCartItem } from "../../redux/cart/slice";
import {
  countItemSliceSelector,
} from "../../redux/popup/selectors";
import { minusCountItem, plusCountItem } from "../../redux/popup/slice";

import styles from "./ItemCounter.module.scss";

type ItemCounterProps = { id: number };

export const ItemCounter: React.FC<ItemCounterProps> = ({ id }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(cartItemsSliceSelector);
  const count = useSelector(countItemSliceSelector);
  const findItem = cartItems.find((obj) => obj.id === id);

  const onPlus = () => {
    if (!findItem) {
      dispatch(plusCountItem());
    } else {
      dispatch(plusCartItem(id));
    }
  };
  const onMinus = () => {
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
