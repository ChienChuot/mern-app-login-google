import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../components/UserContext";

function Header() {
  const { user, setUser } = useContext(UserContext);

  return (
    <header>
      <h1>MERN APP</h1>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/introduce">Introduce</Link> |
        <Link to="/about">About</Link> |
        {user ? (
          <>
            <span>👋 {user.name || user.username}</span>
            <Link to="/profile">Profile</Link> |
            <button
              onClick={() => {
                localStorage.removeItem("username");
                setUser("");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/auth">Sign in</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
