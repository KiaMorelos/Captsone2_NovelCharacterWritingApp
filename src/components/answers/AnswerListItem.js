import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import EditAnswerForm from "./EditAnswerForm";
import Modal from "react-bootstrap/Modal";
import "./AnswerListItem.css";

function AnswerListItem({
  id,
  answer,
  toQuestion,
  questionCategory,
  questionaireName,
  characterId,
  deleteAns,
}) {
  const [editingAnswer, setEditingAnswer] = useState(false);
  const [updatedAnswer, setUpdatedAnswer] = useState(answer);
  const handleCloseEditingAns = () => setEditingAnswer(false);
  const handleShowEditingAns = () => setEditingAnswer(true);

  return (
    <div>
      <Accordion.Item eventKey={id}>
        <Accordion.Header>
          <span className="to-question">{toQuestion}</span>
        </Accordion.Header>
        <Accordion.Body>
          <p className="answer-body">
            {updatedAnswer === answer ? answer : updatedAnswer}
          </p>
          <p className="answer">
            Question Category: {questionCategory}
            <br />
            From Questionaire: {questionaireName}
          </p>
          <Button
            variant="outline-primary"
            className="m-2"
            onClick={() => setEditingAnswer(true)}
          >
            <FontAwesomeIcon icon={faPencil} /> Edit answer
          </Button>
          <Button
            variant="outline-danger"
            className="m-2"
            onClick={() => deleteAns(characterId, id)}
          >
            <FontAwesomeIcon icon={faTrash} /> Delete answer
          </Button>
        </Accordion.Body>
      </Accordion.Item>

      {editingAnswer ? (
        <Modal show={handleShowEditingAns} onHide={handleCloseEditingAns}>
          <Modal.Header closeButton>
            <Modal.Title>
              <FontAwesomeIcon icon={faPencil} /> Editing Answer:{" "}
              {updatedAnswer === answer ? answer : updatedAnswer}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {editingAnswer ? (
              <EditAnswerForm
                whichAction={"edit"}
                characterId={characterId}
                questionId={id}
                setEditingAnswer={setEditingAnswer}
                setUpdatedAnswer={setUpdatedAnswer}
                updatedAnswer={updatedAnswer}
                ans={answer}
              />
            ) : null}
          </Modal.Body>
        </Modal>
      ) : null}
    </div>
  );
}

export default AnswerListItem;
