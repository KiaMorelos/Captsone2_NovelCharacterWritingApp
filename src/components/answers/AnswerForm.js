import { WritingAPI } from "../../api/writingApi";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function AnswerForm({ characterId, questionId, setAddingAnswer }) {
  const navigate = useNavigate();

  const [wasAdded, setWasAdded] = useState(false);
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
    const res = await WritingAPI.addAnswer(characterId, questionId, answer);
    setWasAdded(true);
    setFormData({ answer: "" });
  };
  return (
    <div>
      {wasAdded ? (
        <div>
          {" "}
          <p
            className="alert alert-success"
            style={{ padding: "5%", margin: "5%" }}
          >
            <FontAwesomeIcon icon={faCircleCheck} /> Success! Close and keep
            adding questions or go back to this character's page
          </p>
          <Modal.Footer>
            <Button
              onClick={() => navigate(`/characters/${characterId}`)}
              variant="outline-success"
            >
              Back to this character's page
            </Button>
            <Button
              onClick={() => setAddingAnswer(false)}
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
              onClick={() => setAddingAnswer(false)}
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

export default AnswerForm;
