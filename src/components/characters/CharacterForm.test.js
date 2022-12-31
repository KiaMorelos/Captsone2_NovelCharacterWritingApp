import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CharacterForm from "./CharacterForm";
import userEvent from "@testing-library/user-event";

import AuthContextProvider from "../../testUtils";

test("renders without crashing", () => {
  render(
    <AuthContextProvider>
      <MemoryRouter>
        <CharacterForm />
      </MemoryRouter>
    </AuthContextProvider>
  );
});

test("component has content when creating characters", () => {
  const utils = render(
    <AuthContextProvider>
      <MemoryRouter>
        <CharacterForm whichAction={"new"} />
      </MemoryRouter>
    </AuthContextProvider>
  );
  expect(utils.getByText("Create New Character")).toBeInTheDocument();
});

test("component has correct content when editing characters", () => {
  const utils = render(
    <AuthContextProvider>
      <MemoryRouter>
        <CharacterForm whichAction={"edit"} />
      </MemoryRouter>
    </AuthContextProvider>
  );
  expect(utils.getByText("Save Edit")).toBeInTheDocument();
});
