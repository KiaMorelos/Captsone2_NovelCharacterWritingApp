import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCrack, faPoo } from "@fortawesome/free-solid-svg-icons";
function NotFound() {
  return (
    <div className="upper-margin">
      <h1 className="display-1 text-center">
        <FontAwesomeIcon icon={faHeartCrack} /> 404 Not Found{" "}
        <FontAwesomeIcon icon={faPoo} />
      </h1>
      <p className="text-center">
        The page you tried to go to doesn't exist. Use the navbar to find your
        way to a page that does
      </p>
    </div>
  );
}

export default NotFound;
