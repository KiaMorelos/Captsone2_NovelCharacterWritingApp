import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import LoginForm from "../components/login/LoginForm";
import { act } from "react-dom/test-utils";

test("renders without crashing", () => {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
});

test("there should be content on the page", () => {
  const utils = render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  const formHeader = screen.getByRole("heading", { level: 1 });
  const button = screen.getByRole("button");
  expect(button.textContent).toBe("Login");
});

test("that the form inputs work and form can be submitted with data", () => {
  const mockResponse = [{ status: "success" }];
  const mockSubmit = jest.fn(() => Promise.resolve(mockResponse));
  const utils = render(
    <MemoryRouter>
      <LoginForm login={mockSubmit} />
    </MemoryRouter>
  );
  const username = utils.getByLabelText("Username");
  const password = utils.getByLabelText("Password");
  const button = screen.getByRole("button");
  act(() => {
    fireEvent.change(username, { target: { value: "newuser" } });
    fireEvent.change(password, { target: { value: "password" } });
  });
  expect(button.textContent).toBe("Login");
  expect(username.value).toBe("newuser");
  expect(password.value).toBe("password");
  fireEvent.click(button);
});
