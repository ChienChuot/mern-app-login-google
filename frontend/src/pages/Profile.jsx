import React, { useState, useContext } from "react";
import { UserContext } from "../components/UserContext";

const Profile = () => {
  const { user, token, setUser } = useContext(UserContext);
  const [form, setForm] = useState({
    email: user?.email || "",
    name: user?.name || "",
    avatar: user?.avatar || "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setMessage("Cập nhật thành công!");
      } else {
        setMessage(data.message || "Có lỗi xảy ra");
      }
    } catch {
      setMessage("Có lỗi xảy ra");
    }
  };

  return (
    <div className="profile-page">
      <h2>Quản lý hồ sơ</h2>
      {form.avatar && (
        <img
          src={form.avatar}
          alt="avatar"
          style={{ width: 80, height: 80, borderRadius: "50%" }}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Tên"
        />
        <input
          name="avatar"
          value={form.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
        />
        <button type="submit">Cập nhật</button>
      </form>
      <a href="/change-password">Đổi mật khẩu</a>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Profile;
