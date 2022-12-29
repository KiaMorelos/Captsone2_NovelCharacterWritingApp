import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EditAnswerForm from "./EditAnswerForm";
import userEvent from "@testing-library/user-event";

import AuthContextProvider from "../../testUtils";

test("renders without crashing", () => {
  render(
    <AuthContextProvider>
      <MemoryRouter>
        <EditAnswerForm />
      </MemoryRouter>
    </AuthContextProvider>
  );
});
