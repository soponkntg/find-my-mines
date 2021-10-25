import React, { useContext, useState, useEffect } from "react";
import { Grid } from "../components/Grid";
import io from "socket.io-client";
import Context from "../store";

const ROOM_NAME = "test_room";
const USERNAME = "GU SO";

export default function GamePLay() {
  const { socket } = useContext(Context);
  useEffect(() => {
    socket.emit("join-game", ROOM_NAME, USERNAME);
  }, []);

  return <Grid />;
}
