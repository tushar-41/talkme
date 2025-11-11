import { Socket } from "socket.io";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      ok: false,
      message: "User not found",
    });
  }
  const isMatched = await bcrypt.compare(password, user.password);
  if (isMatched) {
    console.log(`Password is matched user, welcome ${user.name}`);
    res.json({
      ok: true,
      message: "User Found",
      user: user,
    });
  } else {
    console.log("Password is incorrect");
    res.json({
      ok: false,
      message: "Password is incorrect",
    });
  }
};

const register = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    if (!name || !password || !email)
      return res.send({ ok: false, message: "Incomplete credentials" });

    const isExistingUser = await User.findOne({ email });
    if (isExistingUser)
      return res.send({
        ok: false,
        message: "User already registered with this email",
      });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const token = generateToken(newUser);

    res.send({
      ok: true,
      token: token,
      user: newUser,
    });
  } catch (error) {
    res.send({
      ok: false,
      error: error.message,
    });
  }
};

export default { login, register };
