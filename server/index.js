import express from "express";
import http from "http";
import { Server } from "socket.io";
import { users, addNewUser, removeUser } from "./users.js";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
io.use((socket, next) => {
  const { userName } = socket.handshake.query;
  if (!userName) {
    return next(new Error("invalid username"));
  }
  socket.userName = userName;
  next();
});
io.on("connection", (socket) => {
  console.log("🥂 conncetion extablised");
  // add new user
  addNewUser({ id: socket.id, userName: socket.userName });
  // emit usersList
  io.emit("totalUsers", users);
  socket.on("message", (data) => {
    io.emit("messageResponse", data);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    // remove user from list
    removeUser(socket.id);
    // emit new usersList
    io.emit("totalUsers", users);
    socket.disconnect();
  });
});

server.listen(8080, () => {
  console.log("Runing on port 8080");
});
