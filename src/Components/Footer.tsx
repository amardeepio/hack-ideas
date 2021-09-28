import React from "react";
import { Col, Row } from "react-bootstrap";

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Row>
        <Col>
          <span>Created for</span>
          <span>
            <img
              className="logo"
              src={process.env.PUBLIC_URL + "/images/logo.svg"}
              alt="logo"
            />
          </span>
          <span className="text-muted float-right about-me">
            Developed by <a href="https://github.com/suman-kr/">suman-kr</a>
          </span>
        </Col>
      </Row>
    </footer>
  );
};
