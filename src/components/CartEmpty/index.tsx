import React from "react";
import { Link } from "react-router-dom";

import emptyCart from '../../assets/img/cart--empty.svg';

import styles from "./CartEmpty.module.scss";

type CartEmptyProps = {};

export const CartEmpty: React.FC<CartEmptyProps> = () => {
  return (
    <div className={styles.empty}>
      <img src={emptyCart} alt="В корзине пусто" className={styles.empty__img} />
      <h2 className={styles.empty__title}>Ваша корзина пустая :(</h2>
      <p className={styles.empty__text}>
        Для того, чтобы-нибудь заказать, перейди на главную страницу.
      </p>
      <Link to="/" className={`${styles.empty__btn} btn`}>
        Вернуться назад
      </Link>
    </div>
  );
};
