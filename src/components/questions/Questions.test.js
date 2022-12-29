import { render, screen } from "@testing-library/react";
import Questions from "./Questions";

test("renders without crashing", () => {
  render(<Questions questions={[]} />);
});
