import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Link from "next/link";
import Background from "../public/bg.jpeg";
import { Room } from "../components/Room";
import styles from "../styles/lobby.module.css";
export default function lobby() {
  const [form, setForm] = useState({ username: "", room_name: "", mode: "" });
  const subbmitRoom = (event) => {
    event.preventDefault();
    alert(`So your name is ${event.target.username.value}`);
  };
  const test = (event) => {
    // setForm({...form, event.target.name : event.target.value})
  };
  console.log(form);

  return (
    <div id="body">
      <body
      // style={{
      //   backgroundImage: `url("https://www.google.com/imgres?imgurl=https%3A%2F%2Fimage.shutterstock.com%2Fimage-vector%2Fcartoon-game-background-260nw-303257369.jpg&imgrefurl=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fcartoon%2Bgame%2Bbackgrounds&tbnid=SJskKHXgXSdFdM&vet=12ahUKEwixjPKyu-TzAhX4_TgGHUejAMoQMygDegUIARDdAQ..i&docid=6qBgGPWzkd7v1M&w=433&h=280&q=background%20for%20game&ved=2ahUKEwixjPKyu-TzAhX4_TgGHUejAMoQMygDegUIARDdAQ")`,
      // }}
      ></body>
      <div style={{ textAlign: "center" }}>
        <img
          src="logo.png"
          style={{ width: "458px", height: "256.94px" }}
        ></img>
      </div>

      <div
        style={{
          width: "1440px",
          height: "40px",
          left: "0px",
          top: "0px",

          background: "#FF8D8D",
        }}
      >
        <h1
          style={{
            position: "absolute",
            width: "99px",
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
            <form onSubmit={subbmitRoom}>
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
              <Link href="/game-play">
                <input type="submit" value="Done"></input>
              </Link>
            </form>
          </div>
        </Popup>
      </div>
      <div id="frame-center">
        <div
          id="frame-for-room"
          style={{
            position: "absolute",
            width: "1296px",
            height: "550px",
            left: "72px",
            top: "434px",
            border: "7px solid #000000",
            boxSizing: "border-box",
          }}
        >
          <Room name="test"></Room>
        </div>
      </div>
    </div>
  );
}
