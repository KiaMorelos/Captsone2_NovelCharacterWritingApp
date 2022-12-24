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
          <button>Edit answer</button>
          <button>Delete answer</button>
        </li>
      </ul>
    </li>
  );
}

export default AnswerListItem;
