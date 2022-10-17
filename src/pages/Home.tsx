import React from "react";

export const Home: React.FC = () => {
  return (
    <>
      <main className="main">
        <div className="container">
          <div className="main__inner">
            <aside className="sidebar">
              <ul className="sidebar__list">
                <li className="sidebar__list-item active">
                  <svg width="20" height="20">
                    <use xlinkHref="./img/icons/icons.svg#category1" />
                  </svg>
                  <p>Суши</p>
                </li>
                <li className="sidebar__list-item">
                  <svg width="20" height="20">
                    <use xlinkHref="./img/icons/icons.svg#category2" />
                  </svg>
                  <p>Роллы</p>
                </li>
                <li className="sidebar__list-item">
                  <svg width="20" height="20">
                    <use xlinkHref="./img/icons/icons.svg#category3" />
                  </svg>
                  <p>Сеты</p>
                </li>
                <li className="sidebar__list-item">
                  <svg width="20" height="20">
                    <use xlinkHref="./img/icons/icons.svg#category4" />
                  </svg>
                  <p>Салаты</p>
                </li>
                <li className="sidebar__list-item">
                  <svg width="20" height="20">
                    <use xlinkHref="./img/icons/icons.svg#category5" />
                  </svg>
                  <p>WOK</p>
                </li>
                <li className="sidebar__list-item">
                  <svg width="20" height="20">
                    <use xlinkHref="./img/icons/icons.svg#category6" />
                  </svg>
                  <p>Соусы</p>
                </li>
                <li className="sidebar__list-item">
                  <svg width="20" height="20">
                    <use xlinkHref="./img/icons/icons.svg#category7" />
                  </svg>
                  <p>Напитки</p>
                </li>
              </ul>
            </aside>

            <div className="items">
              <div className="items__group">
                <h2 className="items__group-title">Суши</h2>
                <div className="items__group-grid"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="btn-up">
        <svg width="20" height="20">
          <use xlinkHref="./img/icons/icons.svg#up" />
        </svg>
      </div>
    </>
  );
};
