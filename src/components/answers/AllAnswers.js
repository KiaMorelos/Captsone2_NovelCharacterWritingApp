import AnswerListItem from "./AnswerListItem";
import Accordion from "react-bootstrap/Accordion";
import "./AllAnswers.css";

function AllAnswers({ Answers }) {
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
          />
        ))}
      </Accordion>
    </div>
  );
}

export default AllAnswers;
