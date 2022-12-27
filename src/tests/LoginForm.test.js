import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "../components/login/LoginForm";
test("renders without crashing", () => {
  render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  );
});
