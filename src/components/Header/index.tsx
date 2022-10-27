import React from "react";

import logo from "../../assets/img/logo.png";
import logoMini from "../../assets/img/logo--mini.png";

import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  cartItemsSliceSelector,
  cartSliceSelector,
} from "../../redux/cart/selectors";
import {
  dopItemsCartSliceSelector,
  dopItemsSliceSelector,
} from "../../redux/dopItems/selectors";

export const Header: React.FC = () => {
  const { totalCount } = useSelector(cartSliceSelector);
  const itemsCart = useSelector(cartItemsSliceSelector);
  const dopItemsCart = useSelector(dopItemsCartSliceSelector);

  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isMounted.current) {
      const data = JSON.stringify(itemsCart);
      localStorage.setItem("cart", data);

      const data2 = JSON.stringify(dopItemsCart);
      localStorage.setItem("dopItems", data2);
    }
    isMounted.current = true;
  }, [itemsCart, dopItemsCart]);

  const [isFixed, setIsFixed] = React.useState(false);

  const toggleVisible = (e: any) => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 10) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };
  window.addEventListener("scroll", toggleVisible);

  return (
    <header className={`${styles.header}`} id="header">
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
            <Link
              to="/cart"
              className={`${styles.header__cart}  ${
                isFixed ? styles.fixed : ""
              }`}
            >
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
