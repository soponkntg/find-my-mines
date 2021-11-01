import React from "react";
import styles from "./BombBox.module.css";

export const BombBox = ({
  bombSymbol,
  onClickHandler,
  isDisable,
  clickYet,
  hasBomb,
}) => {
  const renderBomb = clickYet ? (hasBomb ? bombSymbol : "❌") : "";
  return (
    <button
      className={styles.bomb}
      onClick={onClickHandler}
      disabled={isDisable}
    >
      {renderBomb}
    </button>
  );
};
