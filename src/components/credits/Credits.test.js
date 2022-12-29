import { render, screen } from "@testing-library/react";
import Credits from "./Credits";

test("renders without crashing", () => {
  render(<Credits />);
});
