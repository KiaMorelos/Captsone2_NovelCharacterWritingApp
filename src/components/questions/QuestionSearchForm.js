import { useState, useEffect } from "react";
import { WritingAPI } from "../../api/writingApi";
import { useLocation } from "react-router-dom";
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
    <div>
      <h1>
        Search Questionaires and Questions
        {from ? ` to add to ${from}'s profile` : null}
      </h1>
      <p>
        Mouse Paw Media's questionaire encompasses all question available
        categories currently available. The other three are primarily
        psychological information questions, but also very valuable places to
        start
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Questionaire</label>
          <select name="questionaireId" onChange={handleChange}>
            <option value="">Any</option>
            {questionaires.length
              ? questionaires.map((questionaire) => (
                  <option value={questionaire.id} key={questionaire.id}>
                    {questionaire.name}
                  </option>
                ))
              : "Loading available questionaires"}
          </select>
        </div>
        <div>
          <label>Question Category</label>
          <select name="questionCategory" onChange={handleChange}>
            <option value="">None</option>
            <option value="brief history">brief history</option>
            <option value="physical description and unique characteristics">
              physical description and unique characteristics
            </option>
            <option value="psychological information">
              psychological information
            </option>
          </select>
        </div>
        <button>search</button>
      </form>

      <ul>
        {questions.length ? (
          <Questions questions={questions} characterId={characterId} />
        ) : (
          <li key="no-questions">No results</li>
        )}
      </ul>
    </div>
  );
}

export default QuestionSearchForm;
