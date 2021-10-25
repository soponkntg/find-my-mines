import React, { useState, useEffect } from "react";
import { Socket } from "socket.io-client";

const Context = React.createContext({
  socket: null,
  setSocket: () => {},
  username: "",
  setUsername: () => {},
});

export const ContextProvider = (props) => {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");

  return (
    <Context.Provider
      value={{
        socket: socket,
        setSocket: setSocket,
        username: username,
        setUsername: setUsername,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Context;
