import React from "react";

type ItemProps = {};

export const Item: React.FC<ItemProps> = () => {
  return (
    <div className="item">
      <img src="./img/@@img.png" alt="" className="item__img shadow" />
      <div className="item__content">
        <h5 className="item__title">@@title</h5>
        <p className="item__text">@@text</p>
        <div className="item__price">360 ₽</div>
        <div className="item__btn">
          <svg width="20" height="20">
            <use xlinkHref="./icons.svg#plus" />
          </svg>
        </div>
      </div>
    </div>
  );
};
