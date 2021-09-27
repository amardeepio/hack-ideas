import React from "react";
import { Button, Col, Dropdown, DropdownButton, Row } from "react-bootstrap";
import { BsCaretUp, BsCaretDown } from "react-icons/bs";
import { FieldSortOrder, SortOrder } from "../constant";

export const SortComponent: React.FC<SortComponentProps> = (
  props: SortComponentProps
) => {
  const {field, order, updateField, updateOrder} = props;

  const handleOrder = () => {
    if (order === "desc") updateOrder(SortOrder.ASC)
    else updateOrder(SortOrder.DESC)
  };
  const updateFieldName = () => {
    if (field === "createdAt")
      return "Date"
      return "Votes"
    
  }
  return (
    <div className="sort-buttons">
      <div>
        <Dropdown>
          <DropdownButton
            title={"Sort: " + updateFieldName()}
            onSelect={(eventKey) => updateField(eventKey as string)}
          >
            <Dropdown.Item eventKey="createdAt">Date</Dropdown.Item>
            <Dropdown.Item eventKey="upvotes">Votes</Dropdown.Item>
          </DropdownButton>
        </Dropdown>
      </div>
      <div>
        <Button onClick={handleOrder}>
          {order === "asc" ? <BsCaretUp /> : <BsCaretDown />}
        </Button>
      </div>
    </div>
  );
};

interface SortComponentProps {
  order: FieldSortOrder;
  updateOrder: (val: FieldSortOrder) => void;
  field: string;
  updateField: (val: string) => void;
}
