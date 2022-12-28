import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import SignUpForm from "../components/signup/SignUpForm";
test("renders without crashing", () => {
  render(
    <MemoryRouter>
      <SignUpForm />
    </MemoryRouter>
  );
});
