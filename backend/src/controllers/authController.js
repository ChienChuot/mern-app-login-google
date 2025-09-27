import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const exists = await User.findOne({ username });
    if (exists)
      return res.status(400).json({ message: "Username already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashed });

    res.status(201).json({ message: "Registration successful", user });
  } catch (err) {
    res.status(500).json({ message: "Server error during registration" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid username" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res.json({ message: "Login successful", token,  username: user.username, });
  } catch (err) {
    res.status(500).json({ message: "Server error during login" });
  }
};
