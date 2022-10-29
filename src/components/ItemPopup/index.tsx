import classNames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDopItemToCart,
  removeAllDopItemInItem,
  removeDopItemsWhenRemoveItem,
  resetDopItems,
} from "../../redux/dopItems/slice";
import {
  addCartItem,
  addCDopItemToCart,
  removeCartItem,
  removeOrMinusCartItem,
} from "../../redux/cart/slice";
import { popupSliceSelector } from "../../redux/popup/selectors";
import { resetCountPopup, setPopupVisible } from "../../redux/popup/slice";
import { ItemAddList } from "../ItemAddList";
import { ItemCounter } from "../ItemCounter";

import styles from "./ItemPopup.module.scss";
import { dopItemsSliceSelector } from "../../redux/dopItems/selectors";
import { cartSliceSelector } from "../../redux/cart/selectors";

type ItemPopupProps = {
  refPopup: any;
  refAddList1?: any;
  refAddList2?: any;
  onClose: any;
};

export const ItemPopup: React.FC<ItemPopupProps> = ({
  refPopup,
  onClose,
  refAddList1,
  refAddList2,
}) => {
  const {
    visible,
    mini,
    params,
    itemCount: count,
  } = useSelector(popupSliceSelector);
  const { items: cartItems } = useSelector(cartSliceSelector);
  const { items: dopItems, itemsCart: dopItemsCart } = useSelector(
    dopItemsSliceSelector
  );
  const dispatch = useDispatch();

  const closePopup = () => {
    onClose();
  };

  const findItem = cartItems.find((obj) => obj.id === params.id);
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

  const price = !findItem
    ? params.price * count + dopItemsPrice
    : params.price * findItem.count + dopItemsCartPrice;

  const paramsCart = {
    id: params.id,
    img: params.img,
    name: params.name,
    count,
    price: params.price,
  };

  const onAddItem = () => {
    if (!findItem) {
      dispatch(addCartItem(paramsCart));
      if (dopItems) {
        dispatch(addCDopItemToCart(dopItems));
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
      className={classNames(`${styles.popup} popup`, {
        [styles.active]: visible,
        [styles.mini]: mini,
      })}
    >
      <div ref={refPopup} className={styles.box}>
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
              className={`${styles.item__img} shadow ${
                params.category === 2 ? styles.rotated : ""
              } ${
                params.category === 4 || params.category === 5
                  ? styles.small
                  : ""
              }`}
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
                  className={`${styles.content} ${findItem && styles.active}`}
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
                categoryId={6}
                refLink={refAddList1}
                itemId={params.id}
              />
              <ItemAddList
                title="Добавить напитки"
                categoryId={7}
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
