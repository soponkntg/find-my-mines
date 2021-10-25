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
const Game = require("./models/Game");
const port = parseInt(process.env.PORT, 10) || 3000;

const dev = process.env.NODE_ENV !== "production";
const NextApp = next({ dev });
const handle = NextApp.getRequestHandler();

const server = [];

NextApp.prepare().then(() => {
  io.of("/find-my-mines").on("connection", (socket) => {
    console.log(socket.id);

    socket.on("create-room", (roomName, username) => {
      const game = new Game(roomName);
      game.join(username, socket.id);
      server.push(game);
      socket.join(roomName);
    });

    socket.on("join-game", (roomName, username) => {
      game.join(username, socket.id);
      socket.join(roomName);
    });

    socket.on("disconnecting", () => {
      console.log("discon"); // the Set contains at least the socket ID
    });

    socket.on("disconnect", () => {
      // socket.rooms.size === 0
      console.log("dis");
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
