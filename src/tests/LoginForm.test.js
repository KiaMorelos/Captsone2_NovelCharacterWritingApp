import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "../components/login/LoginForm";
test("renders without crashing", () => {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
});
