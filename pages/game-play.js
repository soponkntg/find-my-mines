import React, { useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import Context from "../store";
import styles from "../styles/Game.module.css";
import { BombBox } from "../components/BombBox";
import { Chat } from "../components/Chat";
import { Button } from "../components/Button";
import { Music } from "../components/Music";

export default function GamePLay() {
  const context = useContext(Context);
  const [game, setGame] = useState(undefined);
  const [turn, setTurn] = useState(false);
  const [message, setMessage] = useState([]);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    if (!context.socket) {
      window.open("/", "_self");
    }
    context.socket.on("both-player-ready", (roomFromServer) => {
      setGame(roomFromServer);
      setTimer(10);
      if (roomFromServer.firstPlayer.id === context.socket.id) {
        setTurn(true);
      } else {
        setTurn(false);
      }
    });
    context.socket.on("change-turn", (roomFromServer) => {
      setTimer(10);
      setGame(roomFromServer);
      setTurn((prev) => !prev);
    });
    context.socket.on("timer", (time) => {
      setTimer(time);
    });
    context.socket.on("time-out-from-server", (timer) => {
      setTurn((prev) => !prev);
      setTimer(timer);
    });
    context.socket.on("game-end", (roomFromServer) => {
      setTimer("GAME END!");
      setGame(roomFromServer);
    });
    context.socket.on("message-from-server", (newMessage) => {
      setMessage((prev) => [...prev, newMessage]);
    });
    context.socket.on("other-player exit", () => {
      alert("other play exited");
      window.open("/", "_self");
    });
  }, []);

  const gridClickHandler = (index) => {
    context.socket.emit("click", game, index);
  };

  const restartGame = () => {
    context.socket.emit("new-game", game);
  };

  return (
    <div className={styles.center}>
      {!game && (
        <h1
          className={styles.waiting}
        >{`Hello ${context.username}, please wait for other player`}</h1>
      )}
      {game && (
        <>
          <div className={styles.title}>
            <div className={styles.player}>
              <div>{game.firstPlayer.win}</div>
              <h4>{game.firstPlayer.username}</h4>
              <h3>{game.firstPlayer.score}</h3>
            </div>
            <div className={styles.score}>
              {turn && <h4>{`✅ YOUR TURN, ${context.username}✅`}</h4>}
              {!turn && <h4>{`❌ OPPONENT TURN, ${context.username}❌`}</h4>}
              <h3>{timer}</h3>
            </div>
            <div className={styles.player}>
              <div>{game.secondPlayer.win}</div>
              <h4>{game.secondPlayer.username}</h4>
              <h3>{game.secondPlayer.score}</h3>
            </div>
          </div>
          {game.bomb && (
            <div className={styles.container}>
              <div className={styles.grid}>
                {game.bomb.map((elem, index) => {
                  return (
                    <BombBox
                      key={index}
                      onClickHandler={gridClickHandler.bind(null, index)}
                      isDisable={!turn || elem.clickYet}
                      clickYet={elem.clickYet}
                      hasBomb={elem.bomb}
                      bombSymbol={game.bombSymbol}
                    />
                  );
                })}
              </div>
            </div>
          )}
          {!game.bomb && game.winner && (
            <div className={styles.restart}>
              <h2>{`winner is ${game.winner.username}`}</h2>
              <div className={styles.twobtn}>
                <Button
                  onClickHandler={() => {
                    window.open("/", "_self");
                  }}
                >
                  EXIT!
                </Button>
                <Button onClickHandler={restartGame}>PLAY AGAIN?</Button>
              </div>
            </div>
          )}
          <Chat
            message={message}
            username={context.username}
            socket={context.socket}
            id={game.id}
          />
          <div className={styles.bottomright}>
            <Music />
            <Button
              onClickHandler={() => {
                context.socket.emit("reset-score", game);
              }}
            >
              Reset Score
            </Button>
            <Button
              onClickHandler={() => {
                window.open("/", "_self");
              }}
            >
              Exit
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
