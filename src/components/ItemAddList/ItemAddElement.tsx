import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDopItem, removeDopItem } from "../../redux/dopItems/slice";
import { cartItemsSliceSelector } from "../../redux/cart/selectors";

import styles from "./ItemAddList.module.scss";
import { dopItemsSliceSelector } from "../../redux/dopItems/selectors";

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
  const dopItems = useSelector(dopItemsSliceSelector);
  const findItem = dopItems.find((obj) => obj.id === id);

  const count = 1;

  const onClickAddItem = () => {
    if (!findItem) {
      dispatch(addDopItem({ id, img, name, price, count }));
    } else {
      dispatch(removeDopItem({ id, img, name, price, count }));
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
