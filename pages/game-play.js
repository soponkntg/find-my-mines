import React, { useEffect } from "react";
import { Grid } from "../components/Grid";
import io from "socket.io-client";

const ROOM_NAME = "test_room";
const USERNAME = "GU SO";

export default function GamePLay() {
  useEffect(() => {
    const socket = io("/find-my-mines");
    socket.emit("join-game", ROOM_NAME, USERNAME);
  }, []);

  return <Grid />;
}
