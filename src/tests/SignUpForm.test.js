import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import SignUpForm from "../components/signup/SignUpForm";
test("renders without crashing", () => {
  render(
    <BrowserRouter>
      <SignUpForm />
    </BrowserRouter>
  );
});
