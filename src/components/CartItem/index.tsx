import React from "react";
import { ItemCounter } from "../ItemCounter";

import styles from "./CartItem.module.scss";

type CartItemProps = {
  img: string;
  name: string;
  count: number;
  price: number;
};

export const CartItem: React.FC<CartItemProps> = ({
  img,
  name,
  count,
  price,
}) => {
  return (
    <tr className={styles.cart__item}>
      <td className={styles.img}>
        <img className="shadow" src={img} alt={name} title="" />
      </td>
      <td className={styles.title}>
        <h5>{name}</h5>
      </td>
      <td>
        <ItemCounter count={count} />
      </td>
      <td className={styles.price}>{price} ₽</td>
      <td className={styles.deleteBtn}>
        <button>
          <svg width="20" height="20">
            <use xlinkHref="./icons.svg#close" />
          </svg>
        </button>
      </td>
    </tr>
  );
};
