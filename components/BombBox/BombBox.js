import React, { useState } from "react";
import styles from "./BombBox.module.css";

export const BombBox = ({ bomb, ...rest }) => {
  const [text, setText] = useState("");
  const onClickHandler = () => {
    setText("💣");
  };
  return (
    <button className={styles.bomb} {...rest} onClick={onClickHandler}>
      {text}
    </button>
  );
};
