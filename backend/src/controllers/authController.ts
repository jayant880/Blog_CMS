import { Request, Response } from "express";
import User from "../DB/models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ username: username });
    if (!user) return res.status(404).json({ message: "user not found" });

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid)
      return res.status(401).json({ message: "invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      message: "user logged in successfully",
      token,
      user: { id: user._id, username: user.username },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ username: username });
    if (user) return res.status(400).json({ message: "user already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, passwordHash: hashedPassword });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "user registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
