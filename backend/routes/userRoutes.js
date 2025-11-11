import express from "express";
import { login, register } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/signup", register);
userRouter.post("/login", login);

export default userRouter;
