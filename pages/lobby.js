import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Link from "next/link";
import { Room } from "../components/Room";
import styles from "../styles/lobby.module.css";

export default function Lobby() {
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
          backgroundImage: `url("https://images04.military.com/sites/default/files/styles/full/public/2020-01/F15E-drops-bombs-afghanistan-1800.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></body>

      <div>
        <img src="logo_black.png" className={styles.logo}></img>
      </div>

      <br></br>
      <div id="Lobby label" className={styles.lobby_label}>
        <p className={styles.lobby_word}>lobby</p>
      </div>
      <br></br>
      <div id="button-popup" style={{ textAlign: "center" }}>
        <Popup
          trigger={
            <button className={styles.create_room}> Create a room</button>
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
              <a href="game-play">Done</a>
            </form>
          </div>
        </Popup>
      </div>
      <div id="frame-center" style={{}}>
        <div
          id="frame-for-room"
          style={{
            alignItems: "center",
          }}
          className={styles.frame_room}
        >
          <Room name="test"></Room>
        </div>
      </div>
      <br></br>
    </div>
  );
}
