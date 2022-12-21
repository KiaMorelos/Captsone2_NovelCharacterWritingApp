import AnswerListItem from "./AnswerListItem";
function AllAnswers({ Answers }) {
  return (
    <div>
      <h2>Answers</h2>
      <ul>
        {Answers.map((answer) => (
          <AnswerListItem
            key={answer.id}
            id={answer.id}
            answer={answer.answer}
            toQuestion={answer.Question.question}
            answerCategory={answer.Question.questionCategory}
            questionaireName={answer.Question.Questionaire.name}
          />
        ))}
      </ul>
    </div>
  );
}

export default AllAnswers;
