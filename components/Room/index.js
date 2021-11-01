import React from "react";
import styles from "./Room.module.css";

export const Room = ({ roomName, player, onClickHnadler }) => {
  return (
    <div className={styles.room} onClick={onClickHnadler}>
      <h1>{roomName}</h1>
      <h2>
        {player}
        {"/2"}
      </h2>
    </div>
  );
};
