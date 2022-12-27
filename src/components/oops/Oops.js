import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";
function Oops() {
  return (
    <div className="upper-margin">
      <h1 className="display-1 text-center">
        <FontAwesomeIcon icon={faFaceFrown} /> Something went wrong on our end,
        sorry!
      </h1>
      <p className="text-center">
        The page you tried to go to may not exist. Use the navbar to find your
        way to a page that does
      </p>
    </div>
  );
}

export default Oops;
