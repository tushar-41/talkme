import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import userRouter from "./routes/userRoutes.js";
import "dotenv/config";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

//For the error cacthing of the controller functions
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/talkme");
    console.log("Database is connected");
  } catch (err) {
    console.error("Unable to connect to database:", err);
  }
}
main();

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send({ ok: true });
});

//userRoutes
app.use("/api/auth", userRouter);

export const userSocketMap = {}; //{userId : socketId}

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", (id) => {
    console.log("user disconnected" + userId);
    delete userSocketMap[userId];

    io.emit("getOnlineUsers", Object, keys(userSocketMap));
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is live at http://localhost:${PORT}`);
});
