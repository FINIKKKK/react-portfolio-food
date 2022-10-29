import React from "react";
import { useSelector } from "react-redux";

import { ItemAddElement } from "./ItemAddElement";
import { productsSliceSelector } from "../../redux/products/selectors";
import { TProduct } from "../../redux/products/types";

import styles from "./ItemAddList.module.scss";

type ItemAddListProps = {
  title: string;
  category: number;
  refLink: React.RefObject<HTMLDivElement>;
  itemId: number;
};

export const ItemAddList: React.FC<ItemAddListProps> = ({
  title,
  category,
  refLink,
  itemId,
}) => {
  const { items } = useSelector(productsSliceSelector);

  return (
    <div className={styles.item__add}>
      <h5 className={styles.add__title}>{title}:</h5>
      <div ref={refLink} className={styles.add__list}>
        {items
          .filter((obj: TProduct) => obj.category === category)
          .map((obj: TProduct) => (
            <ItemAddElement
              key={obj.id}
              id={obj.id}
              img={obj.img}
              name={obj.name}
              price={obj.price}
              itemId={itemId}
              category={obj.category}
            />
          ))}
      </div>
    </div>
  );
};
