import React from "react";
import { PageNotFound } from "../Components/NotFound";
import { render } from "@testing-library/react";

function renderPageNotFound() {
  return render(<PageNotFound />);
}

describe("<PageNotFound />", () => {
  test("should render a page not found component", async () => {
    const { findByTestId } = renderPageNotFound();
    const statusCode = await findByTestId("status__code");
    expect(statusCode).toHaveTextContent("4O4");
    const statusMessage = await findByTestId("status__message");
    expect(statusMessage).toHaveTextContent("Page Not Found");
  });
});
