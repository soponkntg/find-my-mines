import React, { useContext, useEffect, useState } from "react";
import { Room } from "../components/Room";
import { Logo } from "../components/Logo";
import styles from "../styles/Lobby.module.css";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { Input } from "../components/Input";
import { useRouter } from "next/router";
import { Music } from "../components/Music";


import Context from "../store";

export default function Lobby() {
  const [roomName, setRoomName] = useState("");
  const [modal, setModal] = useState(false);
  const [roomList, setRoomList] = useState([]);
  const router = useRouter();
  const context = useContext(Context);

  useEffect(() => {
    if (!context.socket) {
      window.open("/", "_self");
    }
    context.socket.emit("lobby");
    context.socket.on("room-list", (roomlst) => {
      setRoomList(roomlst);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeModal = () => {
    setModal(false);
  };

  const createRoom = () => {
    context.socket.emit("create-room", roomName, context.username);
    context.setRoomName(roomName);
    setModal(false);
    router.push("game-play");
  };

  const joinRoom = (room) => {
    if (room.player.length === 2) {
      alert("This room is full");
      return;
    }
    context.setRoomName(room.roomName);
    context.socket.emit("join-game", room.id, context.username);
    router.push("game-play");
  };
  return (
    <div>

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
          {roomList.map((room, index) => (
            <Room
              key={index}
              roomName={room.roomName}
              player={room.player.length}
              onClickHandler={joinRoom.bind(null, room)}
            />
          ))}
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
    </div>
  );
}
