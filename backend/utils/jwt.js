import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY || "supersecret";

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
