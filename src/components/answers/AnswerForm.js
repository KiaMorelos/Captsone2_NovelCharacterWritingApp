import { WritingAPI } from "../../api/writingApi";
import { useState } from "react";

function AnswerForm({ question, characterId, questionId, setAddingAnswer }) {
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
    if (!res.length) return; // add error handling with FLASH component here
    setFormData({ answer: "" });
  };
  return (
    <div>
      <h1>Add Answer to: {question}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>answer</label>
          <input
            onChange={handleChange}
            type="text"
            name="answer"
            value={formData.answer}
          />
        </div>
        <button>Save</button>
        <button onClick={() => setAddingAnswer(false)}>Cancel</button>
      </form>
    </div>
  );
}

export default AnswerForm;
