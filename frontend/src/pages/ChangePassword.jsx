import React, { useState, useContext } from 'react';
import { UserContext } from '../components/UserContext';

const ChangePassword = () => {
  const { token } = useContext(UserContext);
  const [form, setForm] = useState({ oldPassword: '', newPassword: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Đổi mật khẩu thành công!');
        setForm({ oldPassword: '', newPassword: '' });
      } else {
        setMessage(data.message || 'Có lỗi xảy ra');
      }
    } catch {
      setMessage('Có lỗi xảy ra');
    }
  };

  return (
    <div>
      <h3>Đổi mật khẩu</h3>
      <form onSubmit={handleSubmit}>
        <input name="oldPassword" type="password" value={form.oldPassword} onChange={handleChange} placeholder="Mật khẩu cũ" />
        <input name="newPassword" type="password" value={form.newPassword} onChange={handleChange} placeholder="Mật khẩu mới" />
        <button type="submit">Đổi mật khẩu</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ChangePassword;
