import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Link from "next/link";
import { Room } from "../components/Room";
import styles from "../styles/lobby.module.css";
export default function lobby() {
  const [form, setForm] = useState({ username: "", room_name: "", mode: "" });
  const submitRoom = (event) => {
    event.preventDefault();
    // alert(`So your name is ${event.target.username.value}`);
  };
  const test = (event) => {
    // setForm({...form, event.target.name : event.target.value})
  };
  console.log(form);

  return (
    <div id="body">
      <body
        style={{
          backgroundImage: `url("https://p1.pxfuel.com/preview/388/463/722/skydiving-jump-falling-parachuting.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      ></body>

      <div style={{ textAlign: "center" }}>
        <img
          src="logo.png"
          style={{ width: "458px", height: "256.94px" }}
        ></img>
      </div>

      <div
        style={{
          width: "100%",
          height: "40px",
          left: "0px",
          top: "0px",
          background: "#FF8D8D",

        }}
      >
        <h1
          style={{
            position: "absolute",
            height: "42px",
            left: "136px",
            top: "240px",
            color: "#000000",
          }}
        >
          lobby
        </h1>
      </div>
      <br></br>
      <div id="button-popup" style={{ textAlign: "center" }}>
        <Popup
          trigger={
            <button
              style={{
                width: "227px",
                height: "60px",
                left: "72px",
                top: "359px",

                background: "#968DFF",
                borderRadius: "14px",
              }}
            >
              {" "}
              Create a room
            </button>
          }
          position="right center"
        >
          <div>
            <form onSubmit={submitRoom}>
              <span>Username</span>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={(e) => {
                  setForm({ ...form, username: e.target.value });
                }}
              ></input>
              <br></br>
              <span>Room name</span>
              <input
                type="text"
                name="room_name"
                value={form.room_name}
                onChange={(e) => {
                  setForm({ ...form, room_name: e.target.value });
                }}
              ></input>
              <br></br>
              <span>Mode</span>
              <br></br>
              <select
                name="mode"
                value={form.mode}
                onChange={(e) => {
                  setForm({ ...form, mode: e.target.value });
                }}
              >
                <option value="6x6">6x6</option>
                <option value="12x12">12x12</option>
              </select>
              <br></br>
              <a href="game-play">
                Done
              </a>
            </form>
          </div>
        </Popup>
      </div>
      <div id="frame-center" style={{}}>
        <div
          id="frame-for-room"
          style={{
            alignItems: 'center'
          }}
          className={styles.frame_room}
        >
          <Room name="test" ></Room>
        </div>
      </div>
    </div>
  );
}
