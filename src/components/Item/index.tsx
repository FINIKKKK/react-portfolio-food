import classNames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { cartSliceSelector } from "../../redux/cart/selectors";
import {
  setPopupMini,
  setPopupParams,
  setPopupVisible,
} from "../../redux/popup/slice";

import styles from "./Item.module.scss";

type ItemProps = {
  id: number;
  img: string;
  name: string;
  text: string;
  price: number;
  category: number;
};

export const Item: React.FC<ItemProps> = ({
  id,
  img,
  name,
  text,
  price,
  category,
}) => {
  const dispatch = useDispatch();

  const { items: cartItems } = useSelector(cartSliceSelector);

  const [height, setHeight] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);
  const titleRef = React.useRef<HTMLHeadingElement>(null);

  const contentMinus = category === 1 || category === 2 || category === 6;
  const params = {
    id,
    img,
    name,
    text,
    price,
    category,
  };

  const openPopup = () => {
    if (category === 6 || category === 7) {
      dispatch(setPopupMini(true));
    }
    dispatch(setPopupVisible(true));
    document.documentElement.className = "fixed";
    dispatch(setPopupParams(params));
  };

  React.useEffect(() => {
    if (titleRef.current !== undefined && titleRef.current !== null) {
      setHeight(titleRef?.current?.offsetHeight);
    }
  }, []);

  React.useEffect(() => {
    const isCartItem = cartItems.find((obj) => obj.id === id);
    if (isCartItem) {
      setIsActive(true);
    }
  }, [cartItems]);

  return (
    <div
      onClick={() => openPopup()}
      className={classNames(styles.item, "item", {
        [styles.active]: isActive,
      })}
    >
      <img
        src={img}
        alt={name}
        className={classNames(styles.item__img, "shadow", {
          [styles.rotated]: category === 2,
        })}
      />
      <div
        className={classNames(styles.item__content, {
          [styles.content__minus]: contentMinus,
        })}
      >
        <h5
          ref={titleRef}
          className={classNames(styles.item__title, {
            [styles.mini]: height && height > 40,
          })}
        >
          {name}
        </h5>
        <p className={styles.item__text}>{text}</p>
        <div className={styles.item__price}>{price} ₽</div>
        <div className={styles.item__btn}>
          <svg width="20" height="20">
            {!isActive ? (
              <use xlinkHref="./icons.svg#plus" />
            ) : (
              <use xlinkHref="./icons.svg#check" />
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};
