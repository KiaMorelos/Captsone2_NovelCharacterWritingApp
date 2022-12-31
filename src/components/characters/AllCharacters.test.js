import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AllCharacters from "./AllCharacters";
import userEvent from "@testing-library/user-event";

import AuthContextProvider from "../../testUtils";
import { WritingAPI } from "../../api/writingApi";
jest.mock("../../api/writingApi");

test("renders without crashing", () => {
  render(
    <AuthContextProvider>
      <MemoryRouter>
        <AllCharacters />
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
            id: 1,
            name: "Jean Grey",
            characterPhotoUrl: "",
          },
          {
            id: 2,
            name: "Clark Kent",
            characterPhotoUrl: "",
          },
        ];
      },
    };
  });
  const utils = render(
    <AuthContextProvider>
      <MemoryRouter>
        <AllCharacters />
      </MemoryRouter>
    </AuthContextProvider>
  );
  waitFor(() => {
    expect(utils.getByText("Jean Grey")).toBeInTheDocument();
    expect(utils.getByText("Clark Kent")).toBeInTheDocument();
  });
});

test("component has content, and displays placeholder when no character present", () => {
  const utils = render(
    <AuthContextProvider>
      <MemoryRouter>
        <AllCharacters />
      </MemoryRouter>
    </AuthContextProvider>
  );
  waitFor(() => {
    expect(
      utils.getByText(
        "You haven't created any characters yet, or you already killed them all."
      )
    ).toBeInTheDocument();
  });
});
