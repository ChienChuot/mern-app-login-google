import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register); // ✅ Đăng ký
router.post('/login', login);       // ✅ Đăng nhập

// ✅ Route test đơn giản
router.get('/test', (req, res) => {
    res.json({ message: '✅ API is working properly!' });
  });

export default router;
