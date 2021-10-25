import React from "react";
import styles from "./MessageForm.module.css";

export const MessageForm = () => {
  return (
    <form className={styles.messageForm}>
      <input
        className={styles.messageInput}
        placeholder="Say something ... (Press ENTER to send)"
      ></input>
      <button className={styles.sendButton}>Send</button>
    </form>
  );
};
