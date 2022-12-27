import { render, screen } from "@testing-library/react";
import Loading from "../components/loading/Loading";

test("renders without crashing", () => {
  render(<Loading />);
});
