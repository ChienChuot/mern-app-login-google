import express from 'express';
import axios from 'axios';

const router = express.Router();

// POST /api/translate
router.post('/translate', async (req, res) => {
  const { text, direction } = req.body;
  let source, target;
  if (direction === 'ja-vi') {
    source = 'ja'; target = 'vi';
  } else {
    source = 'vi'; target = 'ja';
  }
  try {
    // Sử dụng Google Translate API miễn phí (unofficial, public endpoint)
    const response = await axios.get('https://translate.googleapis.com/translate_a/single', {
      params: {
        client: 'gtx',
  sl: source,
  tl: target,
        dt: 't',
        q: text,
      },
    });
    // Kết quả dịch nằm ở response.data[0][0][0]
    const translated = response.data[0][0][0];
    res.json({ result: translated });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi dịch thuật', error: err.message });
  }
});

export default router;
