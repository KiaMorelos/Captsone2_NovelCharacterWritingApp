import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProfileForm from "./ProfileForm";
import userEvent from "@testing-library/user-event";

import AuthContextProvider from "../../testUtils";

test("renders without crashing", () => {
  render(
    <AuthContextProvider>
      <MemoryRouter>
        <ProfileForm />
      </MemoryRouter>
    </AuthContextProvider>
  );
});

test("there should be content on the page", () => {
  const utils = render(
    <AuthContextProvider>
      <MemoryRouter>
        <ProfileForm />
      </MemoryRouter>
    </AuthContextProvider>
  );
  const formHeader = screen.getByRole("heading", { level: 1 });
  const userInfo = screen.getByRole("heading", { level: 2 });

  const button = screen.getByRole("button");
  expect(formHeader.textContent).toBe(" My Profile");
  //there's a break tag in the userInfo h2 so it runs together in tests, but it does exist
  expect(userInfo.textContent).toBe("username: testuseremail: test@test.com");

  expect(button.textContent).toBe("Update Profile");
});

test("there should be not be content on the page if not logged in", () => {
  const utils = render(
    <AuthContextProvider activeUser={null}>
      <MemoryRouter>
        <ProfileForm />
      </MemoryRouter>
    </AuthContextProvider>
  );
  expect(utils.queryByText("Update Profile")).not.toBeInTheDocument();
});

test("that the form inputs work and form can be submitted with data", () => {
  const utils = render(
    <AuthContextProvider>
      <MemoryRouter>
        <ProfileForm />
      </MemoryRouter>
    </AuthContextProvider>
  );
  const username = utils.getByLabelText("Username");
  const email = utils.getByLabelText("Email");
  const confirmPass = utils.getByLabelText("Confirm Password");
  const newPass = utils.getByLabelText("enter new password, (optional)");

  const button = screen.getByRole("button");
  waitFor(() => {
    fireEvent.change(username, { target: { value: "newuser" } });
    fireEvent.change(email, { target: { value: "email" } });
    fireEvent.change(confirmPass, { target: { value: "password" } });

    expect(button.textContent).toBe("Update Profile");
    expect(username.value).toBe("newuser");
    expect(email.value).toBe("email");
    expect(confirmPass.value).toBe("password");
    expect(newPass.value).toBe("");

    fireEvent.click(button);
  });
});
