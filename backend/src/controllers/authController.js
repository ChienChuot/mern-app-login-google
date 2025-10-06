import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
  // 👉 Log dữ liệu nhận được từ frontend
  console.log("Login request body:", req.body);
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid username" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
  expiresIn: "1d",
});

    res.json({ message: "Login successful", token, username: user.username });
  } catch (err) {
    res.status(500).json({ message: "Server error during login" });
  }
};

export const googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const username = payload.name;

    // Tùy bạn: lưu vào DB nếu chưa có, tạo JWT nếu cần
    const jwtToken = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.json({ username, token: jwtToken, message: '✅ Google Login thành công!' });
  } catch (err) {
    res.status(401).json({ message: '❌ Token Google không hợp lệ' });
  }
};

// Cập nhật thông tin cá nhân
export const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { email, name, avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { email, name, avatar },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile" });
  }
};

// Đổi mật khẩu
export const changePassword = async (req, res) => {
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(401).json({ message: "Old password incorrect" });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error changing password" });
  }
};

// Quên mật khẩu
export const forgotPassword = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Tạo token đặt lại mật khẩu (có thể dùng JWT hoặc mã ngẫu nhiên)
    const resetToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '15m' });

    // Gửi email chứa link đặt lại mật khẩu (bạn cần cấu hình dịch vụ email)
    // Ví dụ: http://your-frontend-url/reset-password?token=resetToken
    console.log(`Reset password link: http://your-frontend-url/reset-password?token=${resetToken}`);

    res.json({ message: "Password reset link has been sent to your email." });
  } catch (err) {
    res.status(500).json({ message: "Error processing forgot password" });
  }
};