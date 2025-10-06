import Header from "./Header";
import Footer from "./Footer";
import { UserProvider } from "../UserContext";

function Layout({ children }) {
  return (
    <div
      className="app-wrapper"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <UserProvider>
        <Header />
        <main className="main-content" style={{ flex: 1, padding: "1rem" }}>
          {children}
        </main>
        <Footer />
      </UserProvider>
    </div>
  );
}

export default Layout;
