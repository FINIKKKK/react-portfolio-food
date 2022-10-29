import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { minusCartItem, plusCartItem } from "../../redux/cart/slice";
import { minusItem, plusItem } from "../../redux/popup/slice";
import { removeLastDopItem } from "../../redux/dopItems/slice";
import { cartSliceSelector } from "../../redux/cart/selectors";
import { popupSliceSelector } from "../../redux/popup/selectors";

import styles from "./ItemCounter.module.scss";

type ItemCounterProps = { id: number; category?: number };

export const ItemCounter: React.FC<ItemCounterProps> = ({ id, category }) => {
  const dispatch = useDispatch();

  const { items } = useSelector(cartSliceSelector);
  const { itemCount } = useSelector(popupSliceSelector);

  const itemInCart = items.find((obj) => obj.id === id);
  const thisCategory = itemInCart?.category === 6 || itemInCart?.category === 7;

  const onPlus = () => {
    if (!itemInCart) {
      dispatch(plusItem());
    } else {
      dispatch(plusCartItem(id));
    }
  };
  const onMinus = () => {
    if (itemInCart && thisCategory) {
      category && dispatch(removeLastDopItem({ category, id }));
    }
    if (!itemInCart) {
      dispatch(minusItem());
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
        value={itemInCart ? itemInCart.count : itemCount}
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
