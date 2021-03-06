import React, { useState, useEffect } from "react";
import { Socket } from "socket.io-client";

const Context = React.createContext({
  socket: null,
  setSocket: () => {},
  username: "",
  setUsername: () => {},
  roomName: "",
  setRoomName: () => {},
  roomId: null,
  setRoomId: () => {},
});

export const ContextProvider = (props) => {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState(null);

  return (
    <Context.Provider
      value={{
        socket: socket,
        setSocket: setSocket,
        username: username,
        setUsername: setUsername,
        roomName: roomName,
        setRoomName: setRoomName,
        roomId: roomId,
        setRoomId: setRoomId,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Context;
