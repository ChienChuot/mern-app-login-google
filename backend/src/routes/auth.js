import express from 'express';
import { register, login, updateProfile, changePassword, googleLogin } from '../controllers/authController.js';

const router = express.Router();


// Đăng ký, đăng nhập
router.post('/register', register);
router.post('/login', login);
router.post('/google-login', googleLogin);

// Middleware xác thực JWT
import jwt from 'jsonwebtoken';
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Cập nhật thông tin cá nhân
router.put('/profile', authMiddleware, updateProfile);

// Đổi mật khẩu
router.put('/change-password', authMiddleware, changePassword);

// ✅ Route test đơn giản
router.get('/test', (req, res) => {
    res.json({ message: '✅ API is working properly!' });
  });

export default router;
