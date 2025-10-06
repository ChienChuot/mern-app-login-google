import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/responsive.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="855409445975-a6bl0ii6v3bbr6o0002f2u0nr114ut47.apps.googleusercontent.com">
      <BrowserRouter>
        <UserProvider>
          <App />
        </UserProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
