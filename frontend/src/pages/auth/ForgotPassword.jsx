import { useState } from "react";
import { authForgotPassword } from "../../api/authApi";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleSendReset = async (e) => {
    e.preventDefault();
    try {
      const data = await authForgotPassword(username);
      setMessage(data.message || "✅ Đã gửi yêu cầu đặt lại mật khẩu!");
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Không gửi được yêu cầu");
    }
  };

  return (
    <div className="forgot-password-page">
      <h2>🔐 Quên mật khẩu</h2>
      <form onSubmit={handleSendReset}>
        <input
          type="text"
          placeholder="Tên đăng nhập hoặc email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Gửi yêu cầu đặt lại mật khẩu</button>
      </form>
      {message && <p style={{ marginTop: "1rem", color: "green" }}>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
