import React from "react";

import { Button } from "../components/Button";
import styles from "../Styles/Home.module.css";
import { useRouter } from "next/router";
import { Music } from "../components/Music";


export default function Instruction() {
  const router = useRouter();

  const toHome = () => {
    router.push("/");
  };

  return (
    <div>
      {/* <div style={{ position: "absolute", right: "0" }}>
        <Music />;
      </div> */}
      <div className={styles.center}>
        <h1 style={{ fontSize: "5rem" }}>How to play</h1>
        <div style={{ fontSize: "2rem" }}>
          <item className={styles.txt}>
            <div>1. The first player is randomly selected. 🧑</div>
            <div>
              2. There are 11 bombs randomly placed. 💣
            </div>
            <div>
              3. Each player has only 10 seconds on each turn to choose a slot. ⏲️
            </div>
            <div>4. The more bombs you find, the more points you earn. 💯</div>
          </item>
        </div>
        <item
          style={{
            fontWeight: "bold",
            fontSize: "2rem",
            color: "#8d5a0d",
            marginTop: "60px",
            marginBottom: "60px",
          }}
        >
          <div>Find as many as you can. XD</div>
        </item>
        <Button onClickHandler={toHome}>Back Home 🏠</Button>
      </div>
    </div>
  );
}
