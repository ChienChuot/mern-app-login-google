import Header from "./Header";
import Footer from "./Footer";
import ChatBox from "../ChatBox";
import { UserProvider } from "../UserContext";
import { useState } from "react";
// Import icon nếu cần, ví dụ: import { MessageSquare } from 'lucide-react';

function Layout({ children }) {
  // Giữ trạng thái ban đầu là true để chatbox mặc định mở (hoặc đổi thành false nếu muốn mặc định đóng)
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="app-wrapper">
      <UserProvider>
        <Header />
        
        {/* NÚT NỔ MỞ CHATBOX - Chỉ hiển thị khi showChat là false */}
        {!showChat && (
            <button 
                className="chat-button" 
                onClick={() => setShowChat(true)} 
                title="Mở Chat AI"
            >
                {/* Dùng emoji hoặc icon */}
                💬AI 
                {/* <MessageSquare size={24} /> */}
            </button>
        )}

        <div className={`chat-wrapper ${showChat ? "chat-active" : ""}`}>
          {showChat && (
            <div className="chat-box">
              {/* Nút Tắt Chat sẽ gọi setShowChat(false) */}
              <ChatBox onClose={() => setShowChat(false)} /> 
            </div>
          )}
          <main className="main-content">
            {children}
          </main>
        </div>

        <Footer />
      </UserProvider>
    </div>
  );
}

export default Layout;