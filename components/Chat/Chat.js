import React from "react";
import { ChatBox } from "./ChatBox";
import styles from "./Chat.module.css";

export const Chat = () => {
  return (
    <div className={styles.chat}>
      <h2 className={styles.chatTitle}>Chat</h2>
      <div className={styles.container}>
        <ChatBox />
      </div>
      <div className={styles.form}>
        <input placeholder="Say something" className={styles.input} />
        <button className={styles.btn}>send</button>
      </div>
    </div>
  );
};
