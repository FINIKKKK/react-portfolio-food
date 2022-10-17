import React from "react";
import logo from "../../assets/img/logo.png";
import logoMini from "../../assets/img/logo--mini.png";

import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="line"></div>
          <Link to="/" className="footer__logo">
            <picture>
              <source media="(max-width: 641px)" srcSet={logoMini} />
              <img src={logo} alt="logo" />
            </picture>
          </Link>
          <p className="footer__text">Ресторан разнообразной японской еды</p>
          <div className="footer__phones">
            <svg className="icon" width="20" height="20">
              <use xlinkHref="./icons.svg#phone" />
            </svg>
            <a href="">+7 (777) 777-77-77</a>
            <a href="">+7 (777) 777-77-77</a>
          </div>
          <div className="footer__schedule">
            <p>7 дней в неделю</p>
            <p>с 10:00 по 22:00</p>
          </div>
          <ul className="soclist">
            <li className="soclist__item">
              <a href="#">
                <svg width="20" height="20">
                  <use xlinkHref="./icons.svg#instagram" />
                </svg>
              </a>
            </li>
            <li className="soclist__item">
              <a href="#">
                <svg width="20" height="20">
                  <use xlinkHref="./icons.svg#vk" />
                </svg>
              </a>
            </li>
            <li className="soclist__item">
              <a href="#">
                <svg width="20" height="20">
                  <use xlinkHref="./icons.svg#twitter" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__copy">
        Создатель макета <b>Dmitriy Bozhko</b>
      </div>
    </footer>
  );
};
