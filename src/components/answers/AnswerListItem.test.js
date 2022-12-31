import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AnswerListItem from "./AnswerListItem";
import userEvent from "@testing-library/user-event";

import AuthContextProvider from "../../testUtils";

test("renders without crashing", () => {
  render(
    <AuthContextProvider>
      <MemoryRouter>
        <AnswerListItem />
      </MemoryRouter>
    </AuthContextProvider>
  );
});

test("there is content", () => {
  const utils = render(
    <AuthContextProvider>
      <MemoryRouter>
        <AnswerListItem
          id={1}
          toQuestion={"favorite song?"}
          answer={"smells like teen spirit"}
          questionCategory={"brief history"}
          questionaireName={"Mulaney"}
        />
      </MemoryRouter>
    </AuthContextProvider>
  );
  expect(utils.getByText("smells like teen spirit")).toBeInTheDocument();
  expect(utils.getByText("favorite song?")).toBeInTheDocument();
  expect(utils.getByText("Delete answer")).toBeInTheDocument();
  expect(utils.getByText("Edit answer")).toBeInTheDocument();
});
