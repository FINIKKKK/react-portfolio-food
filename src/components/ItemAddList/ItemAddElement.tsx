import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemsSliceSelector } from "../../redux/addItems/selectors";
import {
  setAddItemActive,
  setAddItemDisabled,
} from "../../redux/addItems/slice";
import { cartItemsSliceSelector } from "../../redux/cart/selectors";

import styles from "./ItemAddList.module.scss";

type ItemAddElementProps = {
  id: number;
  img: string;
  name: string;
  price: number;
};

export const ItemAddElement: React.FC<ItemAddElementProps> = ({
  id,
  img,
  name,
  price,
}) => {
  const dispatch = useDispatch();
  const addItems = useSelector(addItemsSliceSelector);
  const findItem = addItems.find((objId) => objId === id);

  const onClickAddItem = () => {
    if (!findItem) {
      dispatch(setAddItemActive(id));
    } else {
      dispatch(setAddItemDisabled(id));
    }
  };

  return (
    <div
      onClick={() => onClickAddItem()}
      className={`${styles.element} ${findItem ? styles.active : ""}`}
    >
      <img src={img} alt={name} className={styles.img} />
      <div className={styles.info}>
        <h5>{name}</h5>
        <div className={styles.price}>{price}₽</div>
      </div>
      <svg className={styles.check} width="20" height="20">
        <use xlinkHref="./icons.svg#check" />
      </svg>
    </div>
  );
};
