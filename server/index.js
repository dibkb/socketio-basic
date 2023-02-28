import express from "express";
import http from "http";
import { Server } from "socket.io";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
io.on("connection", (socket) => {
  socket.on("message", (data) => {
    console.log(data);
    socket.emit("messageResponse", data);
  });
});
server.listen(8080, () => {
  console.log("Runing on port 8080");
});
