// hashTest.js
import bcrypt from 'bcrypt';

const run = async () => {
  const newPassword = await bcrypt.hash('he123', 10);
  console.log('Mật khẩu đã mã hóa:', newPassword);
};

run();
