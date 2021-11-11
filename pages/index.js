import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Logo } from "../components/Logo";
import { useRouter } from "next/router";
import Context from "../store";
import io from "socket.io-client";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const context = useContext(Context);

  useEffect(() => {
    const socket = io("/find-my-mines");
    context.setSocket(socket);
  }, []);

  const toHTW = () => {
    router.push("/instruction");
  };

  const toBegin = () => {
    if (username === "") {
      alert("please fill in your username");
      return;
    }
    context.setUsername(username);
    router.push("/lobby");
  };
  console.log(username);

  return (
    <div>
      <div className={styles.center}>
        <Logo />
        <h2 style={{ fontSize: "2rem", marginBottom: "60px" }}>
          Do you mind? to Find My Mines
        </h2>
        <Input
          type="text"
          placeholder="Enter Username"
          align="center"
          fontWeight="bold"
          val={username}
          onChangeHandler={(e) => {
            setUsername(e.target.value);
          }}
        />
        <div className={styles["btn-container"]}>

          <Button onClickHandler={toBegin}>Begin 🔥</Button>
          <Button onClickHandler={toHTW}>How to play ❓</Button>
        </div>

      </div>
    </div>
  );
}
