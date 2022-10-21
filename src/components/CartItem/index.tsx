import React from "react";

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
      <td className="cart__item-counter">
        <button className="cart__counter-btn cart__counter--minus">-</button>
        <input
          readOnly
          type="text"
          className="cart__counter-number"
          value={count}
        />
        <button className="cart__counter-btn cart__counter--plus">+</button>
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
