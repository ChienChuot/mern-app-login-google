import express from 'express';
import axios from 'axios';

const router = express.Router();

// Tên model Gemini bạn muốn sử dụng
const GEMINI_MODEL = 'gemini-2.5-flash-preview-05-20'; 
// Endpoint API của Google. Lưu ý: API Key được truyền qua query parameter.
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

router.post('/', async (req, res) => {
  // Tin nhắn người dùng gửi lên từ frontend
  const { prompt } = req.body; 

  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt in request body.' });
  }
  
  // Lấy API Key từ biến môi trường của bạn
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY; 

  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not set in environment variables.' });
  }
  
  // Cấu trúc payload gửi đến Gemini API
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    
    // Bật Google Search Grounding để AI có thể tìm kiếm thông tin mới
    tools: [{ google_search: {} }],
    
    // Cấu hình hệ thống (tùy chọn) để đặt vai trò cho AI
    systemInstruction: {
      parts: [{ text: "You are a friendly and professional AI assistant for a MERN stack application. Provide concise and accurate answers in Vietnamese." }]
    },
  };

  try {
    // Gọi API Gemini
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${apiKey}`,
      payload,
      {
        // Không cần header Authorization khi dùng API Key qua query
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Trích xuất nội dung phản hồi
    const candidate = response.data.candidates?.[0];
    const aiResponseText = candidate?.content?.parts?.[0]?.text;

    if (aiResponseText) {
      // Gửi lại phản hồi về frontend (ChatBox.jsx)
      res.json({ reply: aiResponseText });
    } else {
      // Trường hợp phản hồi hợp lệ nhưng không có văn bản (ví dụ: bị chặn)
      res.status(500).json({ error: 'AI response was empty or blocked.', details: response.data });
    }

  } catch (err) {
    // Xử lý lỗi kết nối hoặc lỗi API
    console.error('Error calling Gemini API:', err.message);
    res.status(500).json({ error: 'Chatbot error: Could not connect to Google AI.', details: err.message });
  }
});

export default router;
