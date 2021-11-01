const next = require("next");
const app = require("express")();
app.use(require("cors")());
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: ["*"],
    methods: ["GET", "POST"],
  },
});
const { v4: uuidv4 } = require("uuid");
const port = parseInt(process.env.PORT, 10) || 3000;

const dev = process.env.NODE_ENV !== "production";
const NextApp = next({ dev });
const handle = NextApp.getRequestHandler();
const { instrument } = require("@socket.io/admin-ui");

let roomList = [];

let interval;

const randomGrid = () => {
  const bombGrid = [];
  const randomBomb = [];
  while (randomBomb.length <= 11) {
    const random = Math.floor(Math.random() * 36) + 1;
    if (randomBomb.indexOf(random) === -1) {
      randomBomb.push(random);
    }
  }
  for (let x = 0; x < 36; x++) {
    if (randomBomb.includes(x)) {
      bombGrid.push({ bomb: true, clickYet: false });
    } else {
      bombGrid.push({ bomb: false, clickYet: false });
    }
  }
  return bombGrid;
};

NextApp.prepare().then(() => {
  io.of("/find-my-mines").on("connection", (socket) => {
    console.log("player join server with id", socket.id);

    socket.on("lobby", () => {
      socket.emit("room-list", roomList);
    });

    socket.on("create-room", (roomName, username) => {
      console.log(
        `${username} with id:${socket.id} create romm with name:${roomName}`
      );
      const roomId = uuidv4();
      socket.join(roomId);
      roomList.push({
        id: roomId,
        roomName: roomName,
        player: [{ id: socket.id, username: username }],
      });
      io.of("/find-my-mines").emit("room-list", roomList);
    });

    socket.on("join-game", (roomId, username) => {
      console.log(
        `${username} with id:${socket.id} join romm with id:${roomId}`
      );
      socket.join(roomId);
      const randomPlayer = Math.floor(Math.random() * 2);
      const bomb = randomGrid();
      roomList.map((room) => {
        if (room.id === roomId) {
          return {
            ...room,
            player: room.player.push({ id: socket.id, username: username }),
          };
        } else {
          return { ...room };
        }
      });
      const game = roomList.filter((room) => {
        return room.id === roomId;
      })[0];
      io.of("/find-my-mines").emit("room-list", roomList);
      setTimeout(() => {
        io.of("/find-my-mines")
          .to(roomId)
          .emit("both-player-ready", {
            ...game,
            bomb: bomb,
            firstPlayer: { ...game.player[randomPlayer], score: 0, win: "" },
            secondPlayer: {
              ...game.player[randomPlayer === 1 ? 0 : 1],
              score: 0,
              win: "",
            },
            bombSymbol: "💣",
            bombFound: 0,
            winner: undefined,
          });
        let timer = 9;
        interval = setInterval(() => {
          if (timer === 0) {
            timer = 10;
            io.of("/find-my-mines").to(roomId).emit("time-out-from-server");
          }
          io.of("/find-my-mines").to(roomId).emit("timer", timer);
          timer -= 1;
        }, 1000);
      }, 3000);
    });

    socket.on("click", (game, index) => {
      clearInterval(interval);
      const hasBomb = game.bomb[index].bomb;
      const whoseTurn =
        socket.id === game.firstPlayer.id ? "firstPlayer" : "secondPlayer";
      game.bomb[index].clickYet = true;
      if (hasBomb) {
        game.bombFound += 1;
        game[whoseTurn].score += 1;
      }
      if (game.bombFound === 11) {
        if (game.firstPlayer.score > game.secondPlayer.score) {
          game.firstPlayer.win += "⭐️";
          game.winner = game.firstPlayer;
        } else if (game.firstPlayer.score < game.secondPlayer.score) {
          game.secondPlayer.win += "⭐️";
          game.winner = game.secondPlayer;
        }
        game.bomb = undefined;
        io.of("/find-my-mines").to(game.id).emit("game-end", game);
      } else {
        io.of("/find-my-mines").to(game.id).emit("change-turn", game);
        let timer = 9;
        interval = setInterval(() => {
          if (timer === 0) {
            timer = 10;
            io.of("/find-my-mines").to(game.id).emit("time-out-from-server");
          }
          io.of("/find-my-mines").to(game.id).emit("timer", timer);
          timer -= 1;
        }, 1000);
      }
    });

    socket.on("new-game", (game) => {
      console.log("new game");
      game.firstPlayer.score = 0;
      game.secondPlayer.score = 0;
      game.winner.score = 0;
      game.bombFound = 0;
      game.bomb = randomGrid();
      if (game.winner.id === game.secondPlayer.id) {
        game.secondPlayer = game.firstPlayer;
        game.firstPlayer = game.winner;
      }
      game.winner = undefined;
      io.of("/find-my-mines").to(game.id).emit("both-player-ready", game);
      let timer = 9;
      interval = setInterval(() => {
        console.log(timer);
        if (timer === 0) {
          timer = 10;
          io.of("/find-my-mines").to(game.id).emit("time-out-from-server");
        }
        io.of("/find-my-mines").to(game.id).emit("timer", timer);
        timer -= 1;
      }, 1000);
    });

    socket.on("reset-score", (game) => {
      game.firstPlayer.score = 0;
      game.secondPlayer.score = 0;
      game.bombFound = 0;
      game.bomb = randomGrid();
      io.of("/find-my-mines").to(game.id).emit("both-player-ready", game);
    });

    socket.on("new-message", (message, id) => {
      io.of("/find-my-mines").to(id).emit("message-from-server", message);
    });

    socket.on("disconnect", () => {
      console.log("dis");
      const index = roomList.findIndex((room) => {
        for (let x of room.player) {
          if (x.id === socket.id) {
            return true;
          }
        }
      });
      if (index !== -1) {
        const roomID = roomList[index].id;
        roomList.splice(index, 1);
        io.of("/find-my-mines").to(roomID).emit("other-player exit");
      }
      io.of("/find-my-mines").emit("room-list", roomList);
    });
  });

  app.get("/get", (req, res) => {
    res.send("helloworld");
  });

  app.all("*", (req, res) => {
    return handle(req, res);
  });

  http.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});

instrument(io, {
  auth: {
    type: "basic",
    username: "admin",
    password: "$2b$10$n/.n3VT3CX8mhlQl/QXCO.dNyswuCWt8LeGVX97e.vFe0XRRqUaUe",
  },
});
