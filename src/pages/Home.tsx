import React from "react";
import { useSelector } from "react-redux";

import { Item, Sidebar } from "../components";
import { ButtonUp } from "../components/ButtonUp";
import { categoriesSliceSelector } from "../redux/categories/selectors";
import { TCategory } from "../redux/categories/types";
import { productsSliceSelector } from "../redux/products/selectors";
import { fetchProducts } from "../redux/products/slice";
import { TProduct } from "../redux/products/types";
import { useAppDispatch } from "../redux/store";

import { ItemPopup } from "../components/ItemPopup";

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const getProducts = () => {
      try {
        dispatch(fetchProducts());
      } catch (error) {
        alert("Ошибка!");
        console.log("Ошибка при получении ");
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const products = useSelector(productsSliceSelector);
  const categories = useSelector(categoriesSliceSelector);

  const refs = categories.reduce((acc: any, value, index: number) => {
    acc[index] = React.createRef<HTMLDivElement>();
    return acc;
  }, {});

  return (
    <>
      <main className="main">
        <div className="container">
          <div className="main__inner">
            <Sidebar refs={refs} />

            <div className="items">
              {categories.map((obj: TCategory, index) => (
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
                        <Item key={`${obj.name}_${index}`} {...obj} />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <ButtonUp />
      <ItemPopup />
    </>
  );
};
