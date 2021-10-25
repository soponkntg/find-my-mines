import React from "react";
import styles from "./Button.module.css";

export const Button = ({ children, onClickHandler, ...rest }) => {
  return (
    <button className={styles.btn} onClick={onClickHandler} {...rest}>
      {children}
    </button>
  );
};
