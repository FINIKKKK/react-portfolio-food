import React from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";

import { ItemAddList } from "../ItemAddList";
import { ItemCounter } from "../ItemCounter";
import {
  addDopItemToCart,
  removeAllDopItemInItem,
  removeDopItemsWhenRemoveItem,
  resetDopItems,
} from "../../redux/dopItems/slice";
import {
  addCartItem,
  addDopItemsToCart,
  removeCartItem,
  removeOrMinusCartItem,
} from "../../redux/cart/slice";
import { resetCountPopup, setPopupVisible } from "../../redux/popup/slice";
import { popupSliceSelector } from "../../redux/popup/selectors";
import { dopItemsSliceSelector } from "../../redux/dopItems/selectors";
import { cartSliceSelector } from "../../redux/cart/selectors";

import styles from "./ItemPopup.module.scss";

type ItemPopupProps = {
  refPopup: React.RefObject<HTMLDivElement>;
  refAddList1: React.RefObject<HTMLDivElement>;
  refAddList2: React.RefObject<HTMLDivElement>;
  onClose: any;
};

export const ItemPopup: React.FC<ItemPopupProps> = ({
  refPopup,
  refAddList1,
  refAddList2,
  onClose,
}) => {
  const dispatch = useDispatch();
  const {
    visible,
    mini,
    params,
    itemCount: count,
  } = useSelector(popupSliceSelector);
  const { items: cartItems } = useSelector(cartSliceSelector);
  const { dopItems, dopItemsCart } = useSelector(
    dopItemsSliceSelector
  );

  const itemInCart = cartItems.find((obj) => obj.id === params.id);
  const dopItemsPrice = dopItems.reduce(
    (sum, obj) => Number(obj.price) + sum,
    0
  );
  const dopItemsCartInItem = dopItemsCart.filter(
    (obj) => obj.itemId === params.id
  );
  const dopItemsCartPrice = dopItemsCartInItem.reduce(
    (sum, obj) => Number(obj.price) + sum,
    0
  );

  const price = !itemInCart
    ? params.price * count + dopItemsPrice
    : params.price * itemInCart.count + dopItemsCartPrice;

  const paramsCart = {
    id: params.id,
    img: params.img,
    name: params.name,
    count,
    price: params.price,
  };
  const onAddItem = () => {
    if (!itemInCart) {
      dispatch(addCartItem(paramsCart));
      if (dopItems) {
        dispatch(addDopItemsToCart(dopItems));
        dispatch(addDopItemToCart(dopItems));
      }
      setTimeout(() => {
        dispatch(setPopupVisible(false));
        dispatch(resetCountPopup());
        dispatch(resetDopItems());
        document.documentElement.className = "";
      }, 500);
    } else {
      dispatch(removeCartItem(params.id));
      dispatch(removeAllDopItemInItem(params.id));
      dispatch(removeDopItemsWhenRemoveItem(params.id));
      dopItemsCartInItem.forEach((obj) => dispatch(removeOrMinusCartItem(obj)));
    }
  };

  return (
    <div
      className={classNames(styles.popup, "popup", {
        [styles.active]: visible,
        [styles.mini]: mini,
      })}
    >
      <div ref={refPopup} className={styles.box}>
        <svg
          onClick={() => onClose()}
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
              className={classNames(styles.item__img, "popup", {
                [styles.rotated]: params.category === 2,
                [styles.small]: params.category === 4 || params.category === 5,
              })}
            />
            <div className={styles.popup__content}>
              <h2 className={styles.item__title}>{params.name}</h2>
              <p className={styles.item__text}>{params.text}</p>
              <div className={styles.item__info}>
                <ItemCounter id={params.id} />
                {mini && <div className={styles.item__price}>{price} ₽</div>}
              </div>
              <div
                onClick={onAddItem}
                className={`${styles.item__btn} item__popup-btn btn`}
              >
                <div className={styles.added}>Добавлено</div>
                <div
                  className={`${styles.content} ${itemInCart && styles.active}`}
                >
                  <div className={styles.added}>Добавлено</div>
                  <div className={styles.remove}>Удалить</div>
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
          {!mini && (
            <div className={styles.rightSide}>
              <ItemAddList
                title="Добавить соус"
                category={6}
                refLink={refAddList1}
                itemId={params.id}
              />
              <ItemAddList
                title="Добавить напитки"
                category={7}
                refLink={refAddList2}
                itemId={params.id}
              />
              <div className={styles.item__price}>
                Общая сумма: <b>{price} ₽</b>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
