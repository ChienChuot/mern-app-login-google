import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../../components/UserContext";
import { authLogin, authRegister } from "../../api/authApi";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = isLogin
        ? await authLogin(username, password)
        : await authRegister(username, password);

      setMessage(data.message);

      if (isLogin && data.username) {
        localStorage.setItem("token", data.token || "");
        localStorage.setItem("username", data.username);
        setUser(data.username);
        setTimeout(() => navigate("/"), 1000);
      } else {
        setTimeout(() => {
          setIsLogin(true);
          setMessage("🎉 Đăng ký thành công! Mời bạn đăng nhập.");
        }, 1500);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Có lỗi xảy ra");
    }
  };

  const handleGoogleLogin = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const googleUsername = decoded.name;

      if (googleUsername) {
        localStorage.setItem("username", googleUsername);
        setUser(googleUsername);
        setMessage(`🎉 Đăng nhập Google thành công! Xin chào ${googleUsername}`);
        setTimeout(() => navigate("/"), 1000);
      } else {
        setMessage("❌ Không lấy được tên từ Google");
      }
    } catch (error) {
      setMessage("❌ Google Login thất bại");
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="auth-page">
      <h2>{isLogin ? "Đăng nhập" : "Đăng ký"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? "Đăng nhập" : "Đăng ký"}</button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
        </button>
      </p>

      <div style={{ marginTop: "1rem" }}>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => setMessage("❌ Google Login thất bại")}
        />
      </div>

      <p style={{ marginTop: "1rem" }}>
        <button onClick={handleForgotPassword}>🔐 Quên mật khẩu?</button>
      </p>

      {message && <p style={{ marginTop: "1rem", color: "green" }}>{message}</p>}
    </div>
  );
}

export default Auth;
