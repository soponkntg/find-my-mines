import React from "react";
import styles from "./Grid.module.css";

export const Grid = () => {
  const [size, setSize] = React.useState(36);
  const [style, setStyle] = React.useState({
    width: "100px",
    height: "100px",
    margin: "1px",
  });

  const smallSize = () => {
    setSize(36);
    setStyle({ width: "100px", height: "100px", margin: "1px" });
  };
  const bigSize = () => {
    setSize(144);
    setStyle({ width: "50px", height: "50px", margin: "0.5px" });
  };

  const renderGrid = () => {
    const cells = [];

    for (let index = 0; index < size; index += 1) {
      cells.push(
        <button key={`${index}`} className={styles.box} style={style}>
          💣
        </button>
      );
    }

    return cells;
  };
  return (
    <div className={styles.center}>
      <div className={styles.container}>
        <div className={styles.grid}>{renderGrid()}</div>
      </div>
      <button style={{ width: "200px", marginTop: "50px" }} onClick={smallSize}>
        size 6*6
      </button>
      <button style={{ width: "200px", marginTop: "50px" }} onClick={bigSize}>
        size 12*12
      </button>
    </div>
  );
};
