import express from "express";
import { wrapAsync } from "../utils/wrapAsync.js";
import { protectedRoute } from "../utils/middleware.js";
import {
  messagesBetweenUsers,
  newMessage,
  getSidebarUsers,
} from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get(
  "/getUserForSideaBar",
  protectedRoute,
  wrapAsync(getSidebarUsers)
);
messageRouter.get(
  "/:receivedId",
  protectedRoute,
  wrapAsync(messagesBetweenUsers)
);
messageRouter.post("/send/:receiverId", protectedRoute, wrapAsync(newMessage));

export default messageRouter;
