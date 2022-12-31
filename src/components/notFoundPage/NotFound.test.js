import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";
test("renders without crashing", () => {
  render(<NotFound />);
});

test("there should be content in the component", () => {
  const utils = render(<NotFound />);
  expect(utils.getByText("404 Not Found")).toBeInTheDocument();
});
