import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AnswerListItem.css";

function AnswerListItem({
  id,
  answer,
  toQuestion,
  questionCategory,
  questionaireName,
}) {
  return (
    <Accordion.Item eventKey={id}>
      <Accordion.Header>
        <span className="to-question">{toQuestion}</span>
      </Accordion.Header>
      <Accordion.Body>
        <p className="answer-body">{answer}</p>
        <p className="answer">
          Question Category: {questionCategory}
          <br />
          From Questionaire: {questionaireName}
        </p>
        <Button variant="outline-primary" className="m-2">
          <FontAwesomeIcon icon={faPencil} /> Edit answer
        </Button>
        <Button variant="outline-danger" className="m-2">
          <FontAwesomeIcon icon={faTrash} /> Delete answer
        </Button>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default AnswerListItem;
