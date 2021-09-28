import React from "react";
import { Form } from "react-bootstrap";

export const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const { onChangeValue, searchText } = props;
  return (
    <div>
      <Form.Control
        placeholder="Search..."
        style={{ maxWidth: 400 }}
        value={searchText}
        onChange={(event) => onChangeValue(event.target.value)}
      />
    </div>
  );
};

interface SearchBarProps {
  searchText: string;
  onChangeValue: (value: string) => void;
}
