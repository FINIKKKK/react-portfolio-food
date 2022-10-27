import React from "react";
import { useSelector } from "react-redux";
import { categoriesSliceSelector } from "../../redux/categories/selectors";
import { fetchCategories } from "../../redux/categories/slice";
import { TCategory } from "../../redux/categories/types";
import { useAppDispatch } from "../../redux/store";

import Sticky from "react-stickynode";

import styles from "./Sidebar.module.scss";
import { statusSliceSelector } from "../../redux/products/selectors";
import { LoadingElement } from "../LoadingElement/LoadingElement";
import Scrollspy from "react-scrollspy";
import offEvent from "react-scrollspy";

export type TSidebar = {
  refs: any;
};

export const Sidebar: React.FC<TSidebar> = ({ refs }) => {
  const dispatch = useAppDispatch();
  const categories = useSelector(categoriesSliceSelector);

  React.useEffect(() => {
    const getCategories = () => {
      try {
        dispatch(fetchCategories());
      } catch (error) {
        alert("Ошибка!");
        console.log("Ошибка при получении категорий...");
        console.log(error);
      }
    };
    getCategories();
  }, []);

  const [isActive, setIsActive] = React.useState(true);

  const handleClickCategory = (id: number) => {
    refs[id].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const refSidebar = React.useRef(null);
  const [isFixed, setIsFixed] = React.useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 10) {
      setIsActive(false);
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };
  window.addEventListener("scroll", toggleVisible);

  const status = useSelector(statusSliceSelector);

  const groups = categories.map((_, index) => `group${index}`);

  return (
    <Sticky
      enabled={window.innerWidth <= 1023 ? false : true}
      top={30}
      className={`${styles.sidebar} ${isFixed && styles.fixed}`}
      ref={refSidebar}
    >
      <Scrollspy
        className={`${styles.sidebar__list}`}
        items={groups}
        offset={-50}
        currentClassName={styles.active}
      >
        {status === "loading"
          ? Array(7)
              .fill(0)
              .map((_, index) => (
                <LoadingElement nameClass={"category"} key={index} />
              ))
          : categories.map((obj: TCategory, index) => (
              <li
                key={`${obj.name}_${index}`}
                className={`${styles.item} ${
                  index === 0 && isActive ? styles.active : ""
                }`}
                onClick={() => handleClickCategory(index)}
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
