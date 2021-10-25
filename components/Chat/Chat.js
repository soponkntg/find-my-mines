import React from "react";
import { ChatBox } from "./ChatBox";
import { messageForm } from "./MessageForm";
import "./Chat.module.css";

export const Chat = () => {
  return (
    <div className="chat">
      <h2 className="chatTitle">Chat</h2>
      <Chatbox />
      <MessageForm />
    </div>
  );
};
