import mongoose from "mongoose";
import message from "../models/message.js";

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
