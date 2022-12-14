import classNames from "classnames";
import React from "react";

import styles from "./ButtonUp.module.scss";

type ButtonUpProps = {};

export const ButtonUp: React.FC<ButtonUpProps> = () => {
  const [visible, setVisible] = React.useState(false);

  const toggleVisible = () => {
    const scrollHeight = document.body.scrollHeight;
    const scrollY = window.scrollY;
    const clientHeight = document.documentElement.clientHeight;

    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
      if (scrollHeight - (scrollY + clientHeight) < 50) {
        setVisible(false);
      }
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      onClick={scrollToTop}
      className={classNames(styles.btn, {
        [styles.show]: visible,
      })}
    >
      <svg width="20" height="20">
        <use xlinkHref="./icons.svg#up" />
      </svg>
    </div>
  );
};
