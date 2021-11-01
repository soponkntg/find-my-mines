const next = require("next");
const app = require("express")();
app.use(require("cors")());
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const { v4: uuidv4 } = require("uuid");
const port = parseInt(process.env.PORT, 10) || 3000;

const dev = process.env.NODE_ENV !== "production";
const NextApp = next({ dev });
const handle = NextApp.getRequestHandler();

let roomList = [
  {
    id: uuidv4(),
    roomName: "testeiei",
    player: [
      { id: "sdkfj", username: "so", score: 0 },
      { id: "sdkfasda", username: "mick", score: 0 },
    ],
  },
];

const randomGrid = () => {
  const bombGrid = [];
  const randomBomb = [];
  while (randomBomb.length <= 6) {
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
            turn: randomPlayer,
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
      }, 3000);
    });

    socket.on("click", (game, index) => {
      const hasBomb = game.bomb[index].bomb;
      const whoseTurn =
        socket.id === game.firstPlayer.id ? "firstPlayer" : "secondPlayer";
      game.bomb[index].clickYet = true;
      if (hasBomb) {
        game.bombFound += 1;
        game[whoseTurn].score += 1;
      }
      if (game.bombFound === 6) {
        if (game.firstPlayer.score > game.secondPlayer.score) {
          game.firstPlayer.win += "⭐️";
          game.winner = game.firstPlayer;
        } else if (game.firstPlayer.score < game.secondPlayer.score) {
          game.secondPlayer.win += "⭐️";
          game.winner = game.secondPlayer;
        } else {
          game.winner = undefined;
        }
        game.bomb = undefined;
        game.firstPlayer.score = 0;
        game.secondPlayer.score = 0;
        io.of("/find-my-mines").to(game.id).emit("game-end", game);
      } else {
        io.of("/find-my-mines").to(game.id).emit("change-turn", game);
      }
      console.log(game);
      console.log("------------------------------------------------------");
    });

    socket.on("new-game", (game) => {
      console.log("new game");
      const randomPlayer = Math.floor(Math.random() * 2);
      game.bomb = randomGrid();
      game.turn = randomPlayer;
      game.winner = undefined;
      game.firstPlayer =
        randomPlayer === 0 ? game.firstPlayer : game.secondPlayer;
      game.secondPlayer =
        randomPlayer === 0 ? game.secondPlayer : game.firstPlayer;
      io.of("/find-my-mines").to(game.id).emit("both-player-ready", game);
    });

    socket.on("timeout", (game) => {
      console.log(game);
      io.of("/find-my-mines").to(game.id).emit("change-turn", game);
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
      const roomID = roomList[index].id;
      io.of("/find-my-mines").to(roomID).emit("other-player exit");
      if (index !== -1) {
        roomList.splice(index, 1);
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
