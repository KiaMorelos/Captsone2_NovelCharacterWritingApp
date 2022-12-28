import { useState, useEffect } from "react";
import { WritingAPI } from "../../api/writingApi";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

import "./QuestionSearchForm.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Loading from "../loading/Loading";
import Questions from "./Questions";

function QuestionSearchForm() {
  const [questions, setQuestions] = useState([]);
  const [questionaires, setQuestionaires] = useState([]);
  const location = useLocation();
  let from = null;
  let characterId = null;
  if (location.state) {
    from = location.state.from;
    characterId = location.state.characterId;
  }
  async function searchQuestions(data = {}) {
    const response = await WritingAPI.getAllQuestions(data);
    setQuestions(response);
  }

  useEffect(() => {
    async function getQuestionaires() {
      const response = await WritingAPI.getAllQuestionaires();
      setQuestionaires(response);
    }
    getQuestionaires();
  }, []);

  useEffect(() => {
    async function getQuestions() {
      const response = await WritingAPI.getAllQuestions();
      setQuestions(response);
    }
    getQuestions();
  }, []);

  const [formData, setFormData] = useState({
    questionaireId: "",
    questionCategory: "",
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

    if (!formData.questionType && !formData.questionCategory) {
      searchQuestions();
    }
    if (!formData.questionaireId && formData.questionCategory) {
      const { questionCategory } = formData;
      searchQuestions({ questionCategory });
    }
    if (formData.questionaireId && !formData.questionCategory) {
      const { questionaireId } = formData;
      searchQuestions({ questionaireId });
    }

    if (formData.questionaireId && formData.questionCategory) {
      searchQuestions(formData);
    }
  };
  if (!questionaires || !questions) return <Loading />;

  return (
    <div className="search-form">
      <h1 className="upper-margin">
        Search Questionaires and Questions
        {from ? ` to add to ${from}'s profile` : null}
      </h1>
      <p>
        Mouse Paw Media's questionaire encompasses all question categories
        currently available. The other three are primarily psychological
        information questions, but also very valuable places to start. Bernard
        Pivot's and James Lipton's questionaires are almost identical, but there
        are slight differences.
      </p>

      <Form onSubmit={handleSubmit}>
        <Row className="d-inline-flex align-items-center ">
          <Col xs="auto">
            <Form.Group className="mb-3" controlId="SearchForm.Questionaires">
              <Form.Label>Questionaire</Form.Label>
              <Form.Select
                aria-label="Questionaire"
                name="questionaireId"
                onChange={handleChange}
              >
                <option value="">Any</option>
                {questionaires.length
                  ? questionaires.map((questionaire) => (
                      <option value={questionaire.id} key={questionaire.id}>
                        {questionaire.name}
                      </option>
                    ))
                  : "Loading available questionaires"}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs="auto">
            <Form.Group
              className="mb-3"
              controlId="SearchForm.QuestionCategory"
            >
              <Form.Label>Question Category</Form.Label>
              <Form.Select
                aria-label="Question Category"
                name="questionCategory"
                onChange={handleChange}
              >
                <option value="">None</option>
                <option value="brief history">brief history</option>
                <option value="physical description and unique characteristics">
                  physical description and unique characteristics
                </option>
                <option value="psychological information">
                  psychological information
                </option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs="auto">
            <Button type="submit" className="search-button">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </Col>
        </Row>
      </Form>

      <ListGroup>
        {questions.length ? (
          <Questions questions={questions} characterId={characterId} />
        ) : (
          <ListGroup.Item key="no-questions">No results</ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
}

export default QuestionSearchForm;
