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
const users = [];

io.on("connection", (socket) => {
  console.log("🥂 conncetion extablised");
  socket.on("message", (data) => {
    console.log(data);
    io.emit("messageResponse", data);
  });
  const { userName } = socket.handshake.query;
  console.log(userName);
  // socket.on("newUser", (data) => {
  //   users.push(data);
  //   console.log(data);
  //   io.emit("newUserResponse", users);
  // });
  // socket.on("disconnect", () => {
  //   console.log("🔥: A user disconnected");
  //   console.log(users);
  //   // users = users.filter((user) => user.socketID !== socket.id);
  //   io.emit("newUserResponse", users);
  //   socket.disconnect();
  // });
});

server.listen(8080, () => {
  console.log("Runing on port 8080");
});
