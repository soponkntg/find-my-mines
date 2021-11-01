import React, { useState } from "react";
import { ChatBox } from "./ChatBox";
import styles from "./Chat.module.css";

export const Chat = ({ message, username, socket, id }) => {
  const [text, setText] = useState("");
  return (
    <div className={styles.chat}>
      <h2 className={styles.chatTitle}>Chat</h2>
      <div className={styles.container}>
        {message.map((elem, index) => (
          <ChatBox
            key={index}
            username={elem.username}
            message={elem.message}
            sender={elem.username === username}
          />
        ))}
      </div>
      <form className={styles.form}>
        <input
          placeholder="Say something"
          className={styles.input}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button
          className={styles.btn}
          onClick={(e) => {
            e.preventDefault();
            socket.emit(
              "new-message",
              { username: username, message: text },
              id
            );
            setText("");
          }}
        >
          send
        </button>
      </form>
    </div>
  );
};
