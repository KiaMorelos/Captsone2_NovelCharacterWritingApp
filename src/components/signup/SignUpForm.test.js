import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import SignUpForm from "./SignUpForm";

test("renders without crashing", () => {
  render(
    <MemoryRouter>
      <SignUpForm />
    </MemoryRouter>
  );
});

test("there should be content on the page", () => {
  const utils = render(
    <MemoryRouter>
      <SignUpForm />
    </MemoryRouter>
  );
  const formHeader = screen.getByRole("heading", { level: 1 });
  const button = screen.getByRole("button");
  expect(button.textContent).toBe("Sign Up");
});

test("that the form inputs work and form can be submitted with data", async () => {
  const mockResponse = [{ status: "success" }];
  const mockSubmit = jest.fn(() => Promise.resolve(mockResponse));
  const utils = render(
    <MemoryRouter>
      <SignUpForm signup={mockSubmit} />
    </MemoryRouter>
  );
  const username = utils.getByLabelText("Username");
  const email = utils.getByLabelText("Email");
  const password = utils.getByLabelText(
    "Password (must be at least 8 characters long)"
  );
  const button = screen.getByRole("button");
  await waitFor(() => {
    fireEvent.change(username, { target: { value: "newuser" } });
    fireEvent.change(email, { target: { value: "email" } });
    fireEvent.change(password, { target: { value: "password" } });

    expect(button.textContent).toBe("Sign Up");
    expect(username.value).toBe("newuser");
    expect(email.value).toBe("email");
    expect(password.value).toBe("password");

    fireEvent.click(button);
  });
});
