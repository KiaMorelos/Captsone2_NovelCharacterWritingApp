import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserAstronaut,
  faMasksTheater,
  faPlus,
  faRightFromBracket,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import "./NavBar.css";

function Menu({ logout }) {
  const { activeUser } = useContext(AuthContext);

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">WritSandbox</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {activeUser ? (
              <>
                <Nav.Link href="/profile">
                  <FontAwesomeIcon icon={faUserAstronaut} /> My Profile
                </Nav.Link>
                <Nav.Link href="/characters">
                  <FontAwesomeIcon icon={faMasksTheater} /> My Characters
                </Nav.Link>
                <Nav.Link href="/new-character">
                  <FontAwesomeIcon icon={faPlus} /> Create New Character
                </Nav.Link>
                <Nav.Link href="/" onClick={logout}>
                  <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Sign Up</Nav.Link>
              </>
            )}
            <Nav.Link href="/credits">
              Credits <FontAwesomeIcon icon={faQuoteRight} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
