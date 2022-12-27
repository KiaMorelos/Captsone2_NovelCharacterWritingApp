import { render, screen } from "@testing-library/react";
import Oops from "../components/oops/Oops";

test("renders without crashing", () => {
  render(<Oops />);
});
