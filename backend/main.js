import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import userRouter from "./routes/userRoutes.js";
import { configDotenv } from "dotenv";
configDotenv();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send({ ok: true });
});

//userRoutes
app.use("/api/auth", userRouter);

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.emit("socketid", socket.id);

  socket.on("ack", (id) => {
    console.log("Acknowledged ID from frontend:", id);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is live at http://localhost:${PORT}`);
});
