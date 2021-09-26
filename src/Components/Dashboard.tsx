import React from "react";
import { Col, Row } from "react-bootstrap";
import { FilterBar } from "./FilterBar";
import { InfoCard } from "./InfoCard";
import { SearchBar } from "./SearchBar";

export const Dashboard: React.FC = () => {
  return (
    <main className="mt-3">
      <Row>
        <Col md={12}>
          <Row>
            <Col>
              <FilterBar />
            </Col>
          </Row>
        </Col>
        <Col>
          <InfoCard />
        </Col>
      </Row>
    </main>
  );
};
