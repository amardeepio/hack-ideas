import React from "react";
import { Header } from "../Components/Header";
import { render } from "@testing-library/react";

function renderHeader() {
  return render(<Header />);
}

describe("<Header />", () => {
  test("should render header component", async () => {
    const { findByTestId, queryByText } = renderHeader();
    expect(queryByText(/Hack/ig)).not.toBeNull()
  });
});
