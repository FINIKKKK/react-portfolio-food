import React from "react";
import { useSelector } from "react-redux";
import { categoriesSliceSelector } from "../../redux/categories/selectors";
import { fetchCategories } from "../../redux/categories/slice";
import { TCategory } from "../../redux/categories/types";
import { useAppDispatch } from "../../redux/store";

import Sticky from "react-stickynode";

import styles from "./Sidebar.module.scss";

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
        window.scrollTo(0, 0);
      } catch (error) {
        alert("Ошибка!");
        console.log("Ошибка при получении категорий...");
        console.log(error);
      }
    };
    getCategories();
  }, []);

  const [activeCategory, setActiveCategory] = React.useState(0);

  const handleClickCategory = (id: number) => {
    refs[id].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setActiveCategory(id);
  };

  return (
    <Sticky top={30} className={styles.sidebar}>
      <ul className={styles.sidebar__list}>
        {categories.map((obj: TCategory, index) => (
          <li
            key={`${obj.name}_${index}`}
            className={`
              ${styles.item} 
              ${activeCategory === index ? styles.active : ""}
            `}
            onClick={() => handleClickCategory(index)}
          >
            <svg width="20" height="20">
              <use xlinkHref={`./icons.svg#category${obj.id}`} />
            </svg>
            <p>{obj.name}</p>
          </li>
        ))}
      </ul>
    </Sticky>
  );
};
