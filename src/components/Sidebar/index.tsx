import React from "react";
import { useSelector } from "react-redux";
import Scrollspy from "react-scrollspy";
import Sticky from "react-stickynode";

import { LoadingElement } from "../LoadingElement/LoadingElement";
import { useAppDispatch } from "../../redux/store";
import { fetchCategories } from "../../redux/categories/slice";
import { productsSliceSelector } from "../../redux/products/selectors";
import { categoriesSliceSelector } from "../../redux/categories/selectors";
import { TCategory } from "../../redux/categories/types";
import { LoadingStatus } from "../../redux/products/types";

import styles from "./Sidebar.module.scss";
import classNames from "classnames";

export type TSidebar = {
  refs: any;
};

export const Sidebar: React.FC<TSidebar> = ({ refs }) => {
  const dispatch = useAppDispatch();
  const { items: categories } = useSelector(categoriesSliceSelector);
  const { status } = useSelector(productsSliceSelector);

  const [isActive, setIsActive] = React.useState(true);
  const [isFixed, setIsFixed] = React.useState(false);
  const refSidebar = React.useRef(null);

  const groups = categories.map((_, index) => `group${index}`);

  React.useEffect(() => {
    const getCategories = () => {
      try {
        dispatch(fetchCategories());
      } catch (error) {
        alert("Ошибка!");
        console.log(error, "Ошибка при получении категорий...");
      }
    };
    getCategories();
  }, []);

  const onClickCategory = (id: number) => {
    refs[id].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const toggleFixed = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 10) {
      setIsActive(false);
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener("scroll", toggleFixed);
    return () => {
      window.removeEventListener("scroll", toggleFixed);
    };
  }, []);

  return (
    <Sticky
      enabled={window.innerWidth <= 1023 ? false : true}
      top={30}
      bottomBoundary={document.documentElement.scrollHeight - 350}
      className={classNames(styles.sidebar, {
        [styles.fixed]: isFixed,
      })}
      ref={refSidebar}
    >
      <Scrollspy
        items={groups}
        offset={-50}
        currentClassName={styles.active}
        className={`${styles.sidebar__list}`}
      >
        {status === LoadingStatus.LOADING
          ? Array(7)
              .fill(0)
              .map((_, index) => (
                <LoadingElement nameClass={"category"} key={index} />
              ))
          : categories.map((obj: TCategory, index: number) => (
              <li
                key={`${obj.name}_${index}`}
                className={classNames(styles.item, {
                  [styles.active]: index === 0 && isActive,
                })}
                onClick={() => onClickCategory(index)}
              >
                <svg width="20" height="20">
                  <use xlinkHref={`./icons.svg#category${obj.id}`} />
                </svg>
                <p>{obj.name}</p>
              </li>
            ))}
      </Scrollspy>
    </Sticky>
  );
};
