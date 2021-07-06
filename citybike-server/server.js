const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const citybikeurl = "http://api.citybik.es/v2/networks/decobike-miami-beach";

const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();

app.use(index);

const server = http.createServer(app);
const io = socketIo(server); // < Interesting!
let interval = 3000;
let history = [];
let activeHistoryMode = false;

io.on("connection", (socket) => {
  var socketId = socket.id;
  var clientIp = socket.request.connection.remoteAddress;
  console.log("New connection " + socketId + " from " + clientIp);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  emitData(socket);
  setInterval(() => {
    if (!activeHistoryMode) {
      emitData(socket);
    }
  }, interval);

  socket.on("active-history", (activeHistory) => {
    activeHistoryMode = activeHistory;
  });

  socket.on("view-history", () => {
    socket.emit("history", history);
  })
});

function emitData(socket) {
  axios
    .get(citybikeurl)
    .then((res) => {
      socket.emit("city-data", res.data.network);

      if (history.length >= 0 && history.length < 10) {
        history.push(res.data.network);
      } else {
        history.shift();
        history.push(res.data.network);
      }
    })
    .catch((err) => console.log(err.message));
}

server.listen(port, () => console.log(`Listening on port ${port}`));
