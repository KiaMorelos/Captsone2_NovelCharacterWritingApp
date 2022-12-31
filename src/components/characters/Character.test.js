import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Character from "./Character";
import userEvent from "@testing-library/user-event";

import AuthContextProvider from "../../testUtils";
import { WritingAPI } from "../../api/writingApi";
jest.mock("../../api/writingApi");

test("renders without crashing", () => {
  render(
    <AuthContextProvider>
      <MemoryRouter>
        <Character />
      </MemoryRouter>
    </AuthContextProvider>
  );
});

test("component has content", () => {
  WritingAPI.mockImplementationOnce(() => {
    return {
      request: () => {
        return { id: 2, name: "Lois Lane", characterPhotoUrl: "" };
      },
    };
  });
  const utils = render(
    <AuthContextProvider>
      <MemoryRouter>
        <Character />
      </MemoryRouter>
    </AuthContextProvider>
  );
  waitFor(() => {
    expect(utils.getByText("Lois Lane")).toBeInTheDocument();
  });
});
