import React from "react";
import styles from "./Chat.module.css";

export const ChatBox = () => {
  return (
    <div className={styles.chatBox}>
      <div className={styles.myMessage}>
        <div className={styles.senderDetail}>
          <div className={styles.senderName}>Player1</div>
          <div className={styles.sendTime}>18:59</div>
        </div>
        <div className={styles.message}>
          Hello, I am player 1. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. In tempus odio a ullamcorper facilisis. Nullam
          sodales blandit arcu id imperdiet. Nullam pulvinar risus quam, at
          porttitor ex varius at. Nunc imperdiet congue ligula, eget auctor nisi
          pretium eget. In imperdiet enim id ex varius mollis. Pellentesque
          placerat lacinia mi vitae posuere. Sed interdum magna a sodales
          sodales. In ac mollis odio. Vivamus venenatis aliquet enim. In hac
          habitasse platea dictumst. Sed in sollicitudin elit. Donec tempus
          dolor ac tempor lacinia. Duis fermentum pulvinar sapien id vulputate.
          Morbi faucibus viverra est, sit amet finibus nisi egestas ac.
        </div>
      </div>
      <div className={styles.enemyMessage}>
        <div className={styles.senderDetail}>
          <div className={styles.senderName}>Player2</div>
          <div className={styles.sendTime}>19:07</div>
        </div>
        <div className={styles.message}>
          Hello, I am player 2. Suspendisse vitae nisi tincidunt, commodo elit
          sed, vehicula velit. Suspendisse potenti. Sed ut rutrum risus, quis
          fringilla mauris. Mauris semper felis et libero scelerisque venenatis.
          Praesent gravida cursus cursus. Etiam vulputate, neque at vestibulum
          egestas, nunc felis porttitor lectus, eu condimentum dui metus ut
          augue. Quisque laoreet ac odio eget congue. Proin at quam vel dolor
          mollis blandit vel ac felis. Proin euismod quis purus ac facilisis.
          Quisque eu sodales mi. Nulla laoreet mi in sem convallis eleifend.
        </div>
      </div>
    </div>
  );
};
