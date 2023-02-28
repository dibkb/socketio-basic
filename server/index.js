import express from "express";
import http from "http";
import { Server } from "socket.io";
const app = express();
const server = http.createServer(app);
let users = [];
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
  socket.on("message", (data) => {
    console.log(data);
    io.emit("messageResponse", data);
  });
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      userName: socket.userName,
    });
  }
  // ---------------broadcast connected users------------------
  socket.broadcast.emit("connectedUsers", users);
  // socket.on("newUser", (data) => {
  //   users.push(data);
  //   console.log(data);
  //   io.emit("newUserResponse", users);
  // });
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    console.log(users);
    users = users.filter((user) => user.userID !== socket.id);
    io.emit("newUserResponse", users);
    socket.disconnect();
  });
});

server.listen(8080, () => {
  console.log("Runing on port 8080");
});
