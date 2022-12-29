import { render, screen } from "@testing-library/react";
import Oops from "./Oops";

test("renders without crashing", () => {
  render(<Oops />);
});
