import React from "react";
import "./MessageForm.module.css";

export const messageForm = () => {
  return (
    <form class="messageForm">
      <input
        class="messageInput"
        placeholder="Say something ... (Press ENTER to send)"
      ></input>
      <button class="sendButton">Send</button>
    </form>
  );
};
