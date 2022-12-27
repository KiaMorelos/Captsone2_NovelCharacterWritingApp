import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function FlashMessage({ alertType, message }) {
  const [show, setShow] = useState(true);
  if (show) {
    return (
      <Alert variant={alertType} onClose={() => setShow(false)} dismissible>
        {alertType === "success" ? (
          <FontAwesomeIcon icon={faCircleCheck} />
        ) : (
          <FontAwesomeIcon icon={faTriangleExclamation} />
        )}{" "}
        {message}
      </Alert>
    );
  }
  return null;
}

export default FlashMessage;
