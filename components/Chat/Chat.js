import React from "react";
import { MessageForm } from "./MessageForm";
import { ChatBox } from "./ChatBox";
import styles from "./Chat.module.css";

export const Chat = () => {
  return (
    <div className={styles.chat}>
      <h2 className={styles.chatTitle}>Chat</h2>
      <ChatBox />
      <MessageForm />
    </div>
  );
};
