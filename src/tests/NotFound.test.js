import { render, screen } from "@testing-library/react";
import NotFound from "../components/notFoundPage/NotFound";
test("renders without crashing", () => {
  render(<NotFound />);
});
