import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AllAnswers from "./AllAnswers";
import userEvent from "@testing-library/user-event";

import AuthContextProvider from "../../testUtils";
import { WritingAPI } from "../../api/writingApi";
jest.mock("../../api/writingApi");

test("renders without crashing", () => {
  render(
    <AuthContextProvider>
      <MemoryRouter>
        <AllAnswers />
      </MemoryRouter>
    </AuthContextProvider>
  );
});

test("component has content, and has character info when it exists", () => {
  WritingAPI.mockImplementationOnce(() => {
    return {
      request: () => {
        return [
          {
            id: 2,
            questionId: 5,
            characterId: 1,
            answer: "My dog",
            createdAt: "2022-12-25T07:56:03.686Z",
            updatedAt: "2022-12-27T07:35:38.952Z",
            Question: {
              question: "Which living person do you most admire?",
              questionCategory: "psychological information",
              Questionaire: {
                name: "Marcel Proust",
              },
            },
          },
        ];
      },
    };
  });
  const utils = render(
    <AuthContextProvider>
      <MemoryRouter>
        <AllAnswers />
      </MemoryRouter>
    </AuthContextProvider>
  );
  waitFor(() => {
    expect(utils.getByText("My dog")).toBeInTheDocument();
  });
});

test("component has content, and has character info when it exists", () => {
  WritingAPI.mockImplementationOnce(() => {
    return {
      request: () => {
        return [];
      },
    };
  });
  const utils = render(
    <AuthContextProvider>
      <MemoryRouter>
        <AllAnswers />
      </MemoryRouter>
    </AuthContextProvider>
  );
  waitFor(() => {
    expect(
      utils.getByText(
        "You haven't added any questionaire answers for this character yet."
      )
    ).toBeInTheDocument();
  });
});
