import React from "react";

import logo from "../../assets/img/logo.png";
import logoMini from "../../assets/img/logo--mini.png";

import styles from './Header.module.scss'

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <a href="index.html" className="header__logo">
            <picture>
              <source
                media="(max-width: 641px)"
                srcSet={logoMini}
              />
              <img src={logo} alt="logo" />
            </picture>
          </a>

          <div className="header__icons">
            <a href="" className="header__phone">
              <svg width="20" height="20">
                <use xlinkHref="./icons.svg#phone" />
              </svg>
            </a>
            <a href="cart.html" className="header__cart">
              <svg width="20" height="20">
                <use xlinkHref="./icons.svg#cart" />
              </svg>
              <span>99</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
