import classNames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  miniPopupSliceSelector,
  paramsSliceSelector,
  visibleSliceSelector,
} from "../../redux/popup/selectors";
import { setPopupMini, setPopupVisible } from "../../redux/popup/slice";
import { ItemAddList } from "../ItemAddList";

import styles from "./ItemPopup.module.scss";

type ItemPopupProps = {};

export const ItemPopup: React.FC<ItemPopupProps> = () => {
  const visible = useSelector(visibleSliceSelector);
  const dispatch = useDispatch();

  const refAddList1 = React.createRef<HTMLDivElement>();
  const refAddList2 = React.useRef<HTMLDivElement>(null);

  const closePopup = () => {
    dispatch(setPopupVisible(false));
    dispatch(setPopupMini(false));
    document.documentElement.className = "";

    if (refAddList1.current !== null) {
      refAddList1.current.scrollTop = 0;
    }
    if (refAddList2.current !== null) {
      refAddList2.current.scrollTop = 0;
    }
  };

  const params = useSelector(paramsSliceSelector);
  const miniPopup = useSelector(miniPopupSliceSelector);

  let [count, setCount] = React.useState(1);

  const onMinus = () => {
    if (count !== 1) {
      setCount(--count);
    }
  };
  const onPlus = () => {
    if (count !== 99) {
      setCount(++count);
    }
  };

  if (!miniPopup) {
    return (
      <div
        className={classNames("item-popup", {
          active: visible,
        })}
      >
        <div className="popup">
          <svg
            onClick={() => closePopup()}
            width="20"
            height="20"
            className="item__close"
          >
            <use xlinkHref="./icons.svg#close" />
          </svg>
          <div className="popup__box">
            <div className="popup--left">
              <img
                src={params.img}
                alt={params.name}
                className="item__img shadow"
              />
              <div className="popup__content">
                <h2 className="item__title">{params.name}</h2>
                <p className="item__text">{params.text}</p>
                <div className="item__info">
                  <div className="item__counter cart__item-counter">
                    <button
                      onClick={onMinus}
                      className="cart__counter-btn cart__counter--minus"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className="cart__counter-number"
                      value={count}
                    />
                    <button
                      onClick={() => onPlus()}
                      className="cart__counter-btn cart__counter--plus"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="popup--right">
              <ItemAddList
                title="Добавить соус"
                categoryId={6}
                refLink={refAddList1}
              />
              <ItemAddList
                title="Добавить напитки"
                categoryId={7}
                refLink={refAddList2}
              />
              <div className="item__price">
                Общая сумма: <b>{params.price} ₽</b>
              </div>
              <div className="item__btn item__popup-btn btn">
                <div className="added">Добавлено</div>
                <div className="content">
                  <p>Добавить в корзину</p>
                  <svg width="20" height="20">
                    <use xlinkHref="./icons.svg#cart" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={classNames("item-popup mini", {
          active: visible,
        })}
      >
        <div className="popup">
          <svg
            onClick={() => closePopup()}
            width="20"
            height="20"
            className="item__close"
          >
            <use xlinkHref="./icons.svg#close" />
          </svg>
          <div className="popup__box">
            <div className="popup--left">
              <img
                src={params.img}
                alt={params.name}
                className="item__img shadow"
              />
              <div className="popup__content">
                <h2 className="item__title">{params.name}</h2>
                <p className="item__text">{params.text}</p>
                <div className="item__flex">
                  <div className="item__price">
                    <b>360 ₽</b>
                  </div>
                  <div className="item__counter cart__item-counter">
                    <button className="cart__counter-btn cart__counter--minus">
                      -
                    </button>
                    <input
                      type="text"
                      className="cart__counter-number"
                      value="1"
                    />
                    <button className="cart__counter-btn cart__counter--plus">
                      +
                    </button>
                  </div>
                </div>
                <div className="item__btn item__popup-btn btn">
                  <div className="added">Добавлено</div>
                  <div className="content">
                    <p>Добавить в корзину</p>
                    <svg width="20" height="20">
                      <use xlinkHref="./img/icons/icons.svg#cart" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
