import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AllCharacters from "./AllCharacters";
import userEvent from "@testing-library/user-event";

import AuthContextProvider from "../../testUtils";

test("renders without crashing", () => {
  render(
    <AuthContextProvider>
      <MemoryRouter>
        <AllCharacters />
      </MemoryRouter>
    </AuthContextProvider>
  );
});
