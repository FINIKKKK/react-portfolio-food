import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames";

import logo from "../../assets/img/logo.png";
import logoMini from "../../assets/img/logo--mini.png";
import { cartSliceSelector } from "../../redux/cart/selectors";
import { dopItemsSliceSelector } from "../../redux/dopItems/selectors";

import styles from "./Header.module.scss";

export const Header: React.FC = React.memo(() => {
  const { items: cartItems, totalCount } = useSelector(cartSliceSelector);
  const { dopItemsCart } = useSelector(dopItemsSliceSelector);

  const isMounted = React.useRef(false);
  const [isFixed, setIsFixed] = React.useState(false);

  React.useEffect(() => {
    if (isMounted.current) {
      const data = JSON.stringify(cartItems);
      localStorage.setItem("cart", data);

      const data2 = JSON.stringify(dopItemsCart);
      localStorage.setItem("dopItems", data2);
    }
    isMounted.current = true;
  }, [cartItems, dopItemsCart]);

  const toggleFixed = () => {
    const scrolled = document.documentElement.scrollTop;

    if (scrolled > 10) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };
  React.useEffect(() => {
    document.body.addEventListener("scroll", toggleFixed);
    return () => {
      document.body.removeEventListener("scroll", toggleFixed);
    };
  }, []);

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
              className={classNames(styles.header__cart, {
                [styles.fixed]: window.innerWidth <= 1023 && isFixed,
              })}
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
});
