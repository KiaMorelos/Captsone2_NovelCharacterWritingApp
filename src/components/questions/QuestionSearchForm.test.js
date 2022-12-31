import { render, waitFor } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import AuthContextProvider from "../../testUtils";
import QuestionSearchForm from "./QuestionSearchForm";
import { WritingAPI } from "../../api/writingApi";
jest.mock("../../api/writingApi");

describe("Question Search Tests", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <QuestionSearchForm />
      </MemoryRouter>
    );
  });

  test("component has content, and has questionaire and question data when asked", () => {
    WritingAPI.mockImplementationOnce(() => {
      return {
        request: () => {
          return {
            questionaires: [
              {
                id: 1,
                name: "Marcel Proust",
                questionaireType: "character analysis",
              },
            ],
          };
        },
      };
    });
    WritingAPI.mockImplementationOnce(() => {
      return {
        request: () => {
          return {
            questions: [
              {
                id: 1,
                questionaireId: 1,
                question: "What is your idea of perfect happiness?",
                questionCategory: "psychological information",
              },
              {
                id: 2,
                questionaireId: 1,
                question: "What is your greatest fear?",
                questionCategory: "psychological information",
              },
            ],
          };
        },
      };
    });
    const utils = render(
      <AuthContextProvider>
        <MemoryRouter>
          <QuestionSearchForm />
        </MemoryRouter>
      </AuthContextProvider>
    );
    waitFor(() => {
      expect(
        utils.getAllByText("Search Questionaires and Questions")
      ).toBeInTheDocument();
      expect(utils.getByText("Marcel Proust")).toBeInTheDocument();
      expect(
        utils.getByText("What is your greatest fear?")
      ).toBeInTheDocument();
    });
  });
});
