import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  paramsSliceSelector,
  visibleSliceSelector,
} from "../../redux/popup/selectors";
import { setPopup } from "../../redux/popup/slice";

import styles from "./ItemPopup.module.scss";

type ItemPopupProps = {};

export const ItemPopup: React.FC<ItemPopupProps> = () => {
  const visible = useSelector(visibleSliceSelector);
  const dispatch = useDispatch();

  const closePopup = () => {
    dispatch(setPopup(false));
    document.documentElement.className = "";
  };

  const params = useSelector(paramsSliceSelector);

  return (
    <div className={`item-popup ${visible ? "active" : ""}`}>
      <div className="popup">
        <svg
          onClick={() => closePopup()}
          width="20"
          height="20"
          className="item__close"
        >
          <use xlinkHref="./icons.svg#close" />
        </svg>
        <div className="popup__box">
          <div className="popup--left">
            <img
              src={params.img}
              alt={params.name}
              className="item__img shadow"
            />
            <div className="popup__content">
              <h2 className="item__title">{params.name}</h2>
              <p className="item__text">{params.text}</p>
              <div className="item__info">
                <div className="item__counter cart__item-counter">
                  <button className="cart__counter-btn cart__counter--minus">
                    -
                  </button>
                  <input
                    type="text"
                    className="cart__counter-number"
                    value="1"
                  />
                  <button className="cart__counter-btn cart__counter--plus">
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="popup--right">
            <div className="item__add">
              <h5 className="item__add-title">Добавить соус:</h5>
              <div className="item__add-list">
                <div className="item__add-element">
                  <img src="./img/add1.png" alt="" className="img" />
                  <div className="info">
                    <h5>Coca-cola 0,5</h5>
                    <div className="price">360₽</div>
                  </div>
                  <svg className="check" width="20" height="20">
                    <use xlinkHref="./icons.svg#check" />
                  </svg>
                </div>
                <div className="item__add-element">
                  <img src="./img/add1.png" alt="" className="img" />
                  <div className="info">
                    <h5>Coca-cola 0,5</h5>
                    <div className="price">360₽</div>
                  </div>
                  <svg className="check" width="20" height="20">
                    <use xlinkHref="./icons.svg#check" />
                  </svg>
                </div>
                <div className="item__add-element">
                  <img src="./img/add1.png" alt="" className="img" />
                  <div className="info">
                    <h5>Coca-cola 0,5</h5>
                    <div className="price">360₽</div>
                  </div>
                  <svg className="check" width="20" height="20">
                    <use xlinkHref="./icons.svg#check" />
                  </svg>
                </div>
                <div className="item__add-element">
                  <img src="./img/add1.png" alt="" className="img" />
                  <div className="info">
                    <h5>Coca-cola 0,5</h5>
                    <div className="price">360₽</div>
                  </div>
                  <svg className="check" width="20" height="20">
                    <use xlinkHref="./icons.svg#check" />
                  </svg>
                </div>
                <div className="item__add-element">
                  <img src="./img/add1.png" alt="" className="img" />
                  <div className="info">
                    <h5>Coca-cola 0,5</h5>
                    <div className="price">360₽</div>
                  </div>
                  <svg className="check" width="20" height="20">
                    <use xlinkHref="./icons.svg#check" />
                  </svg>
                </div>
                <div className="item__add-element">
                  <img src="./img/add1.png" alt="" className="img" />
                  <div className="info">
                    <h5>Coca-cola 0,5</h5>
                    <div className="price">360₽</div>
                  </div>
                  <svg className="check" width="20" height="20">
                    <use xlinkHref="./icons.svg#check" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="item__add">
              <h5 className="item__add-title">Добавить напиток:</h5>
              <div className="item__add-list">
                <div className="item__add-element">
                  <img src="./img/add1.png" alt="" className="img" />
                  <div className="info">
                    <h5>Ролл с тигровой креветкой и лососем</h5>
                    <div className="price">360₽</div>
                  </div>
                  <svg className="check" width="20" height="20">
                    <use xlinkHref="./icons.svg#check" />
                  </svg>
                </div>
                <div className="item__add-element">
                  <img src="./img/add1.png" alt="" className="img" />
                  <div className="info">
                    <h5>Coca-cola 0,5</h5>
                    <div className="price">360₽</div>
                  </div>
                  <svg className="check" width="20" height="20">
                    <use xlinkHref="./icons.svg#check" />
                  </svg>
                </div>
                <div className="item__add-element">
                  <img src="./img/add1.png" alt="" className="img" />
                  <div className="info">
                    <h5>Coca-cola 0,5</h5>
                    <div className="price">360₽</div>
                  </div>
                  <svg className="check" width="20" height="20">
                    <use xlinkHref="./icons.svg#check" />
                  </svg>
                </div>
                <div className="item__add-element">
                  <img src="./img/add1.png" alt="" className="img" />
                  <div className="info">
                    <h5>Coca-cola 0,5</h5>
                    <div className="price">360₽</div>
                  </div>
                  <svg className="check" width="20" height="20">
                    <use xlinkHref="./icons.svg#check" />
                  </svg>
                </div>
                <div className="item__add-element">
                  <img src="./img/add1.png" alt="" className="img" />
                  <div className="info">
                    <h5>Coca-cola 0,5</h5>
                    <div className="price">360₽</div>
                  </div>
                  <svg className="check" width="20" height="20">
                    <use xlinkHref="./icons.svg#check" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="item__price">
              Общая сумма: <b>360 ₽</b>
            </div>
            <div className="item__btn item__popup-btn btn">
              <div className="added">Добавлено</div>
              <div className="content">
                <p>Добавить в корзину</p>
                <svg width="20" height="20">
                  <use xlinkHref="./icons.svg#cart" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
