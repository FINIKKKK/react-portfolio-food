import React from "react";

import styles from "./LoadingElement.module.scss";

type LoadingElementProps = {
  nameClass: string;
};

export const LoadingElement: React.FC<LoadingElementProps> = ({
  nameClass,
}) => <div className={`${styles.loading} ${styles[nameClass]}`}></div>;
