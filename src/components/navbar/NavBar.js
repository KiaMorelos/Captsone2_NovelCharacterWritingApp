import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./NavBar.css";

function NavBar({ logout }) {
  const { activeUser } = useContext(AuthContext);

  return (
    <nav>
      <NavLink to="/">WritSandbox</NavLink>
      {activeUser ? (
        <>
          <NavLink to="/characters">My Characters</NavLink>
          <NavLink to="/new-character">Create New Character</NavLink>
          <NavLink to="/profile">My Profile</NavLink>
          <NavLink to="/" onClick={logout}>
            Logout
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </>
      )}
    </nav>
  );
}

export default NavBar;
