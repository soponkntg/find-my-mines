import React from "react";
import styles from "./Input.module.css";

export const Input = ({ val, onChangeHandler, ...rest }) => {
  return (
    <input
      className={styles.input}
      value={val}
      onChange={onChangeHandler}
      {...rest}
    />
  );
};
