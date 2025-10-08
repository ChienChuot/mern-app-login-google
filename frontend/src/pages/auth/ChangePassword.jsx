import React, { useState, useContext } from "react";
import { UserContext } from "../../components/UserContext";
import { authChangePassword } from "../../api/authApi";


const ChangePassword = () => {
  const { token } = useContext(UserContext);
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authChangePassword(form, token);
      if (data.success) {
        setMessage("Đổi mật khẩu thành công!");
        setForm({ oldPassword: "", newPassword: "" });
      } else {
        setMessage(data.message || "Có lỗi xảy ra");
      }
    } catch (err) {
      setMessage("Có lỗi xảy ra");
    }
  };

  return (
    <div className="change-password-page">
      <h3>Đổi mật khẩu</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="oldPassword"
          type="password"
          value={form.oldPassword}
          onChange={handleChange}
          placeholder="Mật khẩu cũ"
        />
        <input
          name="newPassword"
          type="password"
          value={form.newPassword}
          onChange={handleChange}
          placeholder="Mật khẩu mới"
        />
        <button type="submit">Đổi mật khẩu</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ChangePassword;