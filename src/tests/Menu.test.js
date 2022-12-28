import { render, screen } from "@testing-library/react";
import AuthContextProvider from "./testUtils";
import { MemoryRouter } from "react-router-dom";
import Menu from "../components/navbar/Menu";

test("renders without crashing for regular user", () => {
  render(
    <AuthContextProvider activeUser={null}>
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
    </AuthContextProvider>
  );
});

test("renders without crashing for logged in user", () => {
  render(
    <AuthContextProvider>
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
    </AuthContextProvider>
  );
});
