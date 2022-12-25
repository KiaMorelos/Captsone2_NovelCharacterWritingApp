import { useState } from "react";
import NewAnswerForm from "../answers/NewAnswerForm";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import "./Questions.css";

function Questions({ questions, characterId }) {
  const [addingAnswer, setAddingAnswer] = useState(false);
  const [q, setQ] = useState(null);

  const handleClose = () => setAddingAnswer(false);
  const handleShow = () => setAddingAnswer(true);

  function setQuestionAndAnswerState(questionObj) {
    setQ(questionObj);
    setAddingAnswer(true);
  }
  return (
    <>
      {questions.map((question) => (
        <ListGroup.Item key={question.id} className="questions">
          {question.question}
          {characterId ? (
            <Button
              onClick={() => setQuestionAndAnswerState(question)}
              variant="outline-primary"
              size="sm"
              className="pencil-button"
            >
              {" "}
              <FontAwesomeIcon icon={faPencil} /> Add an answer
            </Button>
          ) : null}
        </ListGroup.Item>
      ))}

      {addingAnswer ? (
        <Modal show={handleShow} onHide={handleClose}>
          <Modal.Header closeButton>
            {" "}
            <Modal.Title>Add Answer to: {q.question}</Modal.Title>
          </Modal.Header>

          <NewAnswerForm
            characterId={characterId}
            questionId={q.id}
            setAddingAnswer={setAddingAnswer}
          />
        </Modal>
      ) : null}
    </>
  );
}

export default Questions;
