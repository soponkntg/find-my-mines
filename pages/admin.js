import { useState, useEffect } from "react";
import styles from "../styles/Admin.module.css";
import io from "socket.io-client";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { Input } from "../components/Input";

export default function Admin() {
  const [socketIO, setSocketIO] = useState(null);
  const [clients, setClients] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!socketIO) {
      const socket = io("/find-my-mines");
      setSocketIO(socket);
      socket.on("admin-get-client", (numOfClient) => {
        setClients(numOfClient);
      });
      socket.on("admin", (numOfClient, roomList) => {
        setClients(numOfClient);
        setRooms(roomList);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(rooms);

  const authHandler = () => {
    if (username === "admin" && password === "admin") {
      setOpen(false);
    } else {
      alert("wrong username or password");
    }
  };

  console.log(rooms);
  console.log(clients);

  return (
    <>
      <Modal
        open={open}
        onConfirm={authHandler}
        onClose={() => {}}
        title="LOGIN"
      >
        <div className={styles.auth}>
          <Input
            placeholder="username"
            val={username}
            onChangeHandler={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Input
            placeholder="password"
            type="password"
            val={password}
            onChangeHandler={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </Modal>
      <div className={styles.center}>
        <h1>NUMBER OF CURRENT CLIENTS CONNECTED TO THE SERVER</h1>
        <h3>{clients - 1}</h3>
        <div className={styles["room-container"]}>
          {rooms.map((room) => {
            if (room.player.length === 2) {
              return (
                <Button
                  key={room.id}
                  onClickHandler={() => {
                    socketIO.emit("reset-score-from-server", room.id);
                  }}
                >{`reset ${room.roomName}`}</Button>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}
