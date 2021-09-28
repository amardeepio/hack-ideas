import React from "react";
import { LogIn } from "../Components/LogIn";
import { render } from "@testing-library/react";

function renderLoginForm() {
  return render(<LogIn />);
}

describe("<LogIn />", () => {
  test("should render a log in form with an input box and a button", async () => {
    const { findByTestId } = renderLoginForm();
    const textField = await findByTestId("empId__field");
    expect(textField).toHaveValue("");
    const logInButton = await findByTestId("logIn__button");
    expect(logInButton).toHaveTextContent("Log In")
  });
});
