import mongoose from "mongoose";
import message from "../models/message.js";
import { io, userSocketMap } from "../main.js";
import User from "../models/user.js";
import Message from "../models/message.js";

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

export const getSidebarUsers = async (req, res) => {
  const userId = req.user._id;
  const filteredUser = User.find({ _id: { $ne: userId } }).select("-password");
  const unseenMessages = {};

  const promises = filteredUser.map(async (user) => {
    const messages = await Message.find({
      sendBy: user,
      receivedBy: userId,
      seen: false,
    });
    if (messages.length > 0) {
      unseenMessages[user] = messages.length;
    }
  });
  await Promise.all(promises);

  res.send({
    ok: true,
    user: filteredUser,
    unseenMessages,
  });
};

export const newMessage = async (req, res) => {
  const receiverId = req.params.receiverId;
  const myId = req.user._id;
  const text = req.body;
  try {
    const newMess = await message.create({
      sendBy: myId,
      receivedBy: receiverId,
      message: text,
    });

    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMess);
    }

    res.send({
      ok: true,
      message: newMess,
    });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  }
};
