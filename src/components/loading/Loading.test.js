import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

test("renders without crashing", () => {
  render(<Loading />);
});
