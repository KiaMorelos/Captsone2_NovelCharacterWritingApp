import { render, screen } from "@testing-library/react";
import AuthContext from "../components/context/AuthContext";
import { BrowserRouter } from "react-router-dom";

import Home from "../components/homepage/Home";
const testUser = { username: "testuser" };
test("renders without crashing", () => {
  render(
    <AuthContext.Provider value={testUser}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </AuthContext.Provider>
  );
});
