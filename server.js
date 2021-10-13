const express = require("express");
const { createServer } = require("http");
const next = require("next");
const port = 3000;

const dev = process.env.NODE_ENV !== "production";
const NextApp = next({ dev });
const handle = NextApp.getRequestHandler();

NextApp.prepare().then(() => {
  const app = express();
  const server = createServer(app);

  app.get("/get", (req, res) => {
    res.send("helloworld");
  });

  app.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
