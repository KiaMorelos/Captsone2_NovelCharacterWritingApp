import { render, screen } from "@testing-library/react";
import Credits from "./Credits";

test("renders without crashing", () => {
  render(<Credits />);
});

test("there should be content in the component", () => {
  const utils = render(<Credits />);
  expect(
    utils.getByText("This project is a class project")
  ).toBeInTheDocument();
});
