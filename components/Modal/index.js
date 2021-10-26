import React from "react";
import styles from "./Modal.module.css";
import { Button } from "../Button";

const Backdrop = ({ onClose }) => {
  return <div className={styles.backdrop} onClick={onClose} />;
};

export const Modal = ({ children, onConfirm, onClose, title, open }) => {
  if (open) {
    return (
      <>
        <Backdrop onClose={onClose} />
        <div className={styles.modal}>
          <header className={styles.header}>
            <h2>{title}</h2>
          </header>
          <div className={styles.content}>{children}</div>
          <footer className={styles.actions}>
            <Button onClick={onConfirm}>Okay</Button>
          </footer>
        </div>
      </>
    );
  } else {
    return null;
  }
};
