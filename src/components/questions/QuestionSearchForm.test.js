import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MemoryRouter } from "react-router-dom";
import AuthContextProvider from "../../testUtils";
import QuestionSearchForm from "./QuestionSearchForm";
import { mswServer } from "../../mocks/server";
import { getAllQuestionairesResponse } from "../../mocks/handlers";

describe("Question Search Tests", () => {
  test("renders without crashing", () => {
    render(<QuestionSearchForm />);
  });

  test("component has content", () => {
    const utils = render(
      <AuthContextProvider>
        <MemoryRouter>
          <QuestionSearchForm />
        </MemoryRouter>
      </AuthContextProvider>
    );
    expect(
      utils.queryByText("Search Questionaires and Questions")
    ).toBeInTheDocument();
  });

  ///BROKEN TEST
  //   test("component has form that works", async () => {
  //     mswServer.use(getAllQuestionairesResponse);

  //     const utils = render(
  //       <AuthContextProvider>
  //         <MemoryRouter>
  //           <QuestionSearchForm />
  //         </MemoryRouter>
  //       </AuthContextProvider>
  //     );
  //   });
});