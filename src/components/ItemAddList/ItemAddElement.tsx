import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDopItem,
  addOneDopItemToCart,
  removeDopItem,
} from "../../redux/dopItems/slice";

import styles from "./ItemAddList.module.scss";
import { dopItemsSliceSelector } from "../../redux/dopItems/selectors";
import { removeDopItemInItem } from "../../redux/dopItems/slice";
import { addCartItem, removeOrMinusCartItem } from "../../redux/cart/slice";
import { cartSliceSelector } from "../../redux/cart/selectors";

type ItemAddElementProps = {
  id: number;
  img: string;
  name: string;
  price: number;
  itemId: number;
  category: number;
};

export const ItemAddElement: React.FC<ItemAddElementProps> = ({
  id,
  img,
  name,
  price,
  itemId,
  category,
}) => {
  const dispatch = useDispatch();
  const { items: dopItems, itemsCart } = useSelector(dopItemsSliceSelector);
  const { items: cartItems } = useSelector(cartSliceSelector);
  const itemIdInCart = cartItems.find((obj) => obj.id === itemId);
  // @ts-ignore
  const dopItemsInItem = itemsCart.filter((obj) => obj.itemId === itemId);
  // @ts-ignore
  const findItemInItem = dopItemsInItem.find((obj) => obj.id === id);
  const dopItemsInItem2 = itemsCart.filter(
    (obj) => obj.itemId === itemId && obj.id === id
  );
  // console.log(itemsCart);
  // console.log(dopItemsInItem2);
  // const findItemInItem2 = dopItemsInItem.find((obj) => obj.id === id);

  const findItem = dopItems.find((obj) => obj.id === id);
  const count = 1;
  const params = {
    id,
    img,
    name,
    price,
    count,
    itemId,
    category,
  };
  const onClickAddItem = () => {
    if (!findItemInItem && itemIdInCart) {
      // @ts-ignore
      dispatch(addOneDopItemToCart(params));
      dispatch(addCartItem(params));
    }

    if (findItemInItem) {
      dispatch(removeDopItemInItem({ itemId, id }));
      dispatch(removeOrMinusCartItem(params));
    }

    if (!findItemInItem && !findItem && !itemIdInCart) {
      // @ts-ignore
      dispatch(addDopItem({ id, img, name, price, count, itemId, category }));
    } else {
      dispatch(
        // @ts-ignore
        removeDopItem({ id, img, name, price, count, itemId, category })
      );
    }
  };

  return (
    <div
      onClick={() => onClickAddItem()}
      className={`${styles.element} ${
        findItem || findItemInItem ? styles.active : ""
      }`}
    >
      <img src={img} alt={name} className={styles.img} />
      <div className={styles.info}>
        <h5>{name}</h5>
        <div className={styles.price}>{price}₽</div>
      </div>
      <svg className={styles.check} width="20" height="20">
        <use xlinkHref="./icons.svg#check" />
      </svg>
    </div>
  );
};
