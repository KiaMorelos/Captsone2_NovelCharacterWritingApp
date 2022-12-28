import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProfileForm from "../components/profile/ProfileForm";
import AuthContext from "../components/context/AuthContext";

const testUser = { username: "testuser" };

test("renders without crashing", () => {
  render(
    <AuthContext.Provider value={testUser}>
      <MemoryRouter>
        <ProfileForm />
      </MemoryRouter>
    </AuthContext.Provider>
  );
});
