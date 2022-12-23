import { useState } from "react";
import AnswerForm from "../answers/AnswerForm";

function Questions({ questions, characterId }) {
  const [addingAnswer, setAddingAnswer] = useState(false);
  const [q, setQ] = useState(null);

  function setQuestionAndAnswerState(questionObj) {
    setQ(questionObj);
    setAddingAnswer(true);
  }
  return (
    <>
      {questions.map((question) => (
        <li key={question.id}>
          {question.question}
          {characterId ? (
            <button onClick={() => setQuestionAndAnswerState(question)}>
              Add an answer
            </button>
          ) : null}
        </li>
      ))}

      {addingAnswer ? (
        <AnswerForm
          question={q.question}
          characterId={characterId}
          questionId={q.id}
          setAddingAnswer={setAddingAnswer}
        />
      ) : null}
    </>
  );
}

export default Questions;
