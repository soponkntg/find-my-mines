import React, { useState } from "react";
// import { ChatBox } from "./ChatBox";
import styles from "./Chat.module.css"
import boxStyles from "./Chatbox.module.css";

export const ChatBox = ({ sender, username, message }) => {
    return (
        <div className={sender ? boxStyles.myMessage : boxStyles.enemyMessage}>
            <div className={boxStyles.senderDetail}>
                <div className={boxStyles.senderName}>{username}</div>
            </div>
            <div className={boxStyles.message}>{message}</div>
        </div>
    );
};


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
                            {
                                username: username,
                                message: text.replace(/noob|fuck|stfu|idiot|noobs|fucking|suck|fuckk|retard|fking|fcking|shut up|bitch|trash|fucking|ass|dick|dickhead|boobs|pussy|shit|fuking/gi, '****')
                            },
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
