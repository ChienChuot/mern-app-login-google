import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Home from "./pages/home/Home";
import Auth from "./pages/auth/Auth";
import About from "./pages/home/About";
import NotFound from "./pages/home/NotFound";
import Introduce from "./pages/home/Introduce";
import Profile from "./pages/auth/Profile";
import ChangePassword from "./pages/auth/ChangePassword";
import Translate from "./pages/home/Translate";
import ForgotPassword from "./pages/auth/ForgotPassword";


function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/introduce" element={<Introduce />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/translate" element={<Translate />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
