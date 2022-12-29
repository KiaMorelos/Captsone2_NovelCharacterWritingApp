import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";
test("renders without crashing", () => {
  render(<NotFound />);
});
