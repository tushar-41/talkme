import jwt from "jsonwebtoken";
import User from "../models/user";

export const protectedRoute = async (req, res) => {
  const token = req.headers.token;
  if (!token) return res.send({ message: "Token not found in header" });
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const userId = decoded.userId;
  const user = await User.findOne({ _id: userId });
  if (user) {
    req.user = user;
  }
  next();
};

export const checkAuth = (req, res) => {
  res.send({ success: true, user: req.user });
};
