import { render, screen } from "@testing-library/react";
import FlashMessage from "./FlashMessage";

test("renders without crashing", () => {
  render(<FlashMessage />);
});
