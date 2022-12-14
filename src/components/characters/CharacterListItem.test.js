import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CharacterListItem from "./CharacterListItem";
import userEvent from "@testing-library/user-event";

import AuthContextProvider from "../../testUtils";

test("renders without crashing", () => {
  render(
    <AuthContextProvider>
      <MemoryRouter>
        <CharacterListItem />
      </MemoryRouter>
    </AuthContextProvider>
  );
});

test("component has content", () => {
  const utils = render(
    <AuthContextProvider>
      <MemoryRouter>
        <CharacterListItem id={1} name="Deadshot" characterPhotoUrl={""} />
      </MemoryRouter>
    </AuthContextProvider>
  );
  expect(utils.getByText("Deadshot")).toBeInTheDocument();
});
