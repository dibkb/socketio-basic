import express from "express";
import http from "http";
import { Server } from "socket.io";
const app = express();
const server = http.createServer(app);
const io = new Server(httpServer, {
  /* options */
});
io.on("connection", (socket) => {
  console.log("socket", socket);
});
server.listen(8080, () => {
  console.log("Runing on port 8080");
});
