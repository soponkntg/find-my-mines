import React from "react";
import styles from "./Room.module.css";

export const Room = ({ roomName, playes, onClickHnadler }) => {
  return (
    <div className={styles.room} onClick={onClickHnadler}>
      <h1>{roomName}</h1>
      <h2>
        {playes}
        {"/2"}
      </h2>
    </div>
  );
};
