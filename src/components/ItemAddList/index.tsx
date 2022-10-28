import React from "react";
import { useSelector } from "react-redux";
import { dopItemsCartSliceSelector } from "../../redux/dopItems/selectors";
import { productsSliceSelector } from "../../redux/products/selectors";
import { TProduct } from "../../redux/products/types";
import { ItemAddElement } from "./ItemAddElement";

import styles from "./ItemAddList.module.scss";

type ItemAddListProps = {
  title: string;
  categoryId: number;
  refLink: React.RefObject<HTMLDivElement>;
  itemId: number;
};

export const ItemAddList: React.FC<ItemAddListProps> = ({
  title,
  categoryId,
  refLink,
  itemId,
}) => {
  const products = useSelector(productsSliceSelector);
  const products1 = products.filter(
    (obj: TProduct) => obj.category === categoryId
  );
  console.log(products1);

  const itemsCart = useSelector(dopItemsCartSliceSelector);
  const dopItemsInItem = itemsCart.filter((obj) => obj.itemId === itemId);
  // @ts-ignore
  const findItemInItem = dopItemsInItem.find((obj) => obj.id === id);
  // const products2 = [...products].sort((prev, next) => dopItemsInItem.indexOf(prev.id) -  dopItemsInItem.indexOf(next.id);

  return (
    <div className={styles.item__add}>
      <h5 className={styles.add__title}>{title}:</h5>
      <div ref={refLink} className={styles.add__list}>
        {products1.map((obj: TProduct) => (
          <ItemAddElement
            key={obj.id}
            id={obj.id}
            img={obj.img}
            name={obj.name}
            price={obj.price}
            itemId={itemId}
          />
        ))}
      </div>
    </div>
  );
};
