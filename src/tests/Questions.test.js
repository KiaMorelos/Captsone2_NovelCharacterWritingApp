import { render, screen } from "@testing-library/react";
import Questions from "../components/questions/Questions";

test("renders without crashing", () => {
  render(<Questions questions={[]} />);
});
