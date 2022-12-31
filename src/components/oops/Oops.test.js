import { render, screen } from "@testing-library/react";
import Oops from "./Oops";

test("renders without crashing", () => {
  render(<Oops />);
});

test("there should be content in the component", () => {
  const utils = render(<Oops />);
  expect(
    utils.getByText("Something went wrong on our end, sorry!")
  ).toBeInTheDocument();
});
