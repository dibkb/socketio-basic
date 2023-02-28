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
io.use((socket, next) => {
  const { username } = socket.handshake.auth;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});
io.on("connection", (socket) => {
  socket.on("send-message", (payload) => {
    console.log(payload);
  });
  socket.on("message", (data) => {
    console.log(data);
  });
});
server.listen(8080, () => {
  console.log("Runing on port 8080");
});
