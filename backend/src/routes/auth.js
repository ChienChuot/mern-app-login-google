import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { register, login, updateProfile, changePassword, googleLogin,
  forgotPassword } from '../controllers/authController.js';

const router = express.Router();

// Đăng ký, đăng nhập
router.post('/register', register);
router.post('/login', login);
router.post('/google-login', googleLogin);

// Cập nhật thông tin cá nhân
router.put('/profile', authMiddleware, updateProfile);

// Đổi mật khẩu
router.put('/change-password', authMiddleware, changePassword);


// Quên mật khẩu
router.post('/forgot-password', forgotPassword);


// ✅ Route test đơn giản
router.get('/test', (req, res) => {
    res.json({ message: '✅ API is working properly!' });
  });

export default router;


