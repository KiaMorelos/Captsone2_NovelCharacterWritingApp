import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AuthContext from "../components/context/AuthContext";
import QuestionSearchForm from "../components/questions/QuestionSearchForm";

const testUser = { username: "testuser" };

test("renders without crashing", () => {
  render(
    <AuthContext.Provider value={testUser}>
      <MemoryRouter>
        <QuestionSearchForm />
      </MemoryRouter>
    </AuthContext.Provider>
  );
});
