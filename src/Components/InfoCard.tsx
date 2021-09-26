import React from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import { BsHeart } from "react-icons/bs";

export const InfoCard: React.FC = () => {
  const arr = new Array(10).fill(0);
  return (
    <Row>
      {arr.map((e) => (
        <Col lg={3} md={4} sm={6} xs={12}>
          <Card className="card">
            <Card.Body>
              <Card.Title>Title</Card.Title>
              <Card.Text>Description</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Row>
                <Col md={12}>
                  <Badge bg="primary">Primary</Badge>
                  <Badge bg="secondary">Secondary</Badge>
                </Col>
                <Col>
                  <span><BsHeart />3.1K</span>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
