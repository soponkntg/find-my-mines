import React, { useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import Context from "../store";
import styles from "../styles/Game.module.css";
import { BombBox } from "../components/BombBox";
import { Chat } from "../components/Chat";
import { Button } from "../components/Button";

let interval;

export default function GamePLay() {
  const context = useContext(Context);
  const [game, setGame] = useState(undefined);
  const [turn, setTurn] = useState(false);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    context.socket.on("both-player-ready", (roomFromServer) => {
      console.log(roomFromServer);
      setGame(roomFromServer);
      if (roomFromServer.firstPlayer.id === context.socket.id) {
        setTurn(true);
      } else {
        setTurn(false);
      }
    });
    context.socket.on("change-turn", (roomFromServer) => {
      console.log(roomFromServer);
      console.log("changeturn");
      setGame(roomFromServer);
      setTurn((prev) => !prev);
      setTimer(10);
    });
    context.socket.on("game-end", (roomFromServer) => {
      setGame(roomFromServer);
    });
    context.socket.on("other-player exit", () => {
      window.open("about:blank", "_self");
      window.close();
      alert("other play exited");
    });
  }, []);

  const gridClickHandler = (index) => {
    clearInterval(interval);
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
              {turn && <h4>✅ YOUR TURN ✅</h4>}
              {!turn && <h4>❌ OPPONENT TURN ❌</h4>}
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
          {!game.bomb && (
            <div className={styles.restart}>
              {game.winner && <h2>{`winner is ${game.winner.username}`}</h2>}
              {!game.winner && <h2>{`This match is draw`}</h2>}
              <div className={styles.twobtn}>
                <Button
                  onClickHandler={() => {
                    window.open("about:blank", "_self");
                    window.close();
                  }}
                >
                  EXIT!
                </Button>
                <Button onClickHandler={restartGame}>PLAY AGAIN?</Button>
              </div>
            </div>
          )}
          <Chat />
        </>
      )}
    </div>
  );
}
