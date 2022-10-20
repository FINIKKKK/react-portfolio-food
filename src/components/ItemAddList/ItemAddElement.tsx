import React from "react";

import styles from "./ItemAddList.module.scss";

type ItemAddElementProps = {
  img: string;
  name: string;
  price: number;
};

export const ItemAddElement: React.FC<ItemAddElementProps> = ({
  img,
  name,
  price,
}) => {
  const [active, setActive] = React.useState(false);

  return (
    <div
      onClick={() => setActive(!active)}
      className={`item__add-element ${active ? "active" : ""}`}
    >
      <img src={img} alt={name} className="img" />
      <div className="info">
        <h5>{name}</h5>
        <div className="price">{price}₽</div>
      </div>
      <svg className="check" width="20" height="20">
        <use xlinkHref="./icons.svg#check" />
      </svg>
    </div>
  );
};
