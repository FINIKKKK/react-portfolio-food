import React from "react";
import { useSelector } from "react-redux";
import { categoriesSliceSelector } from "../../redux/categories/selectors";
import { productsSliceSelector } from "../../redux/products/selectors";
import { TProduct } from "../../redux/products/types";
import { ItemAddElement } from "./ItemAddElement";

import styles from "./ItemAddList.module.scss";

type ItemAddListProps = {
  title: string;
  categoryId: number;
};

export const ItemAddList: React.FC<ItemAddListProps> = ({
  title,
  categoryId,
}) => {
  const products = useSelector(productsSliceSelector);
  const categories = useSelector(categoriesSliceSelector);

  return (
    <div className="item__add">
      <h5 className="item__add-title">{title}:</h5>
      <div className="item__add-list">
        {products
          .filter((obj: TProduct) => obj.category === categoryId)
          .map((obj: TProduct, index) => (
            <ItemAddElement img={obj.img} name={obj.name} price={obj.price} />
          ))}
      </div>
    </div>
  );
};
