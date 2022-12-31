import { render, screen } from "@testing-library/react";
import Questions from "./Questions";

const questions = [
  {
    id: 1,
    questionaireId: 1,
    question: "What is your idea of perfect happiness?",
    questionCategory: "psychological information",
  },
  {
    id: 2,
    questionaireId: 1,
    question: "What is your greatest fear?",
    questionCategory: "psychological information",
  },
];

test("renders without crashing", () => {
  render(<Questions questions={[]} />);
});

test("load questions when questions exist", () => {
  const utils = render(<Questions questions={questions} />);
  expect(
    utils.getByText("What is your idea of perfect happiness?")
  ).toBeInTheDocument();
});
