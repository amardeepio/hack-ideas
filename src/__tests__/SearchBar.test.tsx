import React from "react";
import { SearchBar, SearchBarProps } from "../Components/SearchBar";
import { fireEvent, render } from "@testing-library/react";

function renderSearchBar(props: Partial<SearchBarProps>) {
  const defaultProps: SearchBarProps = {
    onChangeValue() {
      return;
    },
    searchText: "test",
  };
  return render(<SearchBar  {...defaultProps} {...props}/>);
}

describe("<SearchBar />", () => {
  test("should render SearchBar component", async () => {
    const { findByTestId, queryByText } = renderSearchBar({});
    const inputElement = await findByTestId("search__bar");
    expect(inputElement).toHaveValue("test");
  });

  test("should allow entering a text", async () => {
    const onChangeValue = jest.fn();
    const { findByTestId } = renderSearchBar({ onChangeValue });
    const inputElement = await findByTestId("search__bar");

    fireEvent.change(inputElement, { target: { value: "Test value" } });

    expect(onChangeValue).toHaveBeenCalledWith("Test value");
  });
});
