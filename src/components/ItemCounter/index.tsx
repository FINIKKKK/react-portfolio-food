import React from "react";

import styles from "./ItemCounter.module.scss";

type ItemCounterProps = { count: number };

export const ItemCounter: React.FC<ItemCounterProps> = ({ count }) => {
  // const onMinus = () => {
  //   if (count !== 1) {
  //     setCount(--count);
  //   }
  // };
  // const onPlus = () => {
  //   if (count !== 99) {
  //     setCount(++count);
  //   }
  // };

  return (
    <div className={`${styles.counter} counter`}>
      <button
        // onClick={onMinus}
        className={`${styles.counter__btn} ${styles.minus}`}
      >
        -
      </button>
      <input readOnly type="text" className={styles.number} value={count} />
      <button
        // onClick={onPlus}
        className={`${styles.counter__btn} ${styles.plus}`}
      >
        +
      </button>
    </div>
  );
};
