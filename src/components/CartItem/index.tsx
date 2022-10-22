import React from "react";
import { useDispatch } from "react-redux";
import { removeCartItem } from "../../redux/cart/slice";
import { ItemCounter } from "../ItemCounter";

import styles from "./CartItem.module.scss";

type CartItemProps = {
  id: number;
  img: string;
  name: string;
  count: number;
  price: number;
};

export const CartItem: React.FC<CartItemProps> = ({
  id,
  img,
  name,
  count,
  price,
}) => {
  const dispatch = useDispatch();

  const onRemoveItem = () => {
    dispatch(removeCartItem(id));
  };

  return (
    <tr className={styles.cart__item}>
      <td className={styles.img}>
        <img className="shadow" src={img} alt={name} title="" />
      </td>
      <td className={styles.title}>
        <h5>{name}</h5>
      </td>
      <td>
        <ItemCounter id={id}/>
      </td>
      <td className={styles.price}>{price} ₽</td>
      <td className={styles.deleteBtn}>
        <button onClick={onRemoveItem}>
          <svg width="20" height="20">
            <use xlinkHref="./icons.svg#close" />
          </svg>
        </button>
      </td>
    </tr>
  );
};
