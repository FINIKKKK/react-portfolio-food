import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartItemsSliceSelector } from "../../redux/cart/selectors";
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
  const [height, setHeight] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);

  const titleRef = React.useRef<HTMLHeadingElement>(null);
  const cartItems = useSelector(cartItemsSliceSelector);

  React.useEffect(() => {
    if (titleRef.current !== undefined && titleRef.current !== null) {
      setHeight(titleRef?.current?.offsetHeight);
    }
  }, []);

  const dispatch = useDispatch();

  const openPopup = () => {
    if (category === 6 || category === 7) {
      dispatch(setPopupMini(true));
    }
    dispatch(setPopupVisible(true));
    document.documentElement.className = "fixed";
    dispatch(setPopupParams({ id, img, name, text, price, category }));
  };

  React.useEffect(() => {
    const findActiveItem = cartItems.find((obj) => obj.id === id);
    if (findActiveItem) {
      setIsActive(true);
    }
  }, [cartItems]);

  const contentMinus = category === 1 || category === 2 || category === 6;

  return (
    <div
      onClick={() => openPopup()}
      className={`${styles.item} item ${isActive ? styles.active : ""}`}
    >
      <img
        src={img}
        alt={name}
        className={`${styles.item__img} shadow ${
          category === 2 ? styles.rotated : ""
        }`}
      />
      <div
        className={`${styles.item__content} ${
          contentMinus ? styles.content__minus : ""
        }`}
      >
        <h5
          ref={titleRef}
          className={`${styles.item__title} ${
            height && height > 40 ? styles.mini : ""
          }`}
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
