import { render, screen } from "@testing-library/react";
import AuthContextProvider from "../../testUtils";
import { MemoryRouter } from "react-router-dom";

import Home from "./Home";
test("renders without crashing", () => {
  render(
    <AuthContextProvider activeUser={null}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </AuthContextProvider>
  );
});

test("contains content and signup/login buttons when logged out", () => {
  render(
    <AuthContextProvider activeUser={null}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </AuthContextProvider>
  );
  const welcomeHeader = screen.getByText("Welcome to WritSandbox");
  const leadCopy = screen.queryByText(
    "Ditch the pen/paper - build out your fictional characters"
  );
  const buttons = screen.getAllByRole("button");
  expect(buttons[0].textContent).toBe("Login");
  expect(buttons[1].textContent).toBe("Sign Up");
});

test("contains content and create/character buttons when logged in", () => {
  render(
    <AuthContextProvider>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </AuthContextProvider>
  );
  const welcomeHeader = screen.getByText("Welcome to WritSandbox, testuser");
  const leadCopy = screen.queryByText("Start building or editing characters");
  const buttons = screen.getAllByRole("button");
  expect(buttons[0].textContent).toBe(" My Characters");
  expect(buttons[1].textContent).toBe(" Create new character");
});
