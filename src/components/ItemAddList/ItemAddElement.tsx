import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDopItem, removeDopItem } from "../../redux/dopItems/slice";
import { cartItemsSliceSelector } from "../../redux/cart/selectors";

import styles from "./ItemAddList.module.scss";
import {
  dopItemsCartSliceSelector,
  dopItemsSliceSelector,
} from "../../redux/dopItems/selectors";
import { TDopItem } from "../../redux/dopItems/types";
import { removeDopItemInItem } from "../../redux/dopItems/slice";

type ItemAddElementProps = {
  id: number;
  img: string;
  name: string;
  price: number;
  itemId: number;
};



export const ItemAddElement: React.FC<ItemAddElementProps> = ({
  id,
  img,
  name,
  price,
  itemId,
}) => {
  const dispatch = useDispatch();
  const dopItems = useSelector(dopItemsSliceSelector);
  const itemsCart = useSelector(dopItemsCartSliceSelector);
  // @ts-ignore
  const dopItemsInItem = itemsCart.filter((obj) => obj.itemId === itemId);
  // @ts-ignore
  const findItemInItem = dopItemsInItem.find((obj) => obj.id === id);
  const dopItemsInItem2 = itemsCart.filter(
    (obj) => obj.itemId === itemId && obj.id === id
  );
  // console.log(itemsCart);
  // console.log(dopItemsInItem2);
  // const findItemInItem2 = dopItemsInItem.find((obj) => obj.id === id);

  const findItem = dopItems.find((obj) => obj.id === id);
  const count = 1;
  const onClickAddItem = () => {
    if (findItemInItem) {
      dispatch(removeDopItemInItem({ itemId, id }));
    }

    if (!findItemInItem && !findItem) {
      dispatch(addDopItem({ id, img, name, price, count, itemId }));
    } else {
      dispatch(removeDopItem({ id, img, name, price, count, itemId }));
    }
  };

  return (
    <div
      onClick={() => onClickAddItem()}
      className={`${styles.element} ${
        findItem || findItemInItem ? styles.active : ""
      }`}
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
