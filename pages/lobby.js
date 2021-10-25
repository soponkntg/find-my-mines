import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Link from "next/link";
import { Room } from "../components/Room";
import styles from "../styles/lobby.module.css";
import Image from "next/image";
import Logo from "../public/logo_black.png";

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
    <div className={styles.center}>
      <Image src={Logo} alt="Logo" width={400} height={220} />

      <Popup
        trigger={<button className={styles.create_room}> Create a room</button>}
        position="right center"
      >
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
      </Popup>
      <br></br>
    </div>
  );
}
