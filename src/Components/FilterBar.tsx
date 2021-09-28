import React from "react";
import { Col, Row } from "react-bootstrap";
import { FieldSortOrder } from "../constant";
import { SearchBar } from "./SearchBar";
import { SortComponent } from "./SortComponent";

export const FilterBar: React.FC<FilterBarProps> = (props: FilterBarProps) => {
  return (
    <div className="mb-2">
      <Row>
        <Col md={10} sm={8}>
          <SearchBar {...props} />
        </Col>
        <Col md={2} sm={4}>
          <SortComponent {...props} />
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
};

interface FilterBarProps {
  order: FieldSortOrder;
  updateOrder: (val: FieldSortOrder) => void;
  field: string;
  updateField: (val: string) => void;
  searchText: string;
  onChangeValue: (value: string) => void;
}
