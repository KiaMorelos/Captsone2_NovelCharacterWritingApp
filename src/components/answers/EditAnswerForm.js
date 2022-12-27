import { WritingAPI } from "../../api/writingApi";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";

function EditAnswerForm({
  characterId,
  questionId,
  setEditingAnswer,
  setUpdatedAnswer,
}) {
  const [editSuccessful, setEditSuccessful] = useState(null);
  const [formData, setFormData] = useState({
    answer: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const { answer } = formData;
    const res = await WritingAPI.patchAnswer(characterId, questionId, answer);
    if (res.updated) {
      setEditSuccessful(true);
      setUpdatedAnswer(answer);
    }
    setFormData({ answer: "" });
  };

  return (
    <div>
      {editSuccessful ? (
        <div>
          {" "}
          <p className="alert alert-success m-auto mt-5 mb-5 p-5">
            <FontAwesomeIcon icon={faCircleCheck} /> Success!
          </p>
          <Modal.Footer>
            <Button
              onClick={() => setEditingAnswer(false)}
              variant="outline-primary"
            >
              Close
            </Button>
          </Modal.Footer>
        </div>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Answer</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={handleChange}
              type="textarea"
              name="answer"
              value={formData.answer}
            />
          </Form.Group>
          <Modal.Footer>
            <Button
              onClick={() => setEditingAnswer(false)}
              variant="outline-secondary"
            >
              Cancel
            </Button>
            <Button type="submit">
              {" "}
              <FontAwesomeIcon icon={faFloppyDisk} /> Save
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </div>
  );
}

export default EditAnswerForm;
