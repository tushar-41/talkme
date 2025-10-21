import express from "express";
import messageController from "../controllers/messageController.js";

const messageRouter = express.Router();

router.get("/:sendBy/:receivedBy", messageController.getMessagesBetweenUsers);

export default messageRouter;
