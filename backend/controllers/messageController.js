import mongoose from "mongoose";
import message from "../models/message.js";
import { io } from "../main.js";

export const messagesBetweenUsers = async (req, res) => {
  try {
    const { sendBy, receivedBy } = req.params;
    const messagesBetweenUsers = await message
      .find({
        $or: [
          {
            sendBy: mongoose.Types.ObjectId(sendBy),
            receivedBy: mongoose.Types.ObjectId(receivedBy),
          },
          {
            sendBy: mongoose.Types.ObjectId(receivedBy),
            receivedBy: mongoose.Types.ObjectId(sendBy),
          },
        ],
      })
      .sort({ createdAt: 1 });

    res.send({
      ok: true,
      messagesBetweenUsers: messagesBetweenUsers,
    });
  } catch (error) {
    res.status(500).json({ message: `${error.message}` });
  }
};

export const newMessage = async (req, res) => {
  const receiverId = req.params.id;
  const myId = req.user._id;
  const text = req.body;
  try {
    const newMess = await message.create({
      sendBy: myId,
      receivedBy: receiverId,
      message: text,
      seen: true,
    });

    io.to("receiverId").emit("newMessage", text);

    res.send({
      ok: true,
      message: newMess,
    });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  }
};
