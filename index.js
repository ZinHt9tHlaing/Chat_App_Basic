const express = require("express");
const socket = require("socket.io");

const app = express();

// server setup
const PORT = 4000;
let server = app.listen(PORT, () => {
  console.log(`Project is running on http://localhost:${PORT}`);
});

// route setup
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/view/index.html");
});

const io = socket(server);
io.on("connection", (socket) => {
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });
  socket.on("typing", (name) => {
    socket.broadcast.emit("typing", name);
  });
});
