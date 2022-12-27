import AnswerListItem from "./AnswerListItem";
import Accordion from "react-bootstrap/Accordion";
import { useEffect, useState } from "react";
import { WritingAPI } from "../../api/writingApi";
import Loading from "../loading/Loading";

import "./AllAnswers.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function AllAnswers({ characterId, characterName }) {
  const [answers, setAnswers] = useState(null);

  async function deleteAns(characterId, answerId) {
    await WritingAPI.deleteAnswer(characterId, answerId);
    const result = answers.filter((answer) => answer.id !== answerId);
    setAnswers(result);
  }

  useEffect(() => {
    async function getAnswers() {
      const response = await WritingAPI.getAllAnswers(characterId);
      setAnswers(response);
    }
    getAnswers();
  }, [characterId]);

  if (!answers) return <Loading />;
  return (
    <div>
      {answers.length ? (
        <div style={{ margin: "0 auto", padding: "0 0 2% 0" }}>
          <Link
            to="/questionaires-questions"
            state={{ from: characterName, characterId }}
          >
            <FontAwesomeIcon icon={faPlus} /> Search for more questions to add
            to this character's profile
          </Link>
        </div>
      ) : null}
      <h2>Answer Worksheet</h2>

      {answers.length ? (
        <Accordion
          defaultActiveKey={answers[0].id}
          className="answer-accordion"
        >
          {answers.map((answer) => (
            <AnswerListItem
              key={answer.id}
              id={answer.id}
              answer={answer.answer}
              toQuestion={answer.Question.question}
              questionCategory={answer.Question.questionCategory}
              questionaireName={answer.Question.Questionaire.name}
              characterId={characterId}
              deleteAns={deleteAns}
            />
          ))}
        </Accordion>
      ) : (
        <p
          style={{
            margin: "0 auto",
            padding: "0 5% 2% 5%",
            textAlign: "center",
          }}
        >
          You haven't added any questionaire answers for this character yet.
          <Link
            to="/questionaires-questions"
            state={{ from: characterName, characterId }}
          >
            <FontAwesomeIcon icon={faPlus} /> Search questions and add answers
          </Link>
        </p>
      )}
    </div>
  );
}

export default AllAnswers;
