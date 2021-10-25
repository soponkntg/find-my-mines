import React from "react";
import { BombBox } from "../BombBox/BombBox";
import styles from "./Grid.module.css";

export const Grid = () => {
  const renderGrid = () => {
    const cells = [];

    for (let index = 0; index < 36; index += 1) {
      cells.push(<BombBox key={index} />);
    }

    return cells;
  };
  return (
    <div className={styles.center}>
      <div className={styles.container}>
        <div className={styles.grid}>{renderGrid()}</div>
      </div>
    </div>
  );
};
