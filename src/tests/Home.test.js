import { render, screen } from "@testing-library/react";
import AuthContext from "../components/context/AuthContext";
import { MemoryRouter } from "react-router-dom";

import Home from "../components/homepage/Home";
const testUser = { username: "testuser" };
test("renders without crashing", () => {
  render(
    <AuthContext.Provider value={testUser}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </AuthContext.Provider>
  );
});

test("contains content and signup/login buttons", () => {
  render(
    <AuthContext.Provider value={testUser}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </AuthContext.Provider>
  );
  const welcomeHeader = screen.getByText("Welcome to WritSandbox");
  const leadCopy = screen.queryByText(
    "Flesh out the characters of your next novel or RPG game."
  );
  const buttons = screen.getAllByRole("button");
  expect(buttons[0].textContent).toBe("Login");
  expect(buttons[1].textContent).toBe("Sign Up");
});
