import AnswerListItem from "./AnswerListItem";
import Accordion from "react-bootstrap/Accordion";
import { useEffect, useState } from "react";
import { WritingAPI } from "../../api/writingApi";
import Loading from "../loading/Loading";

import "./AllAnswers.css";

function AllAnswers({ Answers, characterId, deleteAns }) {
  if (!Answers) return <Loading />;
  return (
    <div>
      <h2>Answers</h2>
      <Accordion defaultActiveKey={Answers[0].id} className="answer-accordion">
        {Answers.map((answer) => (
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
    </div>
  );
}

export default AllAnswers;
