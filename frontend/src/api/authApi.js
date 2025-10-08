import axios from "axios";


export const authLogin = async (username, password) => {
  const res = await axios.post("/api/login", { username, password });
  return res.data;
};


export const authRegister = async (username, password) => {
  const res = await axios.post("/api/register", { username, password });
  return res.data;
};


export const authForgotPassword = async (username) => {
  const res = await axios.post("/api/forgot-password", { username });
  return res.data;
};




export const authChangePassword = async (form, token) => {
  try {
    const res = await axios.put("/api/auth/change-password", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};


