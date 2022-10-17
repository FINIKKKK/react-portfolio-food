import React from "react";
import { useSelector } from "react-redux";
import { categoriesSliceSelector } from "../../redux/categories/selectors";
import { fetchCategories } from "../../redux/categories/slice";
import { TCategory } from "../../redux/categories/types";
import { useAppDispatch } from "../../redux/store";

export const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categories } = useSelector(categoriesSliceSelector);

  React.useEffect(() => {
    const getCategories = async () => {
      try {
        dispatch(fetchCategories());
        window.scrollTo(0, 0);
      } catch (error) {
        alert("Ошибка!");
        console.log("Ошибка при получении ");
        console.log(error);
      }
    };
    getCategories();
  }, []);

  const [activeCategory, setActiveCategory] = React.useState(0);

  const clickCategory = (index: number) => {
    setActiveCategory(index);
  };

  return (
    <aside className="sidebar">
      <ul className="sidebar__list">
        {categories.map((obj: TCategory, index) => (
          <li
            key={obj.id}
            className={`sidebar__list-item + ${
              activeCategory === index ? "active" : ""
            }`}
            onClick={() => clickCategory(index)}
          >
            <svg width="20" height="20">
              <use xlinkHref={`./icons.svg#category${obj.id}`} />
            </svg>
            <p>{obj.name}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
};
