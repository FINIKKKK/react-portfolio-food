import React from "react";

type ItemProps = {
  img: string;
  name: string;
  text: string;
  price: number;
};

export const Item: React.FC<ItemProps> = ({ img, name, text, price }) => {
  const [height, setHeight] = React.useState(0);
  const titleRef = React.useRef<HTMLHeadingElement>(null);

  React.useEffect(() => {
    if (titleRef.current !== undefined && titleRef.current !== null) {
      setHeight(titleRef?.current?.offsetHeight);
    }
  }, []);

  console.log(titleRef);

  return (
    <div className="item">
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
            <use xlinkHref="./icons.svg#plus" />
          </svg>
        </div>
      </div>
    </div>
  );
};
