import React from "react";

import { Item, Sidebar } from "../components";

export const Home: React.FC = () => {
  return (
    <>
      <main className="main">
        <div className="container">
          <div className="main__inner">
            <Sidebar />

            <div className="items">
              <div className="items__group">
                <h2 className="items__group-title">Суши</h2>
                <div className="items__group-grid">
                  <Item />
                </div>
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
