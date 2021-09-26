
import React from "react";
import { Col, Row } from "react-bootstrap";
import { SearchBar } from "./SearchBar";
import { SortComponent } from "./SortComponent";

export const FilterBar: React.FC = () => {
  return (
    <div className="mb-2">
      <Row>
        <Col md={10} sm={8}>
          <SearchBar />
        </Col>
        <Col md={2} sm={4}>
          <SortComponent />
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
};
