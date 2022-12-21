function AnswerListItem({
  id,
  answer,
  toQuestion,
  answerCategory,
  questionaireName,
}) {
  return (
    <li key={id}>
      {toQuestion}
      <ul>
        <li>
          {answer} | {answerCategory} | {questionaireName}
        </li>
      </ul>
    </li>
  );
}

export default AnswerListItem;
