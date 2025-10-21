import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const generateToken = async (user) => {
  try {
    if (!user) {
      return new Error("User not found");
    } else {
      const token = jwt.sign({ user: user }, JWT_SECRET, { exiresIn: "1h" });
      return token;
    }
  } catch (error) {
    return new Error("Error generating jwt token", error.message);
  }
};

export const verifyToken = async (token) => {
  try {
    if (!token) {
      return new Error("Token required");
    } else {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    }
  } catch (error) {
    return new Error("Error in verifying token", error.message);
  }
};
