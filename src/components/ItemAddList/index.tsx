import React from "react";
import { useSelector } from "react-redux";
import { productsSliceSelector } from "../../redux/products/selectors";
import { TProduct } from "../../redux/products/types";
import { ItemAddElement } from "./ItemAddElement";

import styles from "./ItemAddList.module.scss";

type ItemAddListProps = {
  title: string;
  categoryId: number;
  refLink: React.RefObject<HTMLDivElement>;
};

export const ItemAddList: React.FC<ItemAddListProps> = ({
  title,
  categoryId,
  refLink,
}) => {
  const products = useSelector(productsSliceSelector);

  return (
    <div className={styles.item__add}>
      <h5 className={styles.add__title}>{title}:</h5>
      <div ref={refLink} className={styles.add__list}>
        {products
          .filter((obj: TProduct) => obj.category === categoryId)
          .map((obj: TProduct) => (
            <ItemAddElement
              key={obj.id}
              id={obj.id}
              img={obj.img}
              name={obj.name}
              price={obj.price}
            />
          ))}
      </div>
    </div>
  );
};
