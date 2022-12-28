import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AuthContextProvider from "./testUtils";
import QuestionSearchForm from "../components/questions/QuestionSearchForm";

test("renders without crashing", () => {
  render(
    <AuthContextProvider>
      <MemoryRouter>
        <QuestionSearchForm />
      </MemoryRouter>
    </AuthContextProvider>
  );
});
