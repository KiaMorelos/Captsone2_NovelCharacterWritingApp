import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";

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

  test("component has content", () => {
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
    const utils = render(
      <AuthContextProvider>
        <MemoryRouter>
          <QuestionSearchForm />
        </MemoryRouter>
      </AuthContextProvider>
    );
    waitFor(() => {
      expect(
        utils.queryByText("Search Questionaires and Questions")
      ).toBeInTheDocument();
      expect(utils.getByText("Marcel Proust")).toBeInTheDocument();
    });
  });
});
