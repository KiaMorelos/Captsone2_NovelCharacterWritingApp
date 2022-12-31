import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMasksTheater, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Home.css";

function Home() {
  const { activeUser } = useContext(AuthContext);
  return (
    <div className="homepage">
      <div className="welcome-content">
        <h1 className="display-2 pad-welcome fw-bold">
          Welcome to WritSandbox
          {activeUser ? `, ${activeUser.username}` : null}
        </h1>
        {activeUser ? (
          <div className="lead-area">
            <p>Start building or editing characters</p>

            <Button className="m-5" as={Link} to="/characters">
              <FontAwesomeIcon icon={faMasksTheater} /> My Characters
            </Button>
            <Button as={Link} to="/new-character">
              <FontAwesomeIcon icon={faPlus} /> Create new character
            </Button>
          </div>
        ) : (
          <div className="lead-area">
            <p>
              Ditch the pen/paper - build out your fictional characters'
              descriptions, personalities, and histories for your next novel in
              one convenient place.
            </p>
            <p className="mt-4">
              With WritSandbox you can get to know your characters with 4
              different character worksheets and 138 available questions to
              'ask' your characters before you start writing.
            </p>

            <p className="fw-bold mt-5"> Login or sign up to get started</p>

            <Button className="m-5 login" as={Link} to="/login">
              Login
            </Button>
            <Button as={Link} to="/signup">
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
