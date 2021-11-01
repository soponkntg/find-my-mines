import React from "react";
import styles from "./Chatbox.module.css";

export const ChatBox = ({ sender, username, message }) => {
  return (
    <div className={sender ? styles.myMessage : styles.enemyMessage}>
      <div className={styles.senderDetail}>
        <div className={styles.senderName}>{username}</div>
      </div>
      <div className={styles.message}>{message}</div>
    </div>
  );
};
