import React from "react";
import { Form } from "react-bootstrap";

export const SearchBar: React.FC = () => {
  return (
    <div>
      <Form.Control placeholder="Search..." style={{maxWidth: 400 }}/>
    </div>
  );
};
