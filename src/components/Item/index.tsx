import React from "react";
import { useDispatch } from "react-redux";
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
  const titleRef = React.useRef<HTMLHeadingElement>(null);

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
    dispatch(setPopupParams({ id, img, name, text, price }));
  };

  return (
    <div onClick={() => openPopup()} className={`${styles.item} item`}>
      <img src={img} alt={name} className={`${styles.item__img} shadow`} />
      <div className={styles.item__content}>
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
            {true ? (
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
