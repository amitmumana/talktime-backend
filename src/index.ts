import express, { Express } from "express";
import { PORT } from "./env";
import { Server, Socket } from "socket.io";
import cors from "cors";

const app: Express = express();
app.use(express.json());
app.use(cors());

const server = app.listen(PORT, () => {
  console.log("app is listening on", PORT);
});

const io = new Server(server);

io.on("connection", (socket: Socket) => {
  socket.on("join", (roomName: string) => {
    const rooms = io.sockets.adapter.rooms;

    if (!rooms.has(roomName)) {
      socket.join(roomName);
      socket.emit("created");
    } else if (rooms.get(roomName)?.size === 1) {
      socket.join(roomName);
      socket.emit("joined");
    } else {
      socket.emit("full");
      console.log("Room is full");
    }
    console.log(rooms);
  });

  socket.on("ready", (roomName) => {
    console.log("ready");
    socket.broadcast.to(roomName).emit("ready");
  });

  socket.on("candidate", (candidate, roomName) => {
    console.log("candidate");
    socket.broadcast.to(roomName).emit("candidate", candidate);
  });

  socket.on("offer", (offer, roomName) => {
    console.log("offer");
    socket.broadcast.to(roomName).emit("candidate", offer);
  });

  socket.on("answer", (answer, roomName) => {
    console.log("answer");
    socket.broadcast.to(roomName).emit("answer", answer);
  });
});
