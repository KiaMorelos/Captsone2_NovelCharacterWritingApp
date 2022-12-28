import { render, screen } from "@testing-library/react";
import AuthContext from "../components/context/AuthContext";
import { MemoryRouter } from "react-router-dom";
import Menu from "../components/navbar/Menu";

const testUser = { username: "testuser" };

test("renders without crashing", () => {
  render(
    <AuthContext.Provider value={testUser}>
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
    </AuthContext.Provider>
  );
});
