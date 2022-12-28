import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMasksTheater, faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const { activeUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="homepage">
      <div className="welcome-content">
        <h1 className="display-2 pad-welcome">
          Welcome to WritSandbox
          {activeUser ? `, ${activeUser.username}` : null}
        </h1>
        {activeUser ? (
          <div className="lead-area">
            <p>Start building or editing characters</p>

            <Button className="m-3" onClick={() => navigate(`/characters`)}>
              <FontAwesomeIcon icon={faMasksTheater} /> My Characters
            </Button>
            <Button onClick={() => navigate(`/new-character`)}>
              <FontAwesomeIcon icon={faPlus} /> Create new character
            </Button>
          </div>
        ) : (
          <div className="lead-area">
            <p>
              Flesh out the characters of your next novel or RPG game. 4
              different worksheets and 138 available questions to choose from.
            </p>
            <p> Login or sign up to get started</p>

            <Button className="m-3" onClick={() => navigate(`/login`)}>
              Login
            </Button>
            <Button onClick={() => navigate(`/signup`)}>Sign Up</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
