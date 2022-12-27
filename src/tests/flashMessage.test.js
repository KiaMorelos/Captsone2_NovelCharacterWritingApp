import { render, screen } from "@testing-library/react";
import FlashMessage from "../components/flashMessage/FlashMessage";

test("renders without crashing", () => {
  render(<FlashMessage />);
});
