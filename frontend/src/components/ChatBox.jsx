import React, { useState, useEffect, useRef, use } from 'react';
// Nếu bạn đang dùng axios trong dự án MERN, bạn có thể thay thế 'fetch' bằng 'axios'
// import axios from 'axios'; 
import { UserContext } from "./UserContext";
import { useContext } from "react";
function ChatBox({ onClose }) {
    // State để lưu trữ danh sách các tin nhắn {id, text, sender: 'user' | 'ai'}
    const [messages, setMessages] = useState([
        { id: 1, text: "Xin chào! Tôi là trợ lý AI. Tôi có thể giúp gì cho bạn?", sender: 'ai' },
    ]);
     const { user, setUser } = useContext(UserContext);
    // State cho nội dung đang nhập
    const [input, setInput] = useState('');
    
    // State để hiển thị trạng thái đang chờ phản hồi từ AI
    const [isTyping, setIsTyping] = useState(false); 

    // Ref để tự động cuộn xuống cuối cùng
    const messagesEndRef = useRef(null);

    // Hàm tự động cuộn xuống cuối
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Gọi hàm cuộn mỗi khi danh sách tin nhắn thay đổi
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    // Hàm xử lý gửi tin nhắn
    const handleSend = async (e) => {
        e.preventDefault(); 
       
        
        const messageText = input.trim();
        if (messageText === '') return;

        const newUserMessage = { 
            id: Date.now(), 
            text: messageText, 
            sender: 'user' 
        };

        // 1. Thêm tin nhắn của người dùng vào danh sách
        setMessages((prevMessages) => [...prevMessages, newUserMessage]);
        setInput('');

        // 2. Hiển thị trạng thái đang gõ
        setIsTyping(true);

        // 3. Gọi API Backend (Sử dụng fetch, bạn có thể thay bằng axios nếu muốn)
        try {
            // Thay thế '/api/chat' bằng endpoint Express của bạn
            const response = await fetch('/api/chat', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: messageText }),
            });

            if (!response.ok) {
                throw new Error('Phản hồi mạng không thành công');
            }

            const data = await response.json();
            
            // 4. Thêm phản hồi của AI vào danh sách
            const newAiMessage = { 
                id: Date.now() + 1, 
                text: data.reply || "Xin lỗi, tôi không thể trả lời câu hỏi này.", 
                sender: 'ai' 
            };
            setMessages((prevMessages) => [...prevMessages, newAiMessage]);

        } catch (error) {
            console.error("Lỗi khi gọi API AI:", error);
            const errorMessage = { 
                id: Date.now() + 1, 
                text: "Có lỗi xảy ra khi kết nối với AI.", 
                sender: 'ai' 
            };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        } finally {
            // 5. Tắt trạng thái đang gõ
            setIsTyping(false);
        }
    };

    return (
        <div className="chat-box-inner">
            <div className="chat-header">
                <h3>Xin chào!
                     {typeof user === "string" ? user : user?.name || user?.username}

                </h3>
                <button className="close-chat" onClick={onClose}>Tắt Chat</button>
            </div>
            
            {/* Khu vực hiển thị lịch sử tin nhắn */}
            <div className="message-list-container">
                {messages.map((msg) => (
                    <div 
                        key={msg.id} 
                        className={`message-bubble ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}
                    >
                        <span className="sender-label">
                           {msg.sender === 'user' ? 'Bạn' : 'AI'}
                        </span>
                        <p className="message-text">{msg.text}</p>
                    </div>
                ))}
                
                {/* Trạng thái đang gõ */}
                {isTyping && (
                    <div className="message-bubble ai-message typing-indicator">
                        <span className="sender-label">AI</span>
                        <p className="message-text">...</p>
                    </div>
                )}
                
                {/* Anchor cuộn */}
                <div ref={messagesEndRef} />
            </div>

            {/* Khu vực nhập liệu */}
            <form onSubmit={handleSend} className="input-area">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    className="chat-input"
                    disabled={isTyping}
                />
                <button type="submit" className="send" disabled={isTyping || input.trim() === ''}>
                    Gửi
                </button>
            </form>
        </div>
    );
}

export default ChatBox;
