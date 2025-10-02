import express from 'express';
import axios from 'axios';

const router = express.Router();

// POST /api/translate
router.post('/translate', async (req, res) => {
  const { text, direction } = req.body;
  let source, target;

  // Sửa lại logic điều hướng ngôn ngữ
  switch (direction) {
    case 'ja-vi':
      source = 'ja';
      target = 'vi';
      break;
    case 'vi-ja':
      source = 'vi';
      target = 'ja';
      break;
    case 'en-vi':
      source = 'en';
      target = 'vi';
      break;
    case 'vi-en':
      source = 'vi';
      target = 'en';
      break;
    default:
      return res.status(400).json({ message: 'Hướng dịch không hợp lệ' });
  }

  try {
    const response = await axios.get('https://translate.googleapis.com/translate_a/single', {
      params: {
        client: 'gtx',
        sl: source,
        tl: target,
        dt: 't',
        q: text,
      },
    });

    const translated = response.data[0][0][0];
    res.json({ result: translated });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi dịch thuật', error: err.message });
  }
});

export default router;
