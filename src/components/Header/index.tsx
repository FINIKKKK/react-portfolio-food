import React from "react";

import logo from "../../assets/img/logo.png";
import logoMini from "../../assets/img/logo--mini.png";

import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { cartSliceSelector } from "../../redux/cart/selectors";

export const Header: React.FC = () => {
  const { totalCount } = useSelector(cartSliceSelector);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__inner}>
          <Link to="/" className={styles.header__logo}>
            <picture>
              <source media="(max-width: 641px)" srcSet={logoMini} />
              <img src={logo} alt="logo" />
            </picture>
          </Link>

          <div className={styles.header__icons}>
            <a href="" className={styles.header__phone}>
              <svg width="20" height="20">
                <use xlinkHref="./icons.svg#phone" />
              </svg>
            </a>
            <Link to="/cart" className={styles.header__cart}>
              <svg width="20" height="20">
                <use xlinkHref="./icons.svg#cart" />
              </svg>
              {totalCount > 0 && <span>{totalCount}</span>}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
