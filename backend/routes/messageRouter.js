import express from "express";
import messageController from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get(
  "/:sendBy/:receivedBy",
  messageController.messageBetweenUsers
);
messageRouter.post("/:receiverId", messageController.newMessage);

export default messageRouter;
