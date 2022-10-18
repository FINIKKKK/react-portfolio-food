import React from "react";

type ItemProps = {
  img: string;
  name: string;
  text: string;
  price: number;
};

export const Item: React.FC<ItemProps> = ({ img, name, text, price }) => {
  return (
    <div className="item">
      <img src={img} alt={name} className="item__img shadow" />
      <div className="item__content">
        <h5 className="item__title">{name}</h5>
        <p className="item__text">{text}</p>
        <div className="item__price">{price} ₽</div>
        <div className="item__btn">
          <svg width="20" height="20">
            <use xlinkHref="./icons.svg#plus" />
          </svg>
        </div>
      </div>
    </div>
  );
};
