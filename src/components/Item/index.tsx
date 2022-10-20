import React from "react";
import { useDispatch } from "react-redux";
import {
  setPopupMini,
  setPopupParams,
  setPopupVisible,
} from "../../redux/popup/slice";

type ItemProps = {
  img: string;
  name: string;
  text: string;
  price: number;
  category: number;
};

export const Item: React.FC<ItemProps> = ({
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
    console.log(category);
    if (category === 6 || category === 7) {
      dispatch(setPopupMini(true));
    }
    dispatch(setPopupVisible(true));
    document.documentElement.className = "fixed";
    dispatch(setPopupParams({ img, name, text, price }));
  };

  return (
    <div onClick={() => openPopup()} className="item">
      <img src={img} alt={name} className="item__img shadow" />
      <div className="item__content">
        <h5
          ref={titleRef}
          className={`item__title + ${height && height > 40 ? "mini" : ""}`}
        >
          {name}
        </h5>
        <p className="item__text">{text}</p>
        <div className="item__price">{price} ₽</div>
        <div className="item__btn">
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
