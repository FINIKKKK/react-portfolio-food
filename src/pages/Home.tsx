import React from "react";
import { useSelector } from "react-redux";

import { Item, LoadingElement, Sidebar } from "../components";
import { ButtonUp } from "../components/ButtonUp";
import { categoriesSliceSelector } from "../redux/categories/selectors";
import { TCategory } from "../redux/categories/types";
import {
  productsSliceSelector,
  statusSliceSelector,
} from "../redux/products/selectors";
import { fetchProducts } from "../redux/products/slice";
import { TProduct } from "../redux/products/types";
import { useAppDispatch } from "../redux/store";

import { ItemPopup } from "../components/ItemPopup";
import {
  resetCountPopup,
  setPopupMini,
  setPopupVisible,
} from "../redux/popup/slice";
import { resetDopItems } from "../redux/dopItems/slice";
import { miniPopupSliceSelector } from "../redux/popup/selectors";

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const getProducts = () => {
      try {
        dispatch(fetchProducts());
        window.scrollTo(0, 0);
      } catch (error) {
        alert("Ошибка!");
        console.log("Ошибка при получении продуктов...");
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const products = useSelector(productsSliceSelector);
  const categories = useSelector(categoriesSliceSelector);
  const isMini = useSelector(miniPopupSliceSelector);

  const refs = categories.reduce((acc: any, value, index: number) => {
    acc[index] = React.createRef<HTMLDivElement>();
    return acc;
  }, {});

  const status = useSelector(statusSliceSelector);

  const refPopup = React.useRef<HTMLDivElement>(null);
  const refItem = React.useRef<HTMLDivElement>(null);

  const refAddList1 = React.createRef<HTMLDivElement>();
  const refAddList2 = React.createRef<HTMLDivElement>();

  const closePopup = () => {
    dispatch(setPopupVisible(false));
    if (isMini) {
      setTimeout(() => dispatch(setPopupMini(false)), 300);
    } else {
      dispatch(setPopupMini(false));
    }
    dispatch(resetCountPopup());
    dispatch(resetDopItems());
    document.documentElement.className = "";

    if (refAddList1.current !== null) {
      refAddList1.current.scrollTop = 0;
    }
    if (refAddList2.current !== null) {
      refAddList2.current.scrollTop = 0;
    }
  };

  const handleClickOutSide = (e: MouseEvent) => {
    const _event = e as MouseEvent & {
      path: Node[];
    };
    if (
      refPopup.current &&
      !_event.path.includes(refPopup.current) &&
      // @ts-ignore
      !_event.path.includes(refItem.current)
    ) {
      closePopup();
    }
  };
  React.useEffect(() => {
    document.body.addEventListener("click", handleClickOutSide);
    return () => {
      document.body.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  return (
    <>
      <main className="main">
        <div className="container">
          <div className="main__inner">
            <Sidebar refs={refs} />
            <div ref={refItem} className="items">
              {status === "loading"
                ? Array(2)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index} className="items__group">
                        <LoadingElement nameClass={"title"} key={index} />
                        <div className="items__group-grid">
                          {Array(8)
                            .fill(0)
                            .map((_, index) => (
                              <LoadingElement nameClass={"item"} key={index} />
                            ))}
                        </div>
                      </div>
                    ))
                : categories.map((obj: TCategory, index) => (
                    <div
                      id={`group${index}`}
                      ref={refs[index]}
                      key={obj.id}
                      className="items__group"
                    >
                      <h2 className="items__group-title">{obj.name}</h2>
                      <div className="items__group-grid">
                        {products
                          .filter((obj: TProduct) => obj.category === index + 1)
                          .map((obj: TProduct, index) => (
                            <Item key={obj.id} {...obj} />
                          ))}
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </main>

      <ButtonUp />
      <ItemPopup
        refPopup={refPopup}
        refAddList1={refAddList1}
        refAddList2={refAddList2}
        onClose={closePopup}
      />
    </>
  );
};
