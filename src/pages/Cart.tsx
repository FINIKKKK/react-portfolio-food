import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CartEmpty, CartItem } from "../components";
import { cartSliceSelector } from "../redux/cart/selectors";
import { clearCart } from "../redux/cart/slice";
import { TCartItem } from "../redux/cart/types";
import { resetDopItemsCart } from "../redux/dopItems/slice";

export const Cart: React.FC = () => {
  const { items } = useSelector(cartSliceSelector);

  const { totalCount, totalPrice } = useSelector(cartSliceSelector);
  const dispatch = useDispatch();

  const onClearCart = () => {
    dispatch(clearCart());
    dispatch(resetDopItemsCart());
  };

  const items1 = items && [...items].sort((prev, next) => prev.id - next.id);

  return (
    <section className="cart">
      {items.length > 0 ? (
        <div className="container">
          <div className="cart__inner">
            <Link to="/" className="cart__back">
              <svg width="20" height="20">
                <use xlinkHref="./icons.svg#back" />
              </svg>
              <p>Вернуться назад</p>
            </Link>
            <div className="cart__content">
              <div className="cart--left">
                <ul className="cart__total">
                  <li className="cart__total-li">
                    <p>Количество продуктов: </p>
                    <b>{totalCount}</b>
                  </li>
                  <li className="cart__total-li">
                    <p>Сумма заказа: </p>
                    <b>{totalPrice}₽</b>
                  </li>
                </ul>
                <button className="cart__total-btn btn">Оплатить</button>
              </div>
              <div className="cart--right">
                <div onClick={onClearCart} className="cart__clear">
                  <svg width="20" height="20">
                    <use xlinkHref="./icons.svg#cart" />
                  </svg>
                  <p>Очистить корзину</p>
                </div>

                <table className="cart__table">
                  <tbody>
                    {items1.map((obj: TCartItem) => (
                      <CartItem key={obj.id} {...obj} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CartEmpty />
      )}
    </section>
  );
};
