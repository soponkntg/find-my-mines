import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Link from "next/link";
import { Room } from "../components/Room";
import { Logo } from "../components/Logo";
import styles from "../styles/lobby.module.css";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { Input } from "../components/Input";
import { useRouter } from "next/router";

export default function Lobby() {
  const [roomName, setRoomName] = useState("");
  const [modal, setModal] = useState(false);
  const router = useRouter();

  const closeModal = () => {
    setModal(false);
  };

  const createRoom = () => {
    setModal(false);
  };

  const joinRoom = (roomName) => {
    console.log(roomName);
    router.push("game-play");
  };
  return (
    <div className={styles.center}>
      <Logo />
      <Button
        onClickHandler={() => {
          setModal(true);
        }}
      >
        Create a room
      </Button>
      <div className={styles["room-container"]}>
        <Room
          roomName={"room1"}
          playes={"2"}
          onClickHnadler={joinRoom.bind(null, "room1")}
        />
        <Room
          roomName={"room2"}
          playes={"2"}
          onClickHnadler={joinRoom.bind(null, "room2")}
        />
        <Room
          roomName={"room3"}
          playes={"2"}
          onClickHnadler={joinRoom.bind(null, "room3")}
        />
      </div>

      <Modal
        open={modal}
        onClose={closeModal}
        onConfirm={createRoom}
        title="Create Room"
      >
        <div className={styles["room-name-input"]}>
          <span>Room name</span>
          <Input
            type="text"
            name="room_name"
            val={roomName}
            onChangeHandler={(e) => {
              setRoomName(e.target.value);
            }}
          />
        </div>
      </Modal>
    </div>
  );
}
