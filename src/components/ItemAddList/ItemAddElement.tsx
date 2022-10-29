import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import {
  addDopItem,
  addOneDopItemToCart,
  removeDopItem,
} from "../../redux/dopItems/slice";
import { removeDopItemInItem } from "../../redux/dopItems/slice";
import { addCartItem, removeOrMinusCartItem } from "../../redux/cart/slice";
import { cartSliceSelector } from "../../redux/cart/selectors";
import { dopItemsSliceSelector } from "../../redux/dopItems/selectors";

import styles from "./ItemAddList.module.scss";

type ItemAddElementProps = {
  id: number;
  img: string;
  name: string;
  price: number;
  itemId: number;
  category?: number;
};

export const ItemAddElement: React.FC<ItemAddElementProps> = ({
  id,
  img,
  name,
  price,
  itemId,
  category,
}) => {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector(cartSliceSelector);
  const { dopItems, dopItemsCart } = useSelector(dopItemsSliceSelector);

  const dopItem = dopItems.find((obj) => obj.id === id);
  const itemInCart = cartItems.find((obj) => obj.id === itemId);
  const dopItemsInItem = dopItemsCart.filter((obj) => obj.itemId === itemId);
  const dopItemInItem = dopItemsInItem.find((obj) => obj.id === id);

  const params = {
    id,
    img,
    name,
    price,
    count: 1,
    itemId,
    category,
  };

  const addItem = () => {
    if (!dopItemInItem && itemInCart) {
      dispatch(addOneDopItemToCart(params));
      dispatch(addCartItem(params));
    }

    if (dopItemInItem) {
      dispatch(removeDopItemInItem({ itemId, id }));
      dispatch(removeOrMinusCartItem(params));
    }

    if (!dopItemInItem && !dopItem && !itemInCart) {
      dispatch(addDopItem(params));
    } else {
      dispatch(removeDopItem(params));
    }
  };

  return (
    <div
      onClick={() => addItem()}
      className={classNames(styles.element, {
        [styles.active]: dopItem || dopItemInItem,
      })}
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
