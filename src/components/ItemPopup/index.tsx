import classNames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartItemsSliceSelector } from "../../redux/cart/selectors";
import { addCartItem } from "../../redux/cart/slice";
import { TCartItem } from "../../redux/cart/types";
import {
  countItemSliceSelector,
  miniPopupSliceSelector,
  paramsSliceSelector,
  visibleSliceSelector,
} from "../../redux/popup/selectors";
import {
  setDefaultCount,
  setPopupMini,
  setPopupVisible,
} from "../../redux/popup/slice";
import { ItemAddList } from "../ItemAddList";
import { ItemCounter } from "../ItemCounter";

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
    dispatch(setDefaultCount());
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
  const count = useSelector(countItemSliceSelector);
  const cartItems = useSelector(cartItemsSliceSelector);

  const findItem = cartItems.find((obj) => obj.id === params.id);
  const price = !findItem
    ? params.price * count
    : params.price * findItem.count;

  const paramsCart = {
    id: params.id,
    img: params.img,
    name: params.name,
    count,
    price: params.price,
  };

  const onAddItem = () => {
    dispatch(addCartItem(paramsCart));
    dispatch(setPopupVisible(false));
    dispatch(setDefaultCount());
    document.documentElement.className = "";
  };

  if (!miniPopup) {
    return (
      <div
        className={classNames(`${styles.popup} popup`, {
          [styles.active]: visible,
        })}
      >
        <div className={styles.box}>
          <svg
            onClick={() => closePopup()}
            width="20"
            height="20"
            className={styles.item__close}
          >
            <use xlinkHref="./icons.svg#close" />
          </svg>
          <div className={styles.popup__box}>
            <div className={styles.leftSide}>
              <img
                src={params.img}
                alt={params.name}
                className={`${styles.item__img} shadow`}
              />
              <div className={styles.popup__content}>
                <h2 className={styles.item__title}>{params.name}</h2>
                <p className={styles.item__text}>{params.text}</p>
                <div className={styles.item__info}>
                  <ItemCounter id={params.id} />
                </div>
              </div>
            </div>
            <div className={styles.rightSide}>
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
              <div className={styles.item__price}>
                Общая сумма: <b>{price} ₽</b>
              </div>
              <div
                onClick={onAddItem}
                className={`${styles.item__btn} item__popup-btn btn`}
              >
                <div className={styles.added}>Добавлено</div>
                <div className={styles.content}>
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
        className={classNames(`${styles.popup} ${styles.mini}`, {
          [styles.active]: visible,
        })}
      >
        <div className={styles.box}>
          <svg
            onClick={() => closePopup()}
            width="20"
            height="20"
            className={styles.item__close}
          >
            <use xlinkHref="./icons.svg#close" />
          </svg>
          <div className={styles.popup__box}>
            <div className={styles.leftSide}>
              <img
                src={params.img}
                alt={params.name}
                className={`${styles.item__img} shadow`}
              />
              <div className={styles.popup__content}>
                <h2 className={styles.item__title}>{params.name}</h2>
                <p className={styles.item__text}>{params.text}</p>
                <div className={styles.item__flex}>
                  <div className={styles.item__price}>
                    <b>360 ₽</b>
                  </div>
                  {/* <ItemCounter count={count} /> */}
                </div>
                <div className={`${styles.item__btn} item__popup-btn btn`}>
                  <div className={styles.added}>Добавлено</div>
                  <div className={styles.content}>
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
      </div>
    );
  }
};
